'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon, { type IconName } from '@/components/Icon';
import { LOGO_SRC } from '@/lib/assets';
import type { Collection, EditorRecord, SavedRecord } from '@/lib/cms/models';
import {
  newBlog,
  newPlan,
  newProduct,
  newService,
  newProject,
  newReview,
  newFaq,
} from '@/lib/cms/editor-defaults';
import Fields from './Fields';
import MediaField from './MediaField';
import Enquiries from './Enquiries';
import Reports from './Reports';
import type { LeadRecord } from '@/lib/leads/workflow';
import type { LeadReport } from '@/lib/leads/report';
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
  projects: AdminEntry[];
  reviews: AdminEntry[];
  faqs: AdminEntry[];
  contact: AdminEntry[];
  hero: AdminEntry[];
  images: SavedRecord[];
  assets: string[];
  uploads: { id: string; name: string; size: number }[];
  enquiries: LeadRecord[];
  report: LeadReport;
}
type Tab = Collection | 'enquiries' | 'reports';
const navigation: { label: string; tabs: Tab[] }[] = [
  { label: 'Business', tabs: ['products', 'plans', 'enquiries', 'reports'] },
  {
    label: 'Website content',
    tabs: ['services', 'blogs', 'projects', 'reviews', 'faqs'],
  },
  { label: 'Website settings', tabs: ['hero', 'images', 'contact'] },
];
const tabIcons: Record<Tab, IconName> = {
  products: 'package',
  blogs: 'file',
  services: 'shield',
  plans: 'wifi',
  hero: 'video',
  images: 'image',
  contact: 'settings',
  enquiries: 'users',
  reports: 'chart',
  projects: 'briefcase',
  reviews: 'star',
  faqs: 'help',
};
const tabName = (tab: Tab) =>
  tab === 'projects'
    ? 'Case studies'
    : tab === 'faqs'
      ? 'FAQs'
      : tab === 'plans'
        ? 'Internet plans'
        : tab === 'images'
          ? 'Media library'
          : tab;
