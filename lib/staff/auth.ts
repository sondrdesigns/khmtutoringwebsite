import { cookies } from 'next/headers';
import type { StaffRole } from './types';

/**
 * PLACEHOLDER AUTH — visualization only, NOT real security.
 *
 * A signed cookie stands in for a real session. Swap this whole module for
 * a real provider (NextAuth, Clerk, Supabase Auth, etc.) before launch:
 *   - replace the shared passcodes with per-user accounts
 *   - verify a real session/JWT instead of reading a plaintext cookie
 *   - enforce the admin role server-side on every mutating API route
 */

export const STAFF_COOKIE = 'khm_staff';

// Demo passcodes. Replace with real per-user credentials.
const STAFF_PASSCODE = process.env.STAFF_PASSCODE || 'tutor';
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'kody';

export interface StaffSession {
  role: StaffRole;
  name: string;
}

/** Validate a passcode and return the session it grants, or null. */
export function sessionForPasscode(passcode: string): StaffSession | null {
  if (passcode === ADMIN_PASSCODE) return { role: 'admin', name: 'Kody Kim' };
  if (passcode === STAFF_PASSCODE) return { role: 'tutor', name: 'Tutor' };
  return null;
}

/** Serialize a session into the cookie value (demo: plain JSON; sign in prod). */
export function encodeSession(s: StaffSession): string {
  return Buffer.from(JSON.stringify(s)).toString('base64');
}

export function decodeSession(value: string | undefined): StaffSession | null {
  if (!value) return null;
  try {
    const s = JSON.parse(Buffer.from(value, 'base64').toString('utf8'));
    if (s && (s.role === 'admin' || s.role === 'tutor')) return s as StaffSession;
  } catch {
    /* ignore */
  }
  return null;
}

/** Read the current session on the server (Server Components / route handlers). */
export async function getStaffSession(): Promise<StaffSession | null> {
  const store = await cookies();
  return decodeSession(store.get(STAFF_COOKIE)?.value);
}

export async function requireAdmin(): Promise<boolean> {
  const s = await getStaffSession();
  return s?.role === 'admin';
}
