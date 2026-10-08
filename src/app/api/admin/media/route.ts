import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { assertSameOrigin, isAdmin, readJson } from '@/lib/cms/auth';
import { db } from '@/lib/cms/db';
import { z } from 'zod';
// Kept below Vercel's request limit. Videos use hosted URLs, not database blobs.
const uploadSchema = z.object({
  name: z.string().max(150),
  base64: z.string().max(2800000),
});
function imageType(bytes: Buffer) {
  if (bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255])))
    return 'image/jpeg';
  if (
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return 'image/png';
  if (
    bytes.subarray(0, 4).toString() === 'RIFF' &&
    bytes.subarray(8, 12).toString() === 'WEBP'
  )
    return 'image/webp';
  return null;
}
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    if (!(await isAdmin()))
      return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
    const input = uploadSchema.parse(await readJson(request, 2900000));
    const bytes = Buffer.from(input.base64, 'base64');
    const mime = imageType(bytes);
    if (!mime || bytes.length > 2000000 || bytes.length < 12)
      return NextResponse.json(
        { error: 'Upload a JPEG, PNG or WebP image smaller than 2 MB.' },
        { status: 400 },
      );
    const id = randomUUID();
    const client = await db().connect();
    try {
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock(7215901)');
      const usage = await client.query<{ total: string }>(
        'SELECT COALESCE(SUM(octet_length(bytes)),0)::text AS total FROM aq_media',
      );
      if (Number(usage.rows[0].total) + bytes.length > 50000000)
        throw new Error('QUOTA');
      await client.query(
        'INSERT INTO aq_media(id,name,mime,bytes) VALUES($1,$2,$3,$4)',
        [id, input.name, mime, bytes],
      );
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    return NextResponse.json({ url: `/api/media/${id}`, id });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === 'QUOTA'
            ? 'The 50 MB image storage limit is full. Delete unused uploads or use hosted image URLs.'
            : 'Unable to upload image.',
      },
      { status: 400 },
    );
  }
}
export async function DELETE(request: Request) {
  try {
    assertSameOrigin(request);
    if (!(await isAdmin()))
      return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
    const { id } = z.object({ id: z.uuid() }).parse(await readJson(request));
    // Prevent accidental broken references in saved content and settings.
    const used = await db().query(
      'SELECT 1 FROM aq_content WHERE NOT deleted AND value::text LIKE $1 LIMIT 1',
      [`%/api/media/${id}%`],
    );
    if (used.rowCount)
      return NextResponse.json(
        {
          error:
            'This upload is used by saved content. Remove or replace those references first.',
        },
        { status: 409 },
      );
    await db().query('DELETE FROM aq_media WHERE id=$1', [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Unable to delete image.' },
      { status: 400 },
    );
  }
}
