import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { assertSameOrigin, isAdmin, readJson } from '@/lib/cms/auth';
import { saveRecord } from '@/lib/cms/store';
import { schemas, type Collection } from '@/lib/cms/models';
import { db } from '@/lib/cms/db';
import { getAllBlogs, getAllServices } from '@/lib/content/getters';
import { getPlans, getProducts } from '@/lib/cms/catalogue';
const collections = Object.keys(schemas);
export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  try {
    assertSameOrigin(request);
    if (!(await isAdmin()))
      return NextResponse.json({ error: 'Please log in.' }, { status: 401 });
    const { collection } = await params;
    if (collection === 'enquiries') {
      const { id } = z.object({ id: z.uuid() }).parse(await readJson(request));
      await db().query('DELETE FROM aq_enquiries WHERE id=$1', [id]);
      return NextResponse.json({ success: true });
    }
    if (!collections.includes(collection))
      return NextResponse.json(
        { error: 'Unknown content section.' },
        { status: 404 },
      );
    const input = z
      .object({
        key: z.string().max(100),
        revision: z.number().int().min(0),
        deleted: z.boolean().optional(),
        value: z.unknown(),
      })
      .parse(await readJson(request));
    const type = collection as Collection;
    let key = input.key;
    let value: unknown = {};
    if (!input.deleted) {
      value = schemas[type].parse(input.value);
      const record = value as Record<string, unknown>;
      if (type === 'contact' || type === 'hero') key = 'settings';
      else if (type === 'images')
        key = createHash('sha256')
          .update(String(record.original))
          .digest('hex');
      else {
        key = String(record.slug);
        if (!input.key) {
          const entries =
            type === 'blogs'
              ? await getAllBlogs({ includeDrafts: true })
              : type === 'services'
                ? await getAllServices({ includeDrafts: true })
                : type === 'plans'
                  ? await getPlans(true)
                  : await getProducts(true);
          if (entries.some((entry) => entry.slug === key)) {
            return NextResponse.json(
              {
                error:
                  'This URL slug already exists. Edit the existing entry or choose a different slug.',
              },
              { status: 409 },
            );
          }
        }
        if (input.key && input.key !== key)
          return NextResponse.json(
            {
              error:
                'Existing URL slugs cannot be changed. Create a new entry instead.',
            },
            { status: 400 },
          );
        record.id = key;
        if (type === 'blogs' || type === 'services') {
          const date = new Date().toISOString().slice(0, 10);
          record.updatedAt = date;
          record.createdAt ||= date;
          if (record.status === 'published') record.publishedAt ||= date;
          (record.seo as Record<string, unknown>).canonical =
            `/${type === 'blogs' ? 'blog' : 'services'}/${key}`;
          if (type === 'blogs') record.name = record.title;
        }
      }
    } else if (!/^[a-z0-9-]{1,100}$/.test(key))
      return NextResponse.json({ error: 'Invalid entry.' }, { status: 400 });
    const revision = await saveRecord(
      type,
      key,
      value,
      input.revision,
      input.deleted,
    );
    return NextResponse.json({ success: true, key, revision });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        {
          error: error.issues
            .map((i) => `${i.path.join('.')}: ${i.message}`)
            .slice(0, 8)
            .join('\n'),
        },
        { status: 400 },
      );
    if (error instanceof Error && error.message === 'CONFLICT')
      return NextResponse.json(
        {
          error: 'This entry changed in another session. Reload before saving.',
        },
        { status: 409 },
      );
    return NextResponse.json(
      { error: 'Unable to save. Check your login and database configuration.' },
      { status: 400 },
    );
  }
}
