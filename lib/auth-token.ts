import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export const AUTH_COOKIE_NAME = 'dashboard_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

export interface AuthTokenPayload extends JWTPayload {
  sub: string;
  email: string;
}

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be set and at least 32 characters long');
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());

    if (!payload.sub || typeof payload.email !== 'string') {
      return null;
    }

    return payload as AuthTokenPayload;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_SECONDS;
