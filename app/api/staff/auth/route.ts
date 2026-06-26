import { NextResponse } from 'next/server';
import {
  STAFF_COOKIE, sessionForPasscode, encodeSession, getStaffSession,
} from '@/lib/staff/auth';

// POST /api/staff/auth  -> { passcode }  : sets the session cookie
export async function POST(req: Request) {
  const { passcode } = (await req.json()) as { passcode?: string };
  const session = passcode ? sessionForPasscode(passcode) : null;
  if (!session) {
    return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 });
  }
  const res = NextResponse.json({ session });
  res.cookies.set(STAFF_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}

// GET /api/staff/auth  -> current session (or null)
export async function GET() {
  const session = await getStaffSession();
  return NextResponse.json({ session });
}

// DELETE /api/staff/auth  -> sign out
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
