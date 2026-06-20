import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest, verifyPassword, hashPassword } from '@/lib/auth';
import { authPrisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  const user = await getAuthUserFromRequest(request);
  if (!user?.sub) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { currentPassword, newPassword, confirmPassword } = body as {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ success: false, error: 'All password fields are required' }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ success: false, error: 'New password must be at least 8 characters' }, { status: 400 });
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json({ success: false, error: 'New passwords do not match' }, { status: 400 });
  }

  const dbUser = await authPrisma.user.findUnique({
    where: { id: user.sub },
    select: { passwordHash: true },
  });

  if (!dbUser) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const isValid = await verifyPassword(currentPassword, dbUser.passwordHash);
  if (!isValid) {
    return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
  }

  const newHash = await hashPassword(newPassword);
  await authPrisma.user.update({
    where: { id: user.sub },
    data: { passwordHash: newHash },
  });

  return NextResponse.json({ success: true });
}
