import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Always refresh the session so tokens don't expire mid-session
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/staff/login') ||
    pathname.startsWith('/staff/update-password') ||
    pathname.startsWith('/api/staff/auth') ||
    pathname.startsWith('/auth/callback')
  ) {
    // Redirect already-authenticated users away from the login page
    if (user && pathname.startsWith('/staff/login')) {
      const url = req.nextUrl.clone();
      url.pathname = '/staff/library';
      return NextResponse.redirect(url);
    }
    return res;
  }

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = '/staff/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ['/staff/:path*', '/api/staff/resources/:path*'],
};
