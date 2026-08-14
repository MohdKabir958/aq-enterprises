import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { brandBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getRelatedForBrand } from '@/lib/links/related';
import type { Brand } from '@/types';
import PageShell from './PageShell';
import RelatedLinks from './RelatedLinks';

interface BrandTemplateProps {
  brand: Brand;
}

export default function BrandTemplate({ brand }: BrandTemplateProps) {
  const breadcrumbs = brandBreadcrumbs(brand.name, brand.slug);
  const related = getRelatedForBrand(brand);

  const schema = generateSchema({
    type: 'brand',
    name: brand.name,
    description: brand.seo.description || brand.summary,
    url: brand.seo.canonical,
    image: brand.logo,
    breadcrumbs,
  });

  return (
    <PageShell active="home" breadcrumbs={breadcrumbs}>
      {Array.isArray(schema) ? (
        schema.map((s, i) => <JsonLd key={i} schema={s} />)
      ) : (
        <JsonLd schema={schema} />
      )}

      <article>
        <h1
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            margin: '0 0 12px',
          }}
        >
          {brand.name}
        </h1>
        {brand.authorized ? (
          <p style={{ color: '#3fa9f5', fontSize: 14, fontWeight: 500, margin: '0 0 16px' }}>
            Verified authorized dealer or partner
          </p>
        ) : (
          <p style={{ color: '#6B7484', fontSize: 13, margin: '0 0 16px' }}>
            Brand we commonly install and support — not automatically an authorized dealership claim.
          </p>
        )}
        <p style={{ color: '#9AA3B2', fontSize: 17, lineHeight: 1.6, maxWidth: 720, margin: '0 0 32px' }}>
          {brand.summary}
        </p>

        {brand.body ? (
          <div style={{ color: '#C5CCD8', fontSize: 16, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {brand.body}
          </div>
        ) : null}

        <RelatedLinks
          related={related}
          sections={[
            { key: 'services', title: 'Related Services' },
            { key: 'projects', title: 'Related Projects' },
            { key: 'blogs', title: 'Related Articles' },
          ]}
        />
      </article>
    </PageShell>
  );
}
