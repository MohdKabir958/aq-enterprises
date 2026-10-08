import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { industryBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getRelatedForIndustry } from '@/lib/links/related';
import { getScopedFaqs } from '@/lib/content/getters';
import type { Industry } from '@/types';
import PageShell from './PageShell';
import RelatedLinks from './RelatedLinks';

interface IndustryTemplateProps {
  industry: Industry;
}

export default async function IndustryTemplate({ industry }: IndustryTemplateProps) {
  const breadcrumbs = industryBreadcrumbs(industry.name, industry.slug);
  const related = (await getRelatedForIndustry(industry));
  const faqs = await getScopedFaqs('relatedIndustries', industry.slug, industry.relatedFaqs ?? []);

  const schema = (await generateSchema({
    type: 'industry',
    name: industry.name,
    description: industry.seo.description || industry.summary,
    url: industry.seo.canonical,
    image: industry.image,
    breadcrumbs,
    faqs,
  }));

  return (
    <PageShell active="services" breadcrumbs={breadcrumbs}>
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
          {industry.name}
        </h1>
        <p style={{ color: '#9AA3B2', fontSize: 17, lineHeight: 1.6, maxWidth: 720, margin: '0 0 32px' }}>
          {industry.summary}
        </p>

        {industry.body ? (
          <div style={{ color: '#C5CCD8', fontSize: 16, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {industry.body}
          </div>
        ) : null}

        <RelatedLinks
          related={related}
          sections={[
            { key: 'services', title: 'Related Services' },
            { key: 'locations', title: 'Related Locations' },
            { key: 'projects', title: 'Related Projects' },
            { key: 'blogs', title: 'Related Articles' },
          ]}
        />
      </article>
    </PageShell>
  );
}
