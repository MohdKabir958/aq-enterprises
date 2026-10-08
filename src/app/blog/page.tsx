import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllBlogs } from '@/lib/content/getters';

export const metadata: Metadata = {
  title: 'Blog — CCTV & Security Guides',
  description:
    'Practical CCTV and security guides from AQ Enterprises: systems, planning, property applications, access control, and Hyderabad context.',
  alternates: {
    canonical: '/blog',
  },
};

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function BlogIndexPage() {
  const posts = [...(await getAllBlogs())].sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''),
  );
  const featured = posts[0];
  const rest = posts.slice(1);

  const categories = Array.from(
    new Set(posts.flatMap((p) => p.categories ?? [])),
  ).sort();

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <Header active="blog" />
      <div style={{ height: 'calc(76px + env(safe-area-inset-top))' }} aria-hidden="true" />

      <main>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 20px 0' }}>
          <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />
        </div>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px 32px' }}>
          <span
            style={{
              display: 'inline-block',
              color: '#FF5A1F',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Resources
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.1,
              color: '#F2F4F7',
              margin: '0 0 16px',
              maxWidth: 720,
            }}
          >
            CCTV and security guides
          </h1>
          <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.65, maxWidth: 640, margin: 0 }}>
            Educational articles that explain how systems work, how to plan, and what drives cost —
            written to support our Hyderabad service pages, not replace them.
          </p>
        </section>

        {categories.length ? (
          <section
            aria-label="Article categories"
            style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 40px' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    border: '1px solid #232833',
                    color: '#9BA5B4',
                    fontSize: 13,
                    padding: '8px 14px',
                    borderRadius: 999,
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {featured ? (
          <section
            aria-labelledby="featured-heading"
            style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 48px' }}
          >
            <h2
              id="featured-heading"
              style={{
                color: '#6B7484',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: '0 0 16px',
              }}
            >
              Featured
            </h2>
            <Link
              href={`/blog/${featured.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                borderTop: '1px solid #232833',
                borderBottom: '1px solid #232833',
                padding: '28px 0',
              }}
            >
              <p style={{ color: '#3fa9f5', fontSize: 13, margin: '0 0 10px' }}>
                {(featured.categories ?? []).join(' · ')}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  color: '#F2F4F7',
                  margin: '0 0 12px',
                  lineHeight: 1.2,
                }}
              >
                {featured.title}
              </h3>
              <p style={{ color: '#9BA5B4', fontSize: 16, lineHeight: 1.65, margin: '0 0 12px', maxWidth: 720 }}>
                {featured.summary}
              </p>
              <p style={{ color: '#6B7484', fontSize: 13, margin: 0 }}>
                {featured.author}
                {featured.publishedAt ? ` · ${formatDate(featured.publishedAt)}` : ''}
              </p>
            </Link>
          </section>
        ) : null}

        <section
          aria-labelledby="all-articles-heading"
          style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 96px' }}
        >
          <h2
            id="all-articles-heading"
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 22,
              color: '#F2F4F7',
              margin: '0 0 24px',
            }}
          >
            All articles
          </h2>
          {rest.length === 0 && !featured ? (
            <p style={{ color: '#6B7484' }}>No published articles yet.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 20,
              }}
            >
              {(rest.length ? rest : []).map((post) => (
                <article
                  key={post.slug}
                  style={{
                    borderTop: '1px solid #232833',
                    paddingTop: 20,
                  }}
                >
                  <p style={{ color: '#3fa9f5', fontSize: 12, margin: '0 0 8px' }}>
                    {(post.categories ?? []).join(' · ')}
                  </p>
                  <h3 style={{ margin: '0 0 10px', fontSize: 18, lineHeight: 1.35 }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ color: '#F2F4F7', textDecoration: 'none' }}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ color: '#9BA5B4', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
                    {post.summary}
                  </p>
                  <p style={{ color: '#6B7484', fontSize: 12, margin: 0 }}>
                    {formatDate(post.publishedAt)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
