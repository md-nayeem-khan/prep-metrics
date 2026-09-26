import { type NextRequest } from 'next/server';
import { handleImport } from '@/lib/server/import-http';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request: NextRequest, context: { params: Promise<{ entity: string }> }) {
  return handleImport(request, (await context.params).entity, 'commit');
}
