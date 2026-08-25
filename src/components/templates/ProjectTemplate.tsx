import type { CSSProperties } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/lib/json-ld';
import { generateSchema } from '@/lib/seo';
import { projectBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { getRelatedForProject } from '@/lib/links/related';
import { getVerifiedTestimonialForProject } from '@/lib/content/getters';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import { CTA_COPY, postalAddressSchema } from '@/lib/business';
import { siteConfig } from '@/lib/config';
import { IMAGE_SIZES } from '@/lib/assets';
import { resolvePublicSrc } from '@/lib/assets-server';
import { PROJECT_PHOTO_HEIGHT, PROJECT_PHOTO_WIDTH } from '@/lib/project-photos';
import Image from 'next/image';
import type { ImagePlaceholder, Project } from '@/types';
import TestimonialCard from '@/components/TestimonialCard';
import VerifiedImage from '@/components/VerifiedImage';
import PageShell from './PageShell';
import RelatedLinks from './RelatedLinks';

interface ProjectTemplateProps {
  project: Project;
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

function ImagePlaceholderBlock({ image }: { image: ImagePlaceholder }) {
  const resolved = resolvePublicSrc(image.src);
  if (resolved) {
    return (
      <figure
        style={{
          margin: 0,
          background: '#12151B',
          border: '1px solid #1B1F27',
          borderRadius: 14,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: 210, overflow: 'hidden', background: '#0A0C10' }}>
          <Image
            src={resolved}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>
        <figcaption style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: '#F2F4F7', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>
            {image.label || image.caption}
          </p>
          {image.caption && image.label !== image.caption ? (
            <p style={{ color: '#8892A0', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
              {image.caption}
            </p>
          ) : null}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      style={{
        margin: 0,
        border: '1px dashed #2A3140',
        background: '#12151c',
        borderRadius: 14,
        minHeight: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        textAlign: 'center',
      }}
      aria-label={`Photo not yet available: ${image.alt}`}
    >
      <figcaption>
        <p
          style={{
            color: '#6B7484',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}
        >
          Photo pending
        </p>
        <p style={{ color: '#9AA3B2', fontSize: 13, margin: 0 }}>
          {image.label}
        </p>
      </figcaption>
    </figure>
  );
}

export default function ProjectTemplate({ project }: ProjectTemplateProps) {
  const title = project.h1 || project.name;
  const breadcrumbs = projectBreadcrumbs(project.name, project.slug);
  const related = getRelatedForProject(project);
  const cta = project.cta;
  const primaryHref = cta?.primaryHref ?? '/#contact';
  const primaryLabel = cta?.primaryLabel ?? CTA_COPY.survey.heading;
  const verifiedReview = getVerifiedTestimonialForProject(project.slug);
  const heroSrc = resolvePublicSrc(project.image);

  const schema = generateSchema({
    type: 'project',
    name: title,
    description: project.seo.description || project.summary,
    url: project.seo.canonical,
    image: heroSrc,
    breadcrumbs,
    extra: {
      about: {
        '@type': 'Thing',
        name: `${project.category} CCTV installation`,
      },
      provider: {
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: PHONE,
        address: postalAddressSchema(),
      },
      ...(project.locationLabel
        ? {
            contentLocation: {
              '@type': 'Place',
              name: project.locationLabel,
            },
          }
        : {}),
    },
  });

  return (
    <PageShell active="projects" breadcrumbs={breadcrumbs}>
      {Array.isArray(schema) ? (
        schema.map((s, i) => <JsonLd key={i} schema={s} />)
      ) : (
        <JsonLd schema={schema} />
      )}

      <article>
        <header>
          <p
            style={{
              color: '#3fa9f5',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.04em',
              margin: '0 0 8px',
              textTransform: 'uppercase',
            }}
          >
            {project.category} project
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              margin: '0 0 12px',
              lineHeight: 1.15,
            }}
          >
            {title}
          </h1>
          <p style={{ color: '#6B7484', fontSize: 14, margin: '0 0 20px' }}>
            {project.locationSlug ? (
              <Link
                href={`/locations/${project.locationSlug}`}
                style={{ color: '#3fa9f5', textDecoration: 'none' }}
              >
                {project.locationLabel}
              </Link>
            ) : (
              project.locationLabel
            )}
            {project.brandLabel ? ` · ${project.brandLabel}` : ''}
            {project.cameras != null ? ` · ${project.cameras} cameras` : ''}
            {project.duration ? ` · ${project.duration}` : ''}
          </p>
          <p style={{ color: '#9AA3B2', fontSize: 17, lineHeight: 1.6, maxWidth: 720, margin: '0 0 8px' }}>
            {project.summary}
          </p>
          {heroSrc ? (
            <div
              style={{
                margin: '28px 0 16px',
                maxWidth: 860,
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid #1B1F27',
                background: '#12151B',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              }}
            >
              <Image
                src={heroSrc}
                alt={project.imageAlt || project.name}
                width={860}
                height={460}
                sizes={IMAGE_SIZES.hero}
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 460,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          ) : null}
          <p
            style={{
              color: '#6B7484',
              fontSize: 13,
              margin: '16px 0 0',
              padding: '12px 0',
              borderTop: '1px solid #232833',
              maxWidth: 720,
            }}
          >
            <strong style={{ color: '#9AA3B2', fontWeight: 600 }}>Published project record.</strong>{' '}
            Hardware specification, camera counts, duration, and site details from our installation record.
          </p>
        </header>

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" style={h2}>
            Overview
          </h2>
          <Paragraphs text={project.overview} />
        </section>

        {project.clientRequirement ? (
          <section aria-labelledby="requirement-heading">
            <h2 id="requirement-heading" style={h2}>
              Client requirement
            </h2>
            <Paragraphs text={project.clientRequirement} />
          </section>
        ) : null}

        {project.solution ? (
          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" style={h2}>
              Security solution
            </h2>
            <Paragraphs text={project.solution} />
          </section>
        ) : null}

        {project.equipment ? (
          <section aria-labelledby="equipment-heading">
            <h2 id="equipment-heading" style={h2}>
              Equipment / system used
            </h2>
            <Paragraphs text={project.equipment} />
          </section>
        ) : null}

        {project.installationApproach ? (
          <section aria-labelledby="install-heading">
            <h2 id="install-heading" style={h2}>
              Installation approach
            </h2>
            <Paragraphs text={project.installationApproach} />
          </section>
        ) : null}

        {project.results ? (
          <section aria-labelledby="results-heading">
            <h2 id="results-heading" style={h2}>
              Results
            </h2>
            <Paragraphs text={project.results} />
          </section>
        ) : null}

        <section aria-labelledby="tech-heading">
          <h2 id="tech-heading" style={h2}>
            Technical details
          </h2>
          <p style={muted}>Only fields present in the published project record are listed.</p>
          <dl
            style={{
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {project.technicalDetails.map((detail) => (
              <div key={detail.label} style={{ borderTop: '1px solid #232833', paddingTop: 12 }}>
                <dt style={{ color: '#6B7484', fontSize: 12, marginBottom: 4 }}>{detail.label}</dt>
                <dd style={{ margin: 0, color: '#F2F4F7', fontSize: 15, fontWeight: 500 }}>
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {project.gallery?.length ? (
          <section aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" style={h2}>
              Project gallery
            </h2>
            <p style={muted}>
              Site views and installation coverage for this project.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 24,
                marginTop: 20,
              }}
            >
              {project.gallery.map((img) => (
                <ImagePlaceholderBlock key={img.id} image={img} />
              ))}
            </div>
          </section>
        ) : null}

        {verifiedReview ? (
          <section aria-labelledby="testimonial-heading">
            <h2 id="testimonial-heading" style={h2}>
              Customer feedback
            </h2>
            <p style={muted}>
              Published only after independent verification and permission. Not presented as a Google
              rating unless the source is a verified review platform.
            </p>
            <TestimonialCard testimonial={verifiedReview} />
          </section>
        ) : null}

        <RelatedLinks
          related={related}
          sections={[
            { key: 'services', title: 'Related Services' },
            { key: 'locations', title: 'Related Locations' },
            { key: 'projects', title: 'Related Projects' },
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
            {cta?.heading ?? 'Planning a similar installation?'}
          </h2>
          <p style={{ ...muted, maxWidth: 640 }}>
            {cta?.body ??
              'Request a free site survey in Hyderabad. We quote from the property — not from a generic camera count.'}
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
