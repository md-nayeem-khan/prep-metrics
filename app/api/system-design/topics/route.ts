import { NextRequest } from 'next/server';
import { createSystemDesignResponse } from '@/lib/server/system-design-create-http';

export function POST(request: NextRequest) {
  return createSystemDesignResponse(request, 'topic');
}
