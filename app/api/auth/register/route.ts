import { NextRequest, NextResponse } from 'next/server';
import { authPrisma } from '@/lib/prisma';
import { createSessionToken, hashPassword, setAuthCookie } from '@/lib/auth';

type UserRow = {
  id: string;
  email: string;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? normalizeEmail(body.email) : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email is required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const existing = await authPrisma.$queryRaw<UserRow[]>`
      SELECT id, email
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;
    if (existing.length > 0) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const created = await authPrisma.$queryRaw<UserRow[]>`
      INSERT INTO users (id, email, password_hash)
      VALUES (${`usr_${crypto.randomUUID().replace(/-/g, '')}`}, ${email}, ${passwordHash})
      RETURNING id, email
    `;
    const user = created[0];

    const token = await createSessionToken(user.id, user.email);
    const response = NextResponse.json({ success: true, data: user }, { status: 201 });
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('Auth register error:', error);
    const detail = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Failed to register user' : `Failed to register user: ${detail}`,
      },
      { status: 500 }
    );
  }
}
