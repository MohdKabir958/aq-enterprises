import type { CSSProperties } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { serviceLocationBreadcrumbs } from '@/lib/seo/breadcrumbs';
import {
  getLocationBySlug,
  getProjectBySlug,
  getServiceBySlug,
} from '@/lib/content/getters';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL, ADDRESS } from '@/lib/constants';
import { siteConfig } from '@/lib/config';
import type { FAQ, ServiceLocationPage } from '@/types';
import PageShell from './PageShell';

interface Props {
  page: ServiceLocationPage;
}

const h2: CSSProperties = {
  fontFamily: 'var(--font-space), sans-serif',
  fontSize: 'clamp(22px, 3vw, 28px)',
  fontWeight: 600,
  color: '#F2F4F7',
  margin: '48px 0 16px',
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

export default function ServiceLocationTemplate({ page }: Props) {
  const service = getServiceBySlug(page.serviceSlug);
  const location = getLocationBySlug(page.locationSlug);
  const project = page.projectSlug ? getProjectBySlug(page.projectSlug) : undefined;

  const breadcrumbs = serviceLocationBreadcrumbs({
    locationName: location?.name ?? page.locationSlug,
    locationSlug: page.locationSlug,
    serviceName: service?.name ?? page.serviceSlug,
    serviceSlug: page.serviceSlug,
  });

  const faqs: FAQ[] = page.faqs ?? [];
  const relatedServiceLinks = (page.relatedServices ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedLocationLinks = (page.relatedLocations ?? [])
    .map((slug) => getLocationBySlug(slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const schema = generateSchema({
    type: 'service',
    name: page.h1,
    description: page.seo.description || page.summary,
    url: page.seo.canonical,
    breadcrumbs,
    faqs,
    extra: {
      areaServed: {
        '@type': 'Place',
        name: `${location?.name ?? page.locationSlug}, Hyderabad`,
      },
      provider: {
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: PHONE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${ADDRESS.line1} ${ADDRESS.line2}`,
          addressLocality: ADDRESS.city,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.pincode,
          addressCountry: 'IN',
        },
      },
    },
  });

  const primaryHref = page.cta.primaryHref ?? '/#contact';
  const primaryLabel = page.cta.primaryLabel ?? 'Request a Free Site Survey';

  return (
    <PageShell active="services" breadcrumbs={breadcrumbs}>
      {Array.isArray(schema) ? (
        schema.map((s, i) => <JsonLd key={i} schema={s} />)
      ) : (
        <JsonLd schema={schema} />
      )}

      <article>
        <header>
          {page.hero.eyebrow ? (
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
              {page.hero.eyebrow}
            </p>
          ) : null}
          <h1
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              margin: '0 0 14px',
              lineHeight: 1.15,
              maxWidth: 860,
            }}
          >
            {page.h1}
          </h1>
          <p style={{ color: '#9AA3B2', fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 0 12px' }}>
            {page.hero.subheadline}
          </p>
          <p style={{ color: '#6B7484', fontSize: 13, margin: '0 0 16px' }}>
            Service area · {location?.name ?? page.locationSlug}, Hyderabad — not a separate branch
            office
          </p>
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
              WhatsApp
            </Link>
            <Link
              href={`tel:${PHONE}`}
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
              Call {PHONE_DISPLAY}
            </Link>
          </div>
        </header>

        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" style={h2}>
            {page.hero.headline}
          </h2>
          <Paragraphs text={page.introduction} />
        </section>

        <section aria-labelledby="requirements-heading">
          <h2 id="requirements-heading" style={h2}>
            {page.securityRequirements.heading}
          </h2>
          {page.securityRequirements.intro ? <p style={muted}>{page.securityRequirements.intro}</p> : null}
          <BulletList items={page.securityRequirements.items} />
        </section>

        <section aria-labelledby="solution-heading">
          <h2 id="solution-heading" style={h2}>
            {page.recommendedSolution.heading}
          </h2>
          <Paragraphs text={page.recommendedSolution.body} />
        </section>

        <section aria-labelledby="equipment-heading">
          <h2 id="equipment-heading" style={h2}>
            {page.equipmentFeatures.heading}
          </h2>
          {page.equipmentFeatures.intro ? <p style={muted}>{page.equipmentFeatures.intro}</p> : null}
          <BulletList items={page.equipmentFeatures.items} />
        </section>

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" style={h2}>
            {page.installationProcess.heading}
          </h2>
          {page.installationProcess.intro ? <p style={muted}>{page.installationProcess.intro}</p> : null}
          <ol style={{ margin: 0, paddingLeft: 20, color: '#C5CCD8', lineHeight: 1.7 }}>
            {page.installationProcess.steps.map((step, index) => (
              <li key={step.title} style={{ marginBottom: 18 }}>
                <strong style={{ color: '#E8ECF2' }}>
                  {index + 1}. {step.title}
                </strong>
                <p style={{ ...prose, marginTop: 6 }}>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {project ? (
          <section aria-labelledby="project-heading">
            <h2 id="project-heading" style={h2}>
              Verified project in this area
            </h2>
            <p style={muted}>
              From our published project record — we do not invent additional case-study details here.
            </p>
            <div style={{ borderTop: '1px solid #232833', paddingTop: 16 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 18, color: '#F2F4F7' }}>{project.name}</h3>
              <p style={{ ...muted, marginBottom: 8 }}>
                {project.locationLabel}
                {project.cameras != null ? ` · ${project.cameras} cameras` : ''}
                {project.brandLabel ? ` · ${project.brandLabel}` : ''}
                {project.duration ? ` · ${project.duration}` : ''}
              </p>
              <p style={{ ...prose, marginBottom: 12 }}>{project.summary}</p>
              <Link
                href={`/projects/${project.slug}`}
                style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
              >
                View case study →
              </Link>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="why-heading">
          <h2 id="why-heading" style={h2}>
            {page.whyChoose.heading}
          </h2>
          {page.whyChoose.intro ? <p style={muted}>{page.whyChoose.intro}</p> : null}
          <BulletList items={page.whyChoose.items} />
        </section>

        <section aria-labelledby="parents-heading">
          <h2 id="parents-heading" style={h2}>
            Parent pages
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
            {service ? (
              <li>
                <Link
                  href={`/services/${service.slug}`}
                  style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
                >
                  {service.name} (service overview)
                </Link>
                <p style={{ ...muted, margin: '4px 0 0' }}>{service.summary}</p>
              </li>
            ) : null}
            {location ? (
              <li>
                <Link
                  href={`/locations/${location.slug}`}
                  style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
                >
                  {location.name} service area
                </Link>
                <p style={{ ...muted, margin: '4px 0 0' }}>{location.summary}</p>
              </li>
            ) : null}
          </ul>
        </section>

        {relatedServiceLinks.length > 0 ? (
          <section aria-labelledby="related-services-heading">
            <h2 id="related-services-heading" style={h2}>
              Related services
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {relatedServiceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {relatedLocationLinks.length > 0 ? (
          <section aria-labelledby="related-locations-heading">
            <h2 id="related-locations-heading" style={h2}>
              Nearby &amp; related areas
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {relatedLocationLinks.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/locations/${l.slug}`}
                    style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {faqs.length > 0 ? (
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" style={h2}>
              FAQs — {location?.name ?? page.locationSlug}
            </h2>
            <dl style={{ margin: 0 }}>
              {faqs.map((faq) => (
                <div key={faq.id} style={{ marginBottom: 22 }}>
                  <dt style={{ fontWeight: 600, color: '#F2F4F7', marginBottom: 6 }}>{faq.question}</dt>
                  <dd style={{ margin: 0, color: '#9AA3B2', lineHeight: 1.65 }}>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

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
            {page.cta.heading}
          </h2>
          <p style={{ ...muted, maxWidth: 640 }}>{page.cta.body}</p>
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
              href={`tel:${PHONE}`}
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
              Call {PHONE_DISPLAY}
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
              WhatsApp
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
