'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function StaffLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get('from') || '/staff/library';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/staff/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);
    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? 'Incorrect email or password. Try again.');
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
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@khmtutoring.com"
                  className="h-11 pl-[42px]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11 pl-[42px]"
                  aria-invalid={!!error}
                />
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
            {!loading && <ArrowRight className="size-[18px]" />}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Tutors &amp; staff only. Contact Kody if you need access.
          </p>
        </form>
      </div>
    </div>
  );
}
