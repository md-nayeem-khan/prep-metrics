import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth-token';

const AUTH_PAGES = new Set(['/login']);
const AUTH_API_PREFIX = '/api/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authUser = token ? await verifySessionToken(token) : null;
  const isAuthenticated = Boolean(authUser?.sub);

  if (pathname.startsWith(AUTH_API_PREFIX)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api')) {
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const headers = new Headers(request.headers);
    headers.set('x-authenticated-user-id', authUser!.sub);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  if (!isAuthenticated && !AUTH_PAGES.has(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && AUTH_PAGES.has(pathname)) {
    const nextParam = request.nextUrl.searchParams.get('next');
    const redirectPath = nextParam && nextParam.startsWith('/') ? nextParam : '/dashboard';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
