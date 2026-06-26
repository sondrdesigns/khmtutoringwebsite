'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * Staff sign-in. PLACEHOLDER — posts a passcode to /api/staff/auth which sets
 * a cookie. Demo passcodes: "kody" (admin) or "tutor" (staff). Replace with a
 * real auth provider before launch.
 */
export function StaffLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get('from') || '/staff/library';
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch('/api/staff/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      setError('That passcode wasn’t recognized. Try again.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/40 to-background px-6">
      <div className="w-full max-w-[420px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <Image src="/images/khm-tutoring-logo.png" alt="KHM Tutoring" width={56} height={56} className="mb-3 object-contain" />
          <h1 className="font-heading text-3xl font-bold">Staff Portal</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in to access the resource library.</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-7 shadow-lg">
          <label htmlFor="passcode" className="mb-1.5 block text-sm font-medium">Access passcode</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
            <Input
              id="passcode"
              type="password"
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter your passcode"
              className="h-11 pl-[42px]"
              aria-invalid={!!error}
            />
          </div>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading || !passcode}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
            {!loading && <ArrowRight className="size-[18px]" />}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Tutors &amp; staff only. Access is restricted.
          </p>
        </form>

        {/* Remove this hint before launch. */}
        <p className="mt-4 text-center text-xs text-muted-foreground/70">
          Demo passcodes — <span className="font-semibold">kody</span> (admin) · <span className="font-semibold">tutor</span> (staff)
        </p>
      </div>
    </div>
  );
}
