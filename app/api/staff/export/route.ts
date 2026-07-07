import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { getStaffSession } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, type DbResourceRow } from '@/lib/staff/resource-db';
import type { Resource } from '@/lib/staff/types';

export async function POST(req: Request) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { ids } = await req.json() as { ids: string[] };
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'No resource IDs provided' }, { status: 400 });
  }

  const db = createAdminClient();
  const { data, error } = await db.from('resources').select('*').in('id', ids);
  if (error || !data) return NextResponse.json({ error: 'Failed to load resources' }, { status: 500 });

  // Preserve the user's ordering
  const resourceMap = new Map(data.map((row) => [row.id, toResource(row as DbResourceRow)]));
  const resources = ids.map((id) => resourceMap.get(id)).filter(Boolean) as Resource[];

  const merged = await PDFDocument.create();
  const helvetica = await merged.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await merged.embedFont(StandardFonts.HelveticaBold);

  // Cover page
  const cover = merged.addPage([612, 792]);
  const { width, height } = cover.getSize();

  cover.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: rgb(0.122, 0.29, 0.518) });
  cover.drawText('KHM Tutoring', { x: 40, y: height - 52, size: 26, font: helveticaBold, color: rgb(1, 1, 1) });

  cover.drawText('Student Packet', { x: 40, y: height - 140, size: 32, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  cover.drawText(`Prepared by ${session.name}  ·  ${today}`, {
    x: 40, y: height - 170, size: 11, font: helvetica, color: rgb(0.45, 0.45, 0.45),
  });

  cover.drawLine({ start: { x: 40, y: height - 190 }, end: { x: width - 40, y: height - 190 }, thickness: 1, color: rgb(0.85, 0.85, 0.85) });

  cover.drawText('Contents', { x: 40, y: height - 220, size: 13, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });

  let listY = height - 248;
  resources.forEach((r, i) => {
    cover.drawText(`${i + 1}.  ${r.title}`, { x: 52, y: listY, size: 11, font: helveticaBold, color: rgb(0.1, 0.1, 0.1), maxWidth: width - 200 });
    cover.drawText(`${r.subject}  ·  ${r.grade}  ·  ${r.pages} page${r.pages === 1 ? '' : 's'}`, {
      x: 52, y: listY - 15, size: 9, font: helvetica, color: rgb(0.5, 0.5, 0.5),
    });
    listY -= 40;
  });

  const totalPages = resources.reduce((s, r) => s + r.pages, 0);
  cover.drawText(`${resources.length} file${resources.length === 1 ? '' : 's'}  ·  ${totalPages} page${totalPages === 1 ? '' : 's'} total`, {
    x: 40, y: 40, size: 10, font: helvetica, color: rgb(0.6, 0.6, 0.6),
  });

  // Append each PDF
  for (const resource of resources) {
    let pdfBytes: ArrayBuffer | null = null;

    if (resource.storageProvider === 'vercel_blob' && resource.storageKey) {
      const blobResult = await get(resource.storageKey, { access: 'private' });
      if (blobResult?.statusCode === 200 && blobResult.stream) {
        pdfBytes = await new Response(blobResult.stream).arrayBuffer();
      }
    } else if (resource.fileUrl) {
      const res = await fetch(resource.fileUrl);
      if (res.ok) pdfBytes = await res.arrayBuffer();
    }

    if (pdfBytes) {
      try {
        const doc = await PDFDocument.load(pdfBytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      } catch {
        // Skip unreadable PDFs silently
      }
    }
  }

  const pdfOut = Buffer.from(await merged.save());
  const slug = `KHM-Packet-${today.replace(/,?\s+/g, '-')}.pdf`;

  return new Response(pdfOut, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${slug}"`,
      'Cache-Control': 'no-store',
    },
  });
}
