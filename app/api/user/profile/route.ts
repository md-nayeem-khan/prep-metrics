import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { authPrisma } from '@/lib/prisma';
import { isValidTimeZone } from '@/lib/datetime/tz';
import { rebuildDailyProgressForUser } from '@/lib/server/daily-progress-backfill';

export async function GET(request: NextRequest) {
  const user = await getAuthUserFromRequest(request);
  if (!user?.sub) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await authPrisma.user.findUnique({
    where: { id: user.sub },
    select: { id: true, email: true, name: true, bio: true, timezone: true, createdAt: true },
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
      timezone: dbUser.timezone,
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

  const { name, bio, timezone } = body as {
    name?: string | null;
    bio?: string | null;
    timezone?: string;
  };

  if (name !== undefined && name !== null && name.length > 100) {
    return NextResponse.json({ success: false, error: 'Name must be 100 characters or fewer' }, { status: 400 });
  }
  if (bio !== undefined && bio !== null && bio.length > 500) {
    return NextResponse.json({ success: false, error: 'Bio must be 500 characters or fewer' }, { status: 400 });
  }
  if (timezone !== undefined && !isValidTimeZone(timezone)) {
    return NextResponse.json({ success: false, error: 'Invalid timezone' }, { status: 400 });
  }

  // Detect a timezone change so we can re-bucket the user's cached daily_progress afterwards.
  let timezoneChanged = false;
  if (timezone !== undefined) {
    const current = await authPrisma.user.findUnique({
      where: { id: user.sub },
      select: { timezone: true },
    });
    timezoneChanged = current?.timezone !== timezone;
  }

  const updated = await authPrisma.user.update({
    where: { id: user.sub },
    data: {
      name: name ?? null,
      bio: bio ?? null,
      ...(timezone !== undefined ? { timezone } : {}),
    },
    select: { id: true, email: true, name: true, bio: true, timezone: true },
  });

  // Day boundaries moved, so the cached per-day rows must be rebuilt from raw events.
  // Non-fatal: a rebuild hiccup must not fail the profile save.
  if (timezoneChanged) {
    try {
      await rebuildDailyProgressForUser(authPrisma, user.sub, updated.timezone);
    } catch (rebuildError) {
      console.error('Error rebuilding daily progress after timezone change:', rebuildError);
    }
  }

  return NextResponse.json({ success: true, data: updated });
}
