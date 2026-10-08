import { NextResponse } from 'next/server';
import { db, databaseConfigured } from '@/lib/cms/db';
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/.test(id) || !databaseConfigured())
    return new NextResponse(null, { status: 404 });
  try {
    const result = await db().query<{ bytes: Buffer; mime: string }>(
      'SELECT bytes,mime FROM aq_media WHERE id=$1',
      [id],
    );
    const file = result.rows[0];
    if (!file) return new NextResponse(null, { status: 404 });
    return new NextResponse(new Uint8Array(file.bytes), {
      headers: {
        'Content-Type': file.mime,
        'Content-Length': String(file.bytes.length),
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'",
      },
    });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
