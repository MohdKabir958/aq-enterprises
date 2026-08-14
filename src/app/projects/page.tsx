/**
 * @file page.tsx (Projects)
 * @description Portfolio page showcasing past installations.
 *
 * ACCESSIBILITY & SEO:
 *   - Semantic landmarks (<main>, <section>, <blockquote>)
 *   - Accurate metadata description including Hyderabad geo-targeting
 *   - Uses centralized testimonial data to fix location inconsistencies
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/ProjectsGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PHONE, PHONE_DISPLAY, TESTIMONIALS } from '@/lib/constants';
import { CTA_COPY } from '@/lib/business';
import { getAllProjects } from '@/lib/content/getters';
import TestimonialCard from '@/components/TestimonialCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Verified CCTV and security installation case studies across homes, offices and industrial sites in Hyderabad. Hikvision, Dahua, CP Plus, Bosch and more.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const testimonial = TESTIMONIALS[0];

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <Header active="projects" />
      {/* Spacer for fixed header */}
      <div style={{ height: 74 }} aria-hidden="true" />

      <main>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 0' }}>
          <Breadcrumbs items={[{ name: 'Projects', url: '/projects' }]} />
        </div>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 40px' }}>
          <span
            style={{
              display: 'inline-block',
              color: '#FF5A1F',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            Projects
          </span>
          <h1
            style={{
              fontFamily: "var(--font-space), sans-serif",
              fontSize: 'clamp(32px,4vw,50px)',
              lineHeight: 1.1,
              color: '#F2F4F7',
              margin: '0 0 20px',
              maxWidth: 760,
            }}
          >
            Verified installation case studies
          </h1>
          <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.65, maxWidth: 620, margin: 0 }}>
            Published project records across homes, offices, and industrial sites in Hyderabad —
            camera counts, brands, and timelines from our verified portfolio. Open a case study for
            full details and related services.
          </p>
        </section>

        {/* ── Filterable Grid (Client Component) ────────────────────────── */}
        <ProjectsGrid projects={projects} />

        {testimonial ? (
          <section
            aria-label="Project-linked customer feedback"
            style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}
          >
            <div
              style={{
                background: '#12151B',
                border: '1px solid #1B1F27',
                borderRadius: 12,
                padding: '8px 28px 28px',
              }}
            >
              <TestimonialCard
                testimonial={{
                  quote: testimonial.quote,
                  name: testimonial.name,
                  role: testimonial.role,
                  verificationStatus: testimonial.verificationStatus ?? 'pending',
                  source: testimonial.source ?? 'Project handover feedback',
                }}
              />
            </div>
          </section>
        ) : null}

        <section
          aria-label="Call to action"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(24px,2.8vw,34px)',
              color: '#F2F4F7',
              margin: '0 0 12px',
            }}
          >
            {CTA_COPY.survey.heading}
          </h2>
          <p style={{ color: '#6B7484', fontSize: 15, margin: '0 0 24px' }}>{CTA_COPY.survey.body}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`tel:${PHONE}`}
              style={{
                background: '#FF5A1F',
                color: '#0A0C10',
                fontWeight: 600,
                fontSize: 15,
                padding: '15px 26px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/#contact"
              style={{
                background: '#12151B',
                border: '1px solid #232833',
                color: '#F2F4F7',
                fontWeight: 600,
                fontSize: 15,
                padding: '15px 26px',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              {CTA_COPY.quote.heading}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
