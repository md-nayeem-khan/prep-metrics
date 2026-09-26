import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '../auth';
import { isImportEntity, MAX_FILE_BYTES } from '../import/definitions';
import { ImportError } from '../import/csv';
import { commitImport, previewImport } from './csv-import';

export async function readImportForm(request: Request): Promise<FormData> {
  const limit = MAX_FILE_BYTES + 64 * 1024;
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > limit) throw new ImportError(413, 'FILE_TOO_LARGE', 'Files must be 2 MiB or smaller.');
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) throw new ImportError(400, 'CONTENT_TYPE', 'Use multipart/form-data.');
  if (!request.body) throw new ImportError(400, 'MISSING_FILE', 'Select a CSV file.');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new ImportError(413, 'FILE_TOO_LARGE', 'Files must be 2 MiB or smaller.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try {
    return await new Response(Buffer.concat(chunks), { headers: { 'content-type': request.headers.get('content-type')! } }).formData();
  } catch { throw new ImportError(400, 'MALFORMED_REQUEST', 'Unable to read the uploaded file.'); }
}

export async function handleImport(request: NextRequest, entity: string, action: 'preview' | 'commit') {
  try {
    const user = await getAuthUserFromRequest(request);
    if (!user) throw new ImportError(401, 'UNAUTHORIZED', 'Sign in to import CSV files.');
    if (!isImportEntity(entity)) throw new ImportError(404, 'UNKNOWN_ENTITY', 'Unknown import list.');
    const form = await readImportForm(request);
    if ([...form.keys()].some(k => !['file', 'token', 'requestId'].includes(k)) || ['file', 'token', 'requestId'].some(k => form.getAll(k).length > 1)) throw new ImportError(400, 'FORM_FIELDS', 'Unexpected or repeated form fields.');
    const file = form.get('file');
    if (!(file instanceof File)) throw new ImportError(400, 'MISSING_FILE', 'Select a CSV file.');
    if (file.size > MAX_FILE_BYTES) throw new ImportError(413, 'FILE_TOO_LARGE', 'Files must be 2 MiB or smaller.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (action === 'preview') {
      const preview = await previewImport(user.sub, entity, bytes);
      return NextResponse.json(preview, { status: preview.issues.length ? 422 : 200, headers: { 'Cache-Control': 'no-store' } });
    }
    const token = form.get('token');
    const requestId = form.get('requestId');
    if (typeof token !== 'string' || typeof requestId !== 'string') throw new ImportError(400, 'CONFIRMATION_REQUIRED', 'Validate the file before importing it.');
    return NextResponse.json(await commitImport(user.sub, entity, bytes, token, requestId), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof ImportError) return NextResponse.json({ error: error.message, code: error.code, issues: error.issues }, { status: error.status });
    // Do not log CSV contents, ORM arguments, or uploaded user data.
    console.error('CSV import failed', { code: (error as { code?: string; errorCode?: string }).code ?? (error as { errorCode?: string }).errorCode ?? 'INTERNAL_ERROR', name: error instanceof Error ? error.name : 'UnknownError' });
    return NextResponse.json({ error: 'Import failed. No partial import was saved. Retry the same request or validate again.', code: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
