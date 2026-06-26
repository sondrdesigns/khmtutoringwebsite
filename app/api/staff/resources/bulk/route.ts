import { NextResponse } from 'next/server';
import type { Resource, ResourceDraft } from '@/lib/staff/types';
import { requireAdmin } from '@/lib/staff/auth';

/**
 * STUB — bulk import (admin only). The client sends the reviewed/corrected
 * drafts from the Bulk Upload modal; persist them in one transaction.
 *
 * A fuller pipeline would instead accept the uploaded PDFs (multipart), store
 * each blob, optionally extract first-page text + run `classifyFilename` /
 * `aiClassifyFallback` server-side, then insert rows. See lib/staff/classify.ts.
 */

// POST /api/staff/resources/bulk  -> { drafts: ResourceDraft[] }
export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const { drafts } = (await req.json()) as { drafts: ResourceDraft[] };
  const now = Date.now();
  const created: Resource[] = (drafts || []).map((d, i) => ({
    ...d,
    id: `b_${now + i}`,
    added: new Date().toISOString().slice(0, 10),
    author: d.author || 'Kody Kim',
  }));
  // TODO: INSERT created INTO resources (transaction)
  return NextResponse.json({ created, count: created.length }, { status: 201 });
}
