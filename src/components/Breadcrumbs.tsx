import Link from 'next/link';
import { JsonLd, generateBreadcrumbSchema } from '@/lib/json-ld';
import type { BreadcrumbItem } from '@/types';

export type { BreadcrumbItem };

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Reusable SEO Breadcrumbs component.
 * 1. Renders a semantic <nav aria-label="Breadcrumb"> for screen readers.
 * 2. Injects the BreadcrumbList JSON-LD automatically.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always prepend Home to the start if it isn't there
  const fullItems = items[0]?.name === 'Home' ? items : [{ name: 'Home', url: '/' }, ...items];

  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema(fullItems)} />
      
      <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <li key={item.url} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {isLast ? (
                  <span style={{ color: '#F2F4F7', fontSize: 13, fontWeight: 500 }} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} style={{ color: '#6B7484', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}>
                      {item.name}
                    </Link>
                    <span style={{ color: '#232833', fontSize: 12 }} aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
