import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { blogBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getRelatedForBlog } from '@/lib/links/related';
import { parseArticleBody, renderInline } from '@/lib/blog/parse-body';
import { CTA_COPY } from '@/lib/business';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import { siteConfig } from '@/lib/config';
import type { BlogPost } from '@/types';
import PageShell from './PageShell';
import RelatedLinks from './RelatedLinks';

interface BlogTemplateProps {
  post: BlogPost;
}

const h2: CSSProperties = {
  fontFamily: 'var(--font-space), sans-serif',
  fontSize: 'clamp(22px, 3vw, 28px)',
  fontWeight: 600,
  color: '#F2F4F7',
  margin: '40px 0 14px',
  scrollMarginTop: 96,
};

const prose: CSSProperties = {
  color: '#C5CCD8',
  fontSize: 16,
  lineHeight: 1.75,
  margin: '0 0 16px',
};

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function Blocks({ blocks }: { blocks: ReturnType<typeof parseArticleBody>['lead'] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === 'list' ? (
          <ul key={i} style={{ ...prose, paddingLeft: 22 }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ marginBottom: 8 }}>
                {renderInline(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p key={i} style={prose}>
            {renderInline(block.text)}
          </p>
        ),
      )}
    </>
  );
}

export default function BlogTemplate({ post }: BlogTemplateProps) {
  const title = post.title || post.name;
  const breadcrumbs = blogBreadcrumbs(title, post.slug);
  const related = getRelatedForBlog(post);
  const parsed = parseArticleBody(post.body);
  const image = post.featuredImage || post.coverImage;
  const published = formatDate(post.publishedAt);
  const updated = formatDate(post.updatedAt);
  const showUpdated = Boolean(post.updatedAt && post.updatedAt !== post.publishedAt);

  const authorSchema =
    post.author === 'AQ Enterprises' || !post.author
      ? {
          author: {
            '@type': 'Organization',
            name: 'AQ Enterprises',
            url: siteConfig.url,
          },
        }
      : {
          author: { '@type': 'Person', name: post.author },
        };

  const schema = generateSchema({
    type: 'blog',
    name: title,
    description: post.seo.description || post.summary,
    url: post.seo.canonical,
    image,
    breadcrumbs,
    faqs: post.faq,
    extra: {
      ...authorSchema,
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': post.seo.canonical,
      },
    },
  });

  return (
    <PageShell active="blog" breadcrumbs={breadcrumbs}>
      {Array.isArray(schema) ? (
        schema.map((s, i) => <JsonLd key={i} schema={s} />)
      ) : (
        <JsonLd schema={schema} />
      )}

      <article>
        {post.categories?.length ? (
          <p
            style={{
              color: '#3fa9f5',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '0 0 10px',
            }}
          >
            {post.categories.join(' · ')}
          </p>
        ) : null}

        <h1
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            margin: '0 0 14px',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        <p style={{ color: '#6B7484', fontSize: 14, margin: '0 0 20px' }}>
          {post.author}
          {published ? ` · Published ${published}` : null}
          {showUpdated && updated ? ` · Updated ${updated}` : null}
        </p>

        <p style={{ color: '#9AA3B2', fontSize: 17, lineHeight: 1.65, maxWidth: 720, margin: '0 0 28px' }}>
          {post.summary}
        </p>

        {image ? (
          <figure style={{ margin: '0 0 32px' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
              <Image
                src={image}
                alt={post.featuredImageAlt || title}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </figure>
        ) : null}

        {parsed.sections.length > 1 ? (
          <nav
            aria-label="Table of contents"
            style={{
              margin: '0 0 32px',
              padding: '20px 0',
              borderTop: '1px solid #232833',
              borderBottom: '1px solid #232833',
            }}
          >
            <p
              style={{
                color: '#6B7484',
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: '0 0 12px',
              }}
            >
              In this article
            </p>
            <ol style={{ margin: 0, paddingLeft: 20, color: '#9AA3B2', fontSize: 15, lineHeight: 1.7 }}>
              {parsed.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} style={{ color: '#3fa9f5', textDecoration: 'none' }}>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Blocks blocks={parsed.lead} />

        {parsed.sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} style={h2}>
              {section.heading}
            </h2>
            <Blocks blocks={section.blocks} />
          </section>
        ))}

        {post.faq?.length ? (
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" style={h2}>
              Frequently asked questions
            </h2>
            <dl style={{ margin: 0 }}>
              {post.faq.map((item) => (
                <div
                  key={item.id}
                  style={{ borderTop: '1px solid #232833', padding: '16px 0' }}
                >
                  <dt
                    style={{
                      color: '#F2F4F7',
                      fontWeight: 600,
                      fontSize: 16,
                      marginBottom: 8,
                    }}
                  >
                    {item.question}
                  </dt>
                  <dd style={{ ...prose, margin: 0 }}>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <RelatedLinks
          related={related}
          sections={[
            { key: 'services', title: 'Related services' },
            { key: 'locations', title: 'Related locations' },
            { key: 'projects', title: 'Related projects' },
            { key: 'blogs', title: 'Related articles' },
          ]}
        />

        <section
          aria-labelledby="blog-cta-heading"
          style={{
            marginTop: 48,
            padding: '32px 24px',
            background: 'linear-gradient(135deg, #12151c 0%, #0f1622 50%, #0A0C10 100%)',
            borderTop: '1px solid #232833',
            borderBottom: '1px solid #232833',
          }}
        >
          <h2 id="blog-cta-heading" style={{ ...h2, marginTop: 0 }}>
            {post.ctaHeading ?? CTA_COPY.survey.heading}
          </h2>
          <p style={{ color: '#9AA3B2', fontSize: 15, lineHeight: 1.65, margin: '0 0 20px', maxWidth: 640 }}>
            {post.ctaBody ?? CTA_COPY.survey.body}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link
              href="/#contact"
              style={{
                background: '#FF5A1F',
                color: '#0A0C10',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 22px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              {CTA_COPY.quote.heading}
            </Link>
            <a
              href={`tel:${PHONE}`}
              style={{
                background: '#12151B',
                border: '1px solid #232833',
                color: '#F2F4F7',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 22px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#12151B',
                border: '1px solid #232833',
                color: '#F2F4F7',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 22px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
