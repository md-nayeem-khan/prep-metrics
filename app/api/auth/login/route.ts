import { NextRequest, NextResponse } from 'next/server';
import { authPrisma } from '@/lib/prisma';
import { createSessionToken, setAuthCookie, verifyPassword } from '@/lib/auth';

type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  timezone: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? normalizeEmail(body.email) : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const users = await authPrisma.$queryRaw<UserRow[]>`
      SELECT id, email, password_hash, timezone
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    const user = users[0];
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const validPassword = await verifyPassword(password, user.password_hash);
    if (!validPassword) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createSessionToken(user.id, user.email);
    const response = NextResponse.json({
      success: true,
      data: { id: user.id, email: user.email, timezone: user.timezone },
    });

    setAuthCookie(response, token);
    // Non-httpOnly cookie so the client TimezoneProvider can render dates in the user's zone on the
    // first paint after login (read server-side in app/layout.tsx).
    response.cookies.set({
      name: 'user_tz',
      value: user.timezone ?? 'UTC',
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  } catch (error) {
    console.error('Auth login error:', error);
    const detail = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Failed to login' : `Failed to login: ${detail}`,
      },
      { status: 500 }
    );
  }
}
