import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Gate the staff portal. PLACEHOLDER security — it only checks that the
 * `khm_staff` cookie exists, not that it's valid/signed. Real auth (NextAuth,
 * Clerk, Supabase, signed JWT) replaces the cookie check below.
 *
 * NOTE: if the existing repo already has a `middleware.ts`, merge this
 * `/staff` logic into it rather than adding a second file (only one is allowed).
 */
const STAFF_COOKIE = 'khm_staff';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page and the auth API through unauthenticated.
  if (pathname.startsWith('/staff/login') || pathname.startsWith('/api/staff/auth')) {
    return NextResponse.next();
  }

  const hasSession = Boolean(req.cookies.get(STAFF_COOKIE)?.value);
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/staff/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/staff/:path*', '/api/staff/resources/:path*'],
};
