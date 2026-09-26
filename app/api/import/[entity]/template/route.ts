import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { isImportEntity } from '@/lib/import/definitions';
import { template } from '@/lib/import/csv';
export async function GET(request: NextRequest, context: { params: Promise<{ entity: string }> }) {
  if (!await getAuthUserFromRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { entity } = await context.params;
  if (!isImportEntity(entity)) return NextResponse.json({ error: 'Unknown import list' }, { status: 404 });
  return new Response(template(entity), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${entity}-template.csv"`, 'Cache-Control': 'no-store' } });
}