const descriptions: Record<Tab, string> = {
  products: 'Build your catalogue with products, packages and combo offers.',
  blogs: 'Share useful guides and keep your website articles up to date.',
  services: 'Manage the services customers can explore on your website.',
  plans: 'Present your internet options, pricing and inclusions clearly.',
  hero: 'Set the first impression with your homepage headline and media.',
  images: 'Keep your website photography organised and up to date.',
  contact: 'Keep your business details consistent across the website.',
  enquiries: 'Follow up with customers and keep every request moving.',
  reports: 'Understand the interest and enquiries your website receives.',
  projects: 'Show completed work with accurate, owner-confirmed case studies.',
  reviews: 'Publish genuine, verified feedback with customer permission.',
  faqs: 'Answer common questions before customers get in touch.',
};
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
  const [menuOpen, setMenuOpen] = useState(false);
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
  const entries =
    tab === 'images' || tab === 'enquiries' || tab === 'reports'
      ? []
      : data[tab];
  const filteredEntries = entries.filter((entry) =>
    String(entry.value.name ?? entry.value.title ?? entry.key)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const templates: Partial<Record<Tab, EditorRecord>> = {
    products: newProduct,
    blogs: newBlog,
    services: newService,
    plans: newPlan,
    projects: newProject,
    reviews: newReview,
    faqs: newFaq,
  };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" data-menu-open={menuOpen}>
        <div className="admin-brand">
          <Image
            src={LOGO_SRC}
            alt="AQ Enterprises logo"
            width={44}
            height={44}
          />
          <div>
            <strong>AQ Enterprises</strong>
            <span>Owner workspace</span>
          </div>
          <button
            className="admin-menu-toggle"
            aria-label="Dashboard navigation"
            aria-expanded={menuOpen}
            aria-controls="admin-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} />
          </button>
        </div>
        <nav
          className="cms-tabs admin-navigation"
          id="admin-navigation"
          aria-label="Admin sections"
        >
          {navigation.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.tabs.map((t) => (
                <button
                  key={t}
                  aria-pressed={tab === t}
                  disabled={busy}
                  onClick={() => {
                    setTab(t);
                    setSelected(null);
                    setSearch('');
                    setMessage('');
                    setMenuOpen(false);
                  }}
                >
                  <Icon name={tabIcons[t]} size={19} />
                  <span>{tabName(t)}</span>
                  {t === 'enquiries' && data.report.due > 0 && (
                    <small aria-hidden="true">{data.report.due}</small>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <Icon name="shield" size={18} />
          <div>
            <strong>Owner access</strong>
            <span>Your website workspace</span>
          </div>
        </div>
      </aside>
      <main className="cms-page admin-workspace">
        <div className="cms-heading admin-workspace-heading">
          <div>
            <p className="cms-kicker">
              Workspace <span aria-hidden="true">/</span> {tabName(tab)}
            </p>
            <h1>Manage your website</h1>
            <p className="admin-workspace-description">{descriptions[tab]}</p>
          </div>
          <div className="cms-actions">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-view-site"
            >
              <Icon name="globe" size={16} /> View website{' '}
              <Icon name="arrow-up-right" size={14} />
            </Link>
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const r = await fetch('/api/admin/logout', {
                    method: 'POST',
                  });
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
        <div className="admin-summary-grid">
          {[
            {
              label: 'Published products',
              count: data.products.filter(
                (entry) => entry.value.status === 'published',
              ).length,
              detail: 'Live in your catalogue',
              icon: 'package' as const,
            },
            {
              label: 'Enquiries',
              count: data.report.leads,
              detail: 'Received in the last 30 days',
              icon: 'users' as const,
            },
            {
              label: 'Follow-ups due',
              count: data.report.due,
              detail: 'Requests needing your attention',
              icon: 'calendar' as const,
            },
            {
              label: 'Published articles',
              count: data.blogs.filter(
                (entry) => entry.value.status === 'published',
              ).length,
              detail: 'Live on your website',
              icon: 'file' as const,
            },
          ].map((stat) => (
            <div className="admin-summary-card" key={stat.label}>
              <span className="admin-summary-icon">
                <Icon name={stat.icon} size={21} />
              </span>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.count}</strong>
                <small>{stat.detail}</small>
              </div>
            </div>
          ))}
        </div>
        {(data.report.due > 0 || data.report.emailAttention > 0) && (
          <p className="cms-notice">
            {data.report.due} follow-ups due · {data.report.emailAttention}{' '}
            email notifications need attention. Open Enquiries to follow up.
          </p>
        )}
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
          <Enquiries
            leads={data.enquiries}
            initialTotal={data.report.stages.reduce(
              (sum, stage) => sum + stage.count,
              0,
            )}
            asOf={data.report.generatedAt}
          />
        ) : tab === 'reports' ? (
          <Reports report={data.report} />
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
                      if (!r.ok)
                        throw new Error(
                          result.error || 'Unable to delete upload.',
                        );
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
          <section className="cms-card admin-editor">
            <h2>{selected.key ? 'Edit entry' : 'New entry'}</h2>
            <form
              className="admin-editor-form"
              onSubmit={(e) => {
                e.preventDefault();
                const record = { ...value };
                if ('slug' in record) {
                  record.id = record.slug;
                  if (tab === 'blogs') record.name = record.title;
                  if (tab === 'faqs') record.name = record.question;
                }
                save(collection, selected.key, record, selected.revision);
              }}
            >
              <Fields
                value={value}
                onChange={setValue}
                isExisting={Boolean(selected.key)}
              />
              <div className="cms-actions admin-editor-actions">
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
            <div className="cms-heading admin-section-heading">
              <h2>
                {tab === 'projects'
                  ? 'Case studies'
                  : tab === 'faqs'
                    ? 'FAQs'
                    : tab === 'plans'
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
                  <Icon name="plus" size={17} /> Add new
                </button>
              )}
            </div>
            {templates[tab] && (
              <label className="admin-search">
                Search
                <input
                  placeholder="Search by name or title…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            )}
            <div className="cms-list">
              {filteredEntries.map((entry) => (
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
                    <p className="admin-entry-meta">
                      <span
                        className={`admin-status admin-status-${entry.value.status}`}
                      >
                        {String(entry.value.status)}
                      </span>
                      <span>{entry.key}</span>
                    </p>
                  )}
                  <button className="cms-secondary" onClick={() => open(entry)}>
                    Edit
                  </button>
                </article>
              ))}
              {!filteredEntries.length && (
                <div className="admin-empty">
                  <span>
                    <Icon name={search ? 'search' : tabIcons[tab]} size={36} />
                  </span>
                  <h3>
                    {search
                      ? 'No matching entries.'
                      : 'Your next update starts here.'}
                  </h3>
                  <p>
                    {search
                      ? 'Try another name or clear your search.'
                      : `No ${tabName(tab).toLowerCase()} yet. Use Add new to create your first entry.`}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
