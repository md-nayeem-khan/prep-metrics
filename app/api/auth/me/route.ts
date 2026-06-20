import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { authPrisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const user = await getAuthUserFromRequest(request);

  if (!user?.sub) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await authPrisma.user.findUnique({
    where: { id: user.sub },
    select: { id: true, email: true },
  });

  if (!dbUser) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: {
      id: dbUser.id,
      email: dbUser.email,
    },
  });
}
