/**
 * Renders internal-link groups produced by `@/lib/links/related`.
 * Hidden when a group is empty so templates stay clean before content exists.
 */

import Link from 'next/link';
import type { InternalLink, RelatedLinksBundle } from '@/lib/links/related';

type RelatedSection = {
  key: keyof RelatedLinksBundle;
  title: string;
};

interface RelatedLinksProps {
  related: RelatedLinksBundle;
  /** Optional override of which groups to show and their headings. */
  sections?: RelatedSection[];
}

const DEFAULT_SECTIONS: RelatedSection[] = [
  { key: 'services', title: 'Related Services' },
  { key: 'locations', title: 'Related Locations' },
  { key: 'projects', title: 'Related Projects' },
  { key: 'blogs', title: 'Related Articles' },
  { key: 'brands', title: 'Related Brands' },
  { key: 'industries', title: 'Related Industries' },
];

function LinkGroup({ title, items }: { title: string; items: InternalLink[] }) {
  if (!items.length) return null;

  return (
    <section style={{ marginTop: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--font-space), sans-serif',
          fontSize: 22,
          fontWeight: 600,
          color: '#F2F4F7',
          margin: '0 0 16px',
        }}
      >
        {title}
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}
      >
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              style={{
                display: 'block',
                color: '#3fa9f5',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {item.name}
            </Link>
            {item.summary ? (
              <p style={{ margin: '4px 0 0', color: '#6B7484', fontSize: 13, lineHeight: 1.45 }}>
                {item.summary}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function RelatedLinks({ related, sections = DEFAULT_SECTIONS }: RelatedLinksProps) {
  const visible = (sections ?? DEFAULT_SECTIONS).filter((section) => related[section.key].length > 0);
  if (!visible.length) return null;

  return (
    <div aria-label="Related content">
      {visible.map((section) => (
        <LinkGroup key={section.key} title={section.title} items={related[section.key]} />
      ))}
    </div>
  );
}
