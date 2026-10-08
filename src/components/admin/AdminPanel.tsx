'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Collection, EditorRecord, SavedRecord } from '@/lib/cms/models';
import {
  newBlog,
  newPlan,
  newProduct,
  newService,
} from '@/lib/cms/editor-defaults';
import Fields from './Fields';
import MediaField from './MediaField';
export interface AdminEntry {
  key: string;
  value: EditorRecord;
  revision: number;
}
export interface AdminData {
  products: AdminEntry[];
  blogs: AdminEntry[];
  services: AdminEntry[];
  plans: AdminEntry[];
  contact: AdminEntry[];
  hero: AdminEntry[];
  images: SavedRecord[];
  assets: string[];
  uploads: { id: string; name: string; size: number }[];
  enquiries: {
    id: string;
    payload: EditorRecord;
    email_status: string;
    created_at: string;
  }[];
}
const tabs = [
  'products',
  'blogs',
  'services',
  'plans',
  'hero',
  'images',
  'contact',
  'enquiries',
] as const;
type Tab = (typeof tabs)[number];
export default function AdminPanel({ data }: { data: AdminData }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('products');
  const [selected, setSelected] = useState<AdminEntry | null>(null);
  const [value, setValue] = useState<EditorRecord>({});
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [original, setOriginal] = useState('');
  const [replacement, setReplacement] = useState('');
  const [alt, setAlt] = useState('');
  const [hide, setHide] = useState(false);
  const open = (entry: AdminEntry) => {
    setSelected(entry);
    setValue(structuredClone(entry.value));
    setMessage('');
  };
  async function save(
    collection: Collection,
    key: string,
    record: EditorRecord,
    revision: number,
    deleted = false,
  ) {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: record, revision, deleted }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessage(
        deleted ? 'Deleted.' : 'Saved. Changes are live on the website.',
      );
      setSelected(null);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save.');
    } finally {
      setBusy(false);
    }
  }
  const collection = tab as Collection;
  const entries = tab === 'images' || tab === 'enquiries' ? [] : data[tab];
  const templates: Partial<Record<Tab, EditorRecord>> = {
    products: newProduct,
    blogs: newBlog,
    services: newService,
    plans: newPlan,
  };
  return (
    <main className="cms-page">
      <div className="cms-heading">
        <div>
          <p className="cms-kicker">Owner dashboard</p>
          <h1>Manage your website</h1>
        </div>
        <div className="cms-actions">
          <Link href="/" target="_blank">
            View website ↗
          </Link>
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const r = await fetch('/api/admin/logout', { method: 'POST' });
                if (!r.ok) throw new Error();
                router.refresh();
              } catch {
                setMessage('Unable to log out. Try again.');
              } finally {
                setBusy(false);
              }
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <p>
        Publish accurate services, pricing and business details. New entries
        start as drafts. Checkout requests appear in Enquiries.
      </p>
      <nav className="cms-tabs" aria-label="Admin sections">
        {tabs.map((t) => (
          <button
            key={t}
            aria-pressed={tab === t}
            disabled={busy}
            onClick={() => {
              setTab(t);
              setSelected(null);
              setSearch('');
              setMessage('');
            }}
          >
            {t === 'plans'
              ? 'Internet plans'
              : t === 'images'
                ? 'Media library'
                : t}
          </button>
        ))}
      </nav>
      {message && (
        <p
          className="cms-notice"
          role="status"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {message}
        </p>
      )}
      {tab === 'enquiries' ? (
        <section>
          <h2>Customer enquiries</h2>
          {!data.enquiries.length && <p>No enquiries yet.</p>}
          {data.enquiries.map((e) => (
            <article className="cms-card" key={e.id}>
              <h3>
                {String(e.payload.name)} · {String(e.payload.phone)}
              </h3>
              <p>
                {new Date(e.created_at).toLocaleString('en-IN')} · Email:{' '}
                {e.email_status}
              </p>
              <pre className="cms-enquiry">
                {Object.entries(e.payload)
                  .filter(([key]) =>
                    [
                      'propertyType',
                      'email',
                      'address',
                      'message',
                      'orderSummary',
                    ].includes(key),
                  )
                  .map(([key, v]) => `${key}: ${String(v ?? '')}`)
                  .join('\n')}
              </pre>
              <button
                className="cms-danger"
                disabled={busy}
                onClick={async () => {
                  if (!confirm('Permanently delete this customer enquiry?'))
                    return;
                  setBusy(true);
                  setMessage('');
                  try {
                    const r = await fetch('/api/admin/enquiries', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: e.id }),
                    });
                    if (!r.ok) throw new Error('Unable to delete enquiry.');
                    router.refresh();
                    setMessage('Enquiry deleted.');
                  } catch {
                    setMessage('Unable to delete enquiry. Try again.');
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Delete enquiry
              </button>
            </article>
          ))}
        </section>
      ) : tab === 'images' ? (
        <section>
          <h2>Website images and uploads</h2>
          <p>
            Replace or hide any existing image. To restore it, delete its
            override. Uploads are limited to 2 MB each and 50 MB total; use
            hosted URLs for videos and larger media.
          </p>
          <div className="cms-card">
            <label>
              Original website image path
              <input
                list="website-assets"
                value={original}
                onChange={(e) => {
                  setOriginal(e.target.value);
                  const row = data.images.find(
                    (r) => r.value.original === e.target.value,
                  );
                  setReplacement(String(row?.value.replacement ?? ''));
                  setHide(row?.value.replacement === null);
                  setAlt(String(row?.value.alt ?? ''));
                }}
              />
              <datalist id="website-assets">
                {data.assets.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </label>
            <MediaField
              label="Replacement image"
              value={replacement}
              onChange={setReplacement}
            />
            <label>
              Alternative text
              <input value={alt} onChange={(e) => setAlt(e.target.value)} />
            </label>
            <label className="cms-check">
              <input
                type="checkbox"
                checked={hide}
                onChange={(e) => setHide(e.target.checked)}
              />
              Hide this image
            </label>
            <button
              disabled={busy || !original || (!hide && !replacement)}
              onClick={() => {
                const row = data.images.find(
                  (r) => r.value.original === original,
                );
                save(
                  'images',
                  '',
                  { original, replacement: hide ? null : replacement, alt },
                  row?.revision ?? 0,
                );
              }}
            >
              Save image change
            </button>
          </div>
          <h3>Image overrides</h3>
          {data.images
            .filter((r) => !r.deleted)
            .map((r) => (
              <article key={r.key} className="cms-card">
                <p>
                  {String(r.value.original)} →{' '}
                  {r.value.replacement === null
                    ? 'Hidden'
                    : String(r.value.replacement)}
                </p>
                <button
                  className="cms-secondary"
                  disabled={busy}
                  onClick={() => save('images', r.key, {}, r.revision, true)}
                >
                  Restore original
                </button>
              </article>
            ))}
          <h3>Uploaded images</h3>
          {data.uploads.map((file) => (
            <div key={file.id} className="cms-card">
              <a
                href={`/api/media/${file.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {file.name}
              </a>
              <p>
                {Math.round(file.size / 1024)} KB · /api/media/{file.id}
              </p>
              <button
                className="cms-secondary"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `/api/media/${file.id}`,
                    );
                    setMessage('Image URL copied.');
                  } catch {
                    setMessage('Copy the displayed image URL.');
                  }
                }}
              >
                Copy URL
              </button>
              <button
                className="cms-danger"
                disabled={busy}
                onClick={async () => {
                  if (!confirm('Delete this upload?')) return;
                  setBusy(true);
                  setMessage('');
                  try {
                    const r = await fetch('/api/admin/media', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: file.id }),
                    });
                    const result = await r.json();
                    if (!r.ok) throw new Error(result.error || 'Unable to delete upload.');
                    setMessage('Upload deleted.');
                    router.refresh();
                  } catch (error) {
                    setMessage(
                      error instanceof Error && !(error instanceof TypeError)
                        ? error.message
                        : 'Unable to delete upload. Try again.',
                    );
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Delete unused upload
              </button>
            </div>
          ))}
        </section>
      ) : selected ? (
        <section className="cms-card">
          <h2>{selected.key ? 'Edit entry' : 'New entry'}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const record = { ...value };
              if ('slug' in record) {
                record.id = record.slug;
                if (tab === 'blogs') record.name = record.title;
              }
              save(collection, selected.key, record, selected.revision);
            }}
          >
            <Fields
              value={value}
              onChange={setValue}
              isExisting={Boolean(selected.key)}
            />
            <div className="cms-actions">
              <button disabled={busy} type="submit">
                {busy ? 'Saving…' : 'Save changes'}
              </button>
              <button
                className="cms-secondary"
                disabled={busy}
                type="button"
                onClick={() => setSelected(null)}
              >
                Cancel
              </button>
              {selected.key && templates[tab] && (
                <button
                  className="cms-danger"
                  disabled={busy}
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        'Delete this entry? Its public URL will stop displaying it.',
                      )
                    )
                      save(
                        collection,
                        selected.key,
                        {},
                        selected.revision,
                        true,
                      );
                  }}
                >
                  Delete entry
                </button>
              )}
            </div>
          </form>
        </section>
      ) : (
        <section>
          <div className="cms-heading">
            <h2>
              {tab === 'plans'
                ? 'Internet plans'
                : tab === 'contact'
                  ? 'Contact details'
                  : tab === 'hero'
                    ? 'Homepage hero'
                    : tab}
            </h2>
            {templates[tab] && (
              <button
                onClick={() =>
                  open({
                    key: '',
                    revision: 0,
                    value: structuredClone(templates[tab]!),
                  })
                }
              >
                Add new
              </button>
            )}
          </div>
          {templates[tab] && (
            <label>
              Search
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          )}
          <div className="cms-list">
            {entries
              .filter((e) =>
                String(e.value.name ?? e.value.title ?? e.key)
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((entry) => (
                <article key={entry.key} className="cms-card">
                  <h3>
                    {String(
                      entry.value.title ??
                        entry.value.name ??
                        (tab === 'contact'
                          ? 'Business contact details'
                          : 'Homepage hero'),
                    )}
                  </h3>
                  {entry.value.status && (
                    <p>
                      {String(entry.value.status)} · {entry.key}
                    </p>
                  )}
                  <button className="cms-secondary" onClick={() => open(entry)}>
                    Edit
                  </button>
                </article>
              ))}
            {!entries.length && (
              <p>
                No entries yet. Add your actual products and offers to get
                started.
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
