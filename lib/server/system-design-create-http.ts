import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '../auth';
import { authPrisma } from '../prisma';
import { CreateValidationError, type CreateKind } from '../system-design-create';
import { createSystemDesignRecord } from './system-design-create';

export async function createSystemDesignResponse(request: NextRequest, kind: CreateKind) {
  try {
    const user = await getAuthUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return NextResponse.json({ error: 'Send JSON content.' }, { status: 415 });
    }
    // Bound streamed input, including requests without Content-Length.
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    if (reader) try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 256 * 1024) {
          await reader.cancel();
          return NextResponse.json({ error: 'The form is too large. Shorten the reference material.' }, { status: 413 });
        }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { return NextResponse.json({ error: 'The request contains invalid JSON.' }, { status: 400 }); }
    return NextResponse.json(await createSystemDesignRecord(authPrisma, user.sub, kind, body), { status: 201 });
  } catch (error) {
    if (error instanceof CreateValidationError) return NextResponse.json({ error: error.message, fields: error.fields, existingId: error.existingId }, { status: error.status });
    return NextResponse.json({ error: 'Unable to save right now. Your draft is preserved; please try again.' }, { status: 500 });
  }
}
