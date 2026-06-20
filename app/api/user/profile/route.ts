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
    select: { id: true, email: true, name: true, bio: true, createdAt: true },
  });

  if (!dbUser) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      bio: dbUser.bio,
      memberSince: dbUser.createdAt.toISOString(),
    },
  });
}

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

  const { name, bio } = body as { name?: string | null; bio?: string | null };

  if (name !== undefined && name !== null && name.length > 100) {
    return NextResponse.json({ success: false, error: 'Name must be 100 characters or fewer' }, { status: 400 });
  }
  if (bio !== undefined && bio !== null && bio.length > 500) {
    return NextResponse.json({ success: false, error: 'Bio must be 500 characters or fewer' }, { status: 400 });
  }

  const updated = await authPrisma.user.update({
    where: { id: user.sub },
    data: { name: name ?? null, bio: bio ?? null },
    select: { id: true, email: true, name: true, bio: true },
  });

  return NextResponse.json({ success: true, data: updated });
}
