import type { CSSProperties } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { locationBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getRelatedForLocation } from '@/lib/links/related';
import {
  getFaqsByIds,
  getProjectBySlug,
  getServiceBySlug,
  getServiceLocationsForLocation,
} from '@/lib/content/getters';
import { PHONE, PHONE_DISPLAY, PROJECTS_DATA, WHATSAPP_URL } from '@/lib/constants';
import type { FAQ, ImagePlaceholder, Location } from '@/types';
import PageShell from './PageShell';
import RelatedLinks from './RelatedLinks';

interface LocationTemplateProps {
  location: Location;
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
        minHeight: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}
      aria-label={image.alt}
    >
      <figcaption>
        <p
          style={{
            color: '#6B7484',
            fontSize: 12,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin: '0 0 8px',
          }}
        >
          Image placeholder
        </p>
        <p style={{ color: '#9AA3B2', fontSize: 14, margin: 0, maxWidth: 420 }}>{image.label}</p>
        <p style={{ color: '#4A5565', fontSize: 12, margin: '8px 0 0' }}>ALT: {image.alt}</p>
      </figcaption>
    </figure>
  );
}

export default function LocationTemplate({ location }: LocationTemplateProps) {
  const breadcrumbs = locationBreadcrumbs(location.name, location.slug);
  const related = getRelatedForLocation(location);
  const collectionFaqs = getFaqsByIds(location.relatedFaqs ?? []);
  const faqs: FAQ[] = [...(location.faqs ?? []), ...collectionFaqs];

  const areaServices = (location.relatedServices ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const localServicePages = getServiceLocationsForLocation(location.slug);
  const verifiedProjects = (location.verifiedProjectIds ?? [])
    .map((id) => {
      const contentProject = getProjectBySlug(id);
      const legacy = PROJECTS_DATA.find((p) => p.id === id);
      if (!contentProject && !legacy) return null;
      return {
        id,
        name: contentProject?.name ?? legacy!.name,
        location: contentProject?.locationLabel ?? legacy!.location,
        category: contentProject?.category ?? legacy!.category,
        cameras: contentProject?.cameras ?? legacy!.cameras,
        brand: contentProject?.brandLabel ?? legacy!.brand,
        imageAlt: contentProject?.imageAlt ?? legacy!.imageAlt,
        href: contentProject ? `/projects/${contentProject.slug}` : undefined,
      };
    })
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const schema = generateSchema({
    type: 'location',
    name: location.h1 || location.name,
    description: location.seo.description || location.summary,
    url: location.seo.canonical,
    image: location.hero.image?.id,
    breadcrumbs,
    faqs,
    extra: {
      areaServedName: `${location.name}, ${location.city}`,
    },
  });

  const primaryHref = location.cta.primaryHref ?? '/#contact';
  const primaryLabel = location.cta.primaryLabel ?? 'Request a Free Site Survey';
  const secondaryHref = location.cta.secondaryHref ?? `tel:${PHONE}`;
  const secondaryLabel = location.cta.secondaryLabel ?? `Call ${PHONE_DISPLAY}`;

  return (
    <PageShell active="home" breadcrumbs={breadcrumbs}>
      {Array.isArray(schema) ? (
        schema.map((s, i) => <JsonLd key={i} schema={s} />)
      ) : (
        <JsonLd schema={schema} />
      )}

      <article>
        <header style={{ marginBottom: 8 }}>
          {location.hero.eyebrow ? (
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
              {location.hero.eyebrow}
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
              maxWidth: 860,
            }}
          >
            {location.h1}
          </h1>
          <p style={{ color: '#9AA3B2', fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 0 20px' }}>
            {location.hero.subheadline}
          </p>
          <p style={{ color: '#6B7484', fontSize: 13, margin: '0 0 16px' }}>
            Service area · {location.name}, {location.city}, {location.region}
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
          </div>
          {location.hero.image ? <ImagePlaceholderBlock image={location.hero.image} /> : null}
        </header>

        <section aria-labelledby="intro-heading">
          <h2 id="intro-heading" style={h2}>
            {location.hero.headline}
          </h2>
          <Paragraphs text={location.introduction} />
        </section>

        {areaServices.length > 0 ? (
          <section aria-labelledby="services-heading">
            <h2 id="services-heading" style={h2}>
              CCTV &amp; security services in {location.name}
            </h2>
            {location.servicesIntro ? <p style={muted}>{location.servicesIntro}</p> : null}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
              {areaServices.map((service) => {
                const deep = localServicePages.find((p) => p.serviceSlug === service.slug);
                return (
                  <li key={service.slug}>
                    <Link
                      href={
                        deep
                          ? `/locations/${deep.locationSlug}/${deep.serviceSlug}`
                          : `/services/${service.slug}`
                      }
                      style={{ color: '#3fa9f5', fontWeight: 600, fontSize: 16, textDecoration: 'none' }}
                    >
                      {deep ? deep.h1 : service.name}
                    </Link>
                    <p style={{ ...muted, margin: '4px 0 0' }}>
                      {deep ? deep.summary : service.summary}
                    </p>
                    {deep ? (
                      <p style={{ margin: '6px 0 0' }}>
                        <Link
                          href={`/services/${service.slug}`}
                          style={{ color: '#6B7484', fontSize: 13, textDecoration: 'none' }}
                        >
                          Broad {service.name} overview →
                        </Link>
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="property-types-heading">
          <h2 id="property-types-heading" style={h2}>
            {location.propertyTypes.heading}
          </h2>
          {location.propertyTypes.intro ? <p style={muted}>{location.propertyTypes.intro}</p> : null}
          <BulletList items={location.propertyTypes.items} />
        </section>

        <section aria-labelledby="security-heading">
          <h2 id="security-heading" style={h2}>
            {location.securityRequirements.heading}
          </h2>
          {location.securityRequirements.intro ? (
            <p style={muted}>{location.securityRequirements.intro}</p>
          ) : null}
          <BulletList items={location.securityRequirements.items} />
        </section>

        <section aria-labelledby="solutions-heading">
          <h2 id="solutions-heading" style={h2}>
            {location.recommendedSolutions.heading}
          </h2>
          <Paragraphs text={location.recommendedSolutions.body} />
        </section>

        <section aria-labelledby="process-heading">
          <h2 id="process-heading" style={h2}>
            {location.installationProcess.heading}
          </h2>
          {location.installationProcess.intro ? (
            <p style={muted}>{location.installationProcess.intro}</p>
          ) : null}
          <ol style={{ margin: 0, paddingLeft: 20, color: '#C5CCD8', lineHeight: 1.7 }}>
            {location.installationProcess.steps.map((step, index) => (
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
            {location.maintenance.heading}
          </h2>
          <Paragraphs text={location.maintenance.body} />
          <p style={{ marginTop: 12 }}>
            <Link
              href="/services/cctv-amc-maintenance"
              style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}
            >
              CCTV AMC &amp; Maintenance →
            </Link>
          </p>
        </section>

        {location.whyLocal ? (
          <section aria-labelledby="why-local-heading">
            <h2 id="why-local-heading" style={h2}>
              {location.whyLocal.heading}
            </h2>
            {location.whyLocal.intro ? <p style={muted}>{location.whyLocal.intro}</p> : null}
            <BulletList items={location.whyLocal.items} />
          </section>
        ) : null}

        {verifiedProjects.length > 0 ? (
          <section aria-labelledby="projects-heading">
            <h2 id="projects-heading" style={h2}>
              Verified projects in this area
            </h2>
            <p style={muted}>
              These entries come from our published project list. We do not invent case studies for
              neighborhoods without verified data.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
              {verifiedProjects.map((project) => (
                <li
                  key={project.id}
                  style={{ borderTop: '1px solid #232833', paddingTop: 16 }}
                >
                  <h3 style={h3}>
                    {project.href ? (
                      <Link href={project.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {project.name}
                      </Link>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p style={{ ...muted, marginBottom: 4 }}>
                    {project.location} · {project.category}
                    {project.cameras ? ` · ${project.cameras} cameras` : ''}
                    {project.brand ? ` · ${project.brand}` : ''}
                  </p>
                  <p style={{ color: '#6B7484', fontSize: 13, margin: 0 }}>{project.imageAlt}</p>
                  {project.href ? (
                    <p style={{ margin: '8px 0 0' }}>
                      <Link
                        href={project.href}
                        style={{ color: '#3fa9f5', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                      >
                        View case study →
                      </Link>
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 16 }}>
              <Link href="/projects" style={{ color: '#3fa9f5', fontWeight: 600, textDecoration: 'none' }}>
                View all projects →
              </Link>
            </p>
          </section>
        ) : null}

        {location.imagePlaceholders?.length ? (
          <section aria-labelledby="visual-heading">
            <h2 id="visual-heading" style={h2}>
              Visual reference
            </h2>
            <p style={muted}>
              Placeholders only — not labeled as completed AQ Enterprises project photography.
            </p>
            {location.imagePlaceholders.map((img) => (
              <ImagePlaceholderBlock key={img.id} image={img} />
            ))}
          </section>
        ) : null}

        {faqs.length > 0 ? (
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" style={h2}>
              Frequently asked questions — {location.name}
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

        <RelatedLinks
          related={related}
          sections={[
            { key: 'services', title: 'Related Services' },
            { key: 'locations', title: 'Nearby & Related Areas' },
            { key: 'projects', title: 'Related Projects' },
            { key: 'blogs', title: 'Related Articles' },
          ]}
        />

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
            {location.cta.heading}
          </h2>
          <p style={{ ...muted, maxWidth: 640 }}>{location.cta.body}</p>
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
