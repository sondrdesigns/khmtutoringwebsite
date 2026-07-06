import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';
import { getStaffSession } from '@/lib/staff/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { toResource, type DbResourceRow } from '@/lib/staff/resource-db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = createAdminClient();
  const { data, error } = await db.from('resources').select('*').eq('id', id).single();
  if (error || !data) return NextResponse.json({ error: 'File not found' }, { status: 404 });

  const resource = toResource(data as DbResourceRow);
  const url = new URL(req.url);
  const asDownload = url.searchParams.get('download') === '1';
  const filename = resource.originalFilename || `${resource.title}.pdf`;

  if (resource.storageProvider === 'vercel_blob' && resource.storageKey) {
    const blob = await get(resource.storageKey, { access: 'private' });
    if (!blob || blob.statusCode !== 200) {
      return NextResponse.json({ error: 'Blob file not found' }, { status: 404 });
    }

    const headers = new Headers();
    headers.set('Content-Type', blob.blob.contentType || resource.mimeType || 'application/pdf');
    headers.set('Content-Disposition', `${asDownload ? 'attachment' : 'inline'}; filename="${filename.replace(/"/g, '')}"`);
    headers.set('Cache-Control', 'private, max-age=300');
    return new Response(blob.stream, { status: 200, headers });
  }

  if (resource.fileUrl) {
    return NextResponse.redirect(resource.fileUrl);
  }

  return NextResponse.json({ error: 'No file is attached to this resource' }, { status: 404 });
}
