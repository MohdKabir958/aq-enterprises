import type { CSSProperties } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { serviceBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getRelatedForService } from '@/lib/links/related';
import { getFaqsByIds, getServiceLocationsForService } from '@/lib/content/getters';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import type { FAQ, ImagePlaceholder, Service } from '@/types';
import PageShell from './PageShell';
import RelatedLinks from './RelatedLinks';

interface ServiceTemplateProps {
  service: Service;
}

const h2: CSSProperties = {
  fontFamily: 'var(--font-space), sans-serif',
  fontSize: 'clamp(22px, 3vw, 28px)',
  fontWeight: 600,
  color: '#F2F4F7',
  margin: '48px 0 16px',
};

const h3: CSSProperties = {
  fontFamily: 'var(--font-space), sans-serif',
  fontSize: 18,
  fontWeight: 600,
  color: '#E8ECF2',
  margin: '0 0 8px',
};

const prose: CSSProperties = {
  color: '#C5CCD8',
  fontSize: 16,
  lineHeight: 1.75,
  margin: 0,
};

const muted: CSSProperties = {
  color: '#9AA3B2',
  fontSize: 15,
  lineHeight: 1.65,
  margin: '0 0 16px',
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} style={{ ...prose, marginBottom: 16 }}>
            {p}
          </p>
        ))}
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: '0 0 8px', paddingLeft: 20, color: '#C5CCD8', lineHeight: 1.7 }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: 8 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ImagePlaceholderBlock({ image }: { image: ImagePlaceholder }) {
  return (
    <figure
      style={{
        margin: '24px 0',
        border: '1px dashed #2A3140',
        background:
          'linear-gradient(145deg, rgba(63,169,245,0.06) 0%, rgba(15,18,24,0.9) 55%, #12151c 100%)',
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}
      aria-label={image.alt}
    >
      <figcaption>
        <p style={{ color: '#6B7484', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Image placeholder
        </p>
        <p style={{ color: '#9AA3B2', fontSize: 14, margin: 0, maxWidth: 420 }}>{image.label}</p>
        <p style={{ color: '#4A5565', fontSize: 12, margin: '8px 0 0' }}>ALT: {image.alt}</p>
      </figcaption>
    </figure>
  );
}

export default function ServiceTemplate({ service }: ServiceTemplateProps) {
  const breadcrumbs = serviceBreadcrumbs(service.name, service.slug);
  const related = getRelatedForService(service);
  const collectionFaqs = getFaqsByIds(service.relatedFaqs ?? []);
  const faqs: FAQ[] = [...(service.faqs ?? []), ...collectionFaqs];
  const areaPages = getServiceLocationsForService(service.slug);

  const schema = generateSchema({
    type: 'service',
    name: service.h1 || service.name,
    description: service.seo.description || service.summary,
    url: service.seo.canonical,
    image: service.image || service.hero.image?.id,
    breadcrumbs,
    faqs,
  });

  const primaryHref = service.cta.primaryHref ?? '/#contact';
  const primaryLabel = service.cta.primaryLabel ?? 'Get a Free Site Survey';
  const secondaryHref = service.cta.secondaryHref ?? `tel:${PHONE}`;
  const secondaryLabel = service.cta.secondaryLabel ?? `Call ${PHONE_DISPLAY}`;

  return (
    <PageShell active="services" breadcrumbs={breadcrumbs}>
      {Array.isArray(schema) ? (
        schema.map((s, i) => <JsonLd key={i} schema={s} />)
      ) : (
        <JsonLd schema={schema} />
      )}

      <article>
        {/* Hero */}
        <header style={{ marginBottom: 8 }}>
          {service.hero.eyebrow ? (
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
              {service.hero.eyebrow}
            </p>
          ) : null}
          <h1
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              margin: '0 0 14px',
              color: '#F2F4F7',
              lineHeight: 1.15,
              maxWidth: 820,
            }}
          >
            {service.h1}
          </h1>
          <p style={{ color: '#9AA3B2', fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 0 20px' }}>
            {service.hero.subheadline}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
            <Link
              href={primaryHref}
              style={{
                display: 'inline-block',
                background: '#3fa9f5',
                color: '#0A0C10',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              {primaryLabel}
            </Link>
            <Link
              href={WHATSAPP_URL}
              style={{
                display: 'inline-block',
                border: '1px solid #2A3140',
                color: '#F2F4F7',
                fontWeight: 500,
                fontSize: 14,
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              WhatsApp Us
            </Link>
          </div>
          {service.hero.image ? <ImagePlaceholderBlock image={service.hero.image} /> : null}
        </header>

        {/* Introduction */}
        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" style={h2}>
            {service.hero.headline}
          </h2>
          <Paragraphs text={service.introduction} />
        </section>

        <section aria-labelledby="what-is-heading">
          <h2 id="what-is-heading" style={h2}>
            {service.whatIs.heading}
          </h2>
          <Paragraphs text={service.whatIs.body} />
        </section>

        <section aria-labelledby="who-needs-heading">
          <h2 id="who-needs-heading" style={h2}>
            {service.whoNeeds.heading}
          </h2>
          {service.whoNeeds.intro ? <p style={muted}>{service.whoNeeds.intro}</p> : null}
          <BulletList items={service.whoNeeds.items} />
        </section>

        <section aria-labelledby="problems-heading">
          <h2 id="problems-heading" style={h2}>
            {service.commonProblems.heading}
          </h2>
          {service.commonProblems.intro ? <p style={muted}>{service.commonProblems.intro}</p> : null}
          <BulletList items={service.commonProblems.items} />
        </section>

        <section aria-labelledby="solution-heading">
          <h2 id="solution-heading" style={h2}>
            {service.ourSolution.heading}
          </h2>
          <Paragraphs text={service.ourSolution.body} />
        </section>

        <section aria-labelledby="options-heading">
          <h2 id="options-heading" style={h2}>
            {service.systemOptions.heading}
          </h2>
          {service.systemOptions.intro ? <p style={muted}>{service.systemOptions.intro}</p> : null}
          <div style={{ display: 'grid', gap: 20 }}>
            {service.systemOptions.options.map((opt) => (
              <div key={opt.name}>
                <h3 style={h3}>{opt.name}</h3>
                <p style={{ ...prose, marginBottom: 4 }}>{opt.description}</p>
                {opt.suitableFor ? (
                  <p style={{ color: '#6B7484', fontSize: 13, margin: 0 }}>Best for: {opt.suitableFor}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="features-heading">
          <h2 id="features-heading" style={h2}>
            {service.keyFeatures.heading}
          </h2>
          {service.keyFeatures.intro ? <p style={muted}>{service.keyFeatures.intro}</p> : null}
          <BulletList items={service.keyFeatures.items} />
        </section>

        <section aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" style={h2}>
            {service.benefits.heading}
          </h2>
          {service.benefits.intro ? <p style={muted}>{service.benefits.intro}</p> : null}
          <BulletList items={service.benefits.items} />
        </section>

        <section aria-labelledby="configs-heading">
          <h2 id="configs-heading" style={h2}>
            {service.recommendedConfigurations.heading}
          </h2>
          {service.recommendedConfigurations.intro ? (
            <p style={muted}>{service.recommendedConfigurations.intro}</p>
          ) : null}
          <div style={{ display: 'grid', gap: 20 }}>
            {service.recommendedConfigurations.configs.map((cfg) => (
              <div key={cfg.name}>
                <h3 style={h3}>{cfg.name}</h3>
                <p style={{ ...prose, marginBottom: 4 }}>{cfg.description}</p>
                {cfg.suitableFor ? (
                  <p style={{ color: '#6B7484', fontSize: 13, margin: 0 }}>Suitable for: {cfg.suitableFor}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" style={h2}>
            {service.installationProcess.heading}
          </h2>
          {service.installationProcess.intro ? (
            <p style={muted}>{service.installationProcess.intro}</p>
          ) : null}
          <ol style={{ margin: 0, paddingLeft: 20, color: '#C5CCD8', lineHeight: 1.7 }}>
            {service.installationProcess.steps.map((step, index) => (
              <li key={step.title} style={{ marginBottom: 18 }}>
                <h3 style={{ ...h3, display: 'inline' }}>
                  {index + 1}. {step.title}
                </h3>
                <p style={{ ...prose, marginTop: 6 }}>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="maintenance-heading">
          <h2 id="maintenance-heading" style={h2}>
            {service.maintenance.heading}
          </h2>
          <Paragraphs text={service.maintenance.body} />
        </section>

        {service.brands ? (
          <section aria-labelledby="brands-heading">
            <h2 id="brands-heading" style={h2}>
              {service.brands.heading}
            </h2>
            <Paragraphs text={service.brands.body} />
          </section>
        ) : null}

        <section aria-labelledby="warranty-heading">
          <h2 id="warranty-heading" style={h2}>
            {service.warranty.heading}
          </h2>
          <Paragraphs text={service.warranty.body} />
        </section>

        <section aria-labelledby="why-choose-heading">
          <h2 id="why-choose-heading" style={h2}>
            {service.whyChoose.heading}
          </h2>
          {service.whyChoose.intro ? <p style={muted}>{service.whyChoose.intro}</p> : null}
          <BulletList items={service.whyChoose.items} />
        </section>

        <section aria-labelledby="coverage-heading">
          <h2 id="coverage-heading" style={h2}>
            {service.hyderabadCoverage.heading}
          </h2>
          <Paragraphs text={service.hyderabadCoverage.body} />
        </section>

        {service.imagePlaceholders?.length ? (
          <section aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" style={h2}>
              Visual Reference
            </h2>
            <p style={muted}>
              Real installation photography will replace these placeholders. Each block already includes descriptive ALT text.
            </p>
            {service.imagePlaceholders.map((img) => (
              <ImagePlaceholderBlock key={img.id} image={img} />
            ))}
          </section>
        ) : null}

        {faqs.length > 0 ? (
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" style={h2}>
              Frequently Asked Questions
            </h2>
            <dl style={{ margin: 0 }}>
              {faqs.map((faq) => (
                <div key={faq.id} style={{ marginBottom: 22 }}>
                  <dt>
                    <h3 style={{ ...h3, fontSize: 16 }}>{faq.question}</h3>
                  </dt>
                  <dd style={{ margin: 0, color: '#9AA3B2', lineHeight: 1.65 }}>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {areaPages.length > 0 ? (
          <section aria-labelledby="area-pages-heading">
            <h2 id="area-pages-heading" style={h2}>
              {service.name} by area
            </h2>
            <p style={muted}>
              Local landing pages for this service in specific Hyderabad neighborhoods — distinct from
              this city-wide overview.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {areaPages.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/locations/${p.locationSlug}/${p.serviceSlug}`}
                    style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {p.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <RelatedLinks
          related={related}
          sections={[
            { key: 'services', title: 'Related Services' },
            { key: 'locations', title: 'Related Locations' },
            { key: 'projects', title: 'Related Projects' },
            { key: 'brands', title: 'Related Brands' },
            { key: 'blogs', title: 'Related Articles' },
          ]}
        />

        {/* Final CTA */}
        <section
          aria-labelledby="cta-heading"
          style={{
            marginTop: 56,
            padding: '32px 24px',
            background: 'linear-gradient(135deg, #12151c 0%, #0f1622 50%, #0A0C10 100%)',
            borderTop: '1px solid #232833',
            borderBottom: '1px solid #232833',
          }}
        >
          <h2 id="cta-heading" style={{ ...h2, marginTop: 0 }}>
            {service.cta.heading}
          </h2>
          <p style={{ ...muted, maxWidth: 640 }}>{service.cta.body}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link
              href={primaryHref}
              style={{
                display: 'inline-block',
                background: '#3fa9f5',
                color: '#0A0C10',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              style={{
                display: 'inline-block',
                border: '1px solid #3fa9f5',
                color: '#3fa9f5',
                fontWeight: 500,
                fontSize: 14,
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              {secondaryLabel}
            </Link>
            <Link
              href={WHATSAPP_URL}
              style={{
                display: 'inline-block',
                border: '1px solid #2A3140',
                color: '#F2F4F7',
                fontWeight: 500,
                fontSize: 14,
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              Chat on WhatsApp
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
