import type { Metadata } from 'next';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { adminConfigured, isAdmin } from '@/lib/cms/auth';
import { db } from '@/lib/cms/db';
import { getAllBlogs, getAllServices } from '@/lib/content/getters';
import { getProducts, getPlans } from '@/lib/cms/catalogue';
import { getContact, getHero } from '@/lib/cms/settings';
import { readRecords } from '@/lib/cms/store';
import type { Collection, EditorRecord } from '@/lib/cms/models';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminPanel, { type AdminEntry } from '@/components/admin/AdminPanel';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Owner dashboard',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: '/admin' },
};
async function entries(
  collection: Collection,
  values: unknown[],
  single = false,
): Promise<AdminEntry[]> {
  const rows = await readRecords(collection);
  return values.map((item) => {
    const value = structuredClone(item as EditorRecord);
    // Optional fields in bundled content still need an editable upload control.
    if (collection === 'blogs') {
      value.featuredImage ||= value.coverImage || '';
      value.featuredImageAlt ||= '';
    }
    if (collection === 'services') {
      const hero = value.hero as EditorRecord;
      const image = (hero.image || {
        id: `${value.slug}-hero`,
        alt: '',
        label: value.name,
      }) as EditorRecord;
      hero.image = { ...image, src: image.src || '' };
      if (Array.isArray(value.imagePlaceholders)) {
        value.imagePlaceholders = value.imagePlaceholders.map((item) => {
          const image = item as EditorRecord;
          return { ...image, src: image.src || '' };
        });
      }
    }
    const key = single ? 'settings' : String(value.slug);
    return {
      key,
      value,
      revision: rows.find((r) => r.key === key)?.revision ?? 0,
    };
  });
}
async function assets(dir: string, relative = ''): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(relative, entry.name);
    if (entry.isDirectory())
      result.push(...(await assets(join(dir, entry.name), path)));
    else if (/\.(png|jpe?g|webp|avif|svg|gif|mp4|webm)$/i.test(entry.name))
      result.push('/' + path.replaceAll('\\', '/'));
  }
  return result;
}
export default async function AdminPage() {
  const configured = adminConfigured();
  if (!(await isAdmin())) return <AdminLogin configured={configured} />;
  const [
    products,
    blogs,
    services,
    plans,
    contact,
    hero,
    images,
    files,
    uploads,
    enquiries,
  ] = await Promise.all([
    getProducts(true).then((v) => entries('products', v)),
    getAllBlogs({ includeDrafts: true }).then((v) => entries('blogs', v)),
    getAllServices({ includeDrafts: true }).then((v) => entries('services', v)),
    getPlans(true).then((v) => entries('plans', v)),
    getContact().then((v) => entries('contact', [v], true)),
    getHero().then((v) => entries('hero', [v], true)),
    readRecords('images'),
    assets(join(process.cwd(), 'public')),
    db().query<{ id: string; name: string; size: number }>(
      'SELECT id,name,octet_length(bytes) AS size FROM aq_media ORDER BY created_at DESC',
    ),
    db().query<{
      id: string;
      payload: EditorRecord;
      email_status: string;
      created_at: Date;
    }>(
      'SELECT id,payload,email_status,created_at FROM aq_enquiries ORDER BY created_at DESC LIMIT 200',
    ),
  ]);
  return (
    <AdminPanel
      data={{
        products,
        blogs,
        services,
        plans,
        contact,
        hero,
        images,
        assets: files,
        uploads: uploads.rows,
        enquiries: enquiries.rows.map((e) => ({
          ...e,
          created_at: e.created_at.toISOString(),
        })),
      }}
    />
  );
}
