/**
 * @file page.tsx
 * @description Homepage for AQ Enterprises.
 *
 * Sections:
 *   - Hero (with 3D Camera Scene)
 *   - Statistics
 *   - Services Grid (Summary)
 *   - Brands
 *   - How It Works
 *   - Why Choose Us
 *   - Recent Projects (Summary)
 *   - Testimonials
 *   - FAQ
 *   - Quote Form
 *
 * ACCESSIBILITY & SEO:
 *   - Proper semantic HTML5 landmarks (<main>, <section>, <article>)
 *   - H1-H3 heading hierarchy maintained strictly
 *   - Uses Next.js Metadata API for page-specific titles/descriptions
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import ContactForm from '@/components/ContactForm';
import CameraSceneLoader from '@/components/CameraSceneLoader';
import {
  PHONE,
  PHONE_DISPLAY,
  WHATSAPP_URL,
  BRANDS,
  TRUST_HIGHLIGHTS,
  EMAIL,
  ADDRESS,
  HOURS,
} from '@/lib/constants';
import { CTA_COPY, mapsSearchUrl } from '@/lib/business';
import {
  getAllProjects,
  getPublishedVerifiedTestimonials,
} from '@/lib/content/getters';
import { IMAGE_SIZES } from '@/lib/assets';
import { resolvePublicSrc } from '@/lib/assets-server';
import { PROJECT_PHOTO_HEIGHT, PROJECT_PHOTO_WIDTH } from '@/lib/project-photos';
import TestimonialCard from '@/components/TestimonialCard';
import VerifiedImage from '@/components/VerifiedImage';
import {
  JsonLd,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from '@/lib/json-ld';

export const metadata: Metadata = {
  title: {
    absolute: 'AQ Enterprises — CCTV & Security Systems, Hyderabad',
  },
  description:
    `CCTV and security installation for homes and businesses across Hyderabad. Site survey before quote. Call ${PHONE_DISPLAY}. Based in Mallapur.`,
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const recentProjects = getAllProjects().slice(0, 3);
  const verifiedReviews = getPublishedVerifiedTestimonials();

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <JsonLd schema={generateOrganizationSchema()} />
      <JsonLd schema={generateLocalBusinessSchema()} />
      <Header active="home" />
      {/* Spacer for fixed header */}
      <div style={{ height: 74 }} aria-hidden="true" />

      <main>
        {/* ── Hero Section ──────────────────────────────────────────────── */}
        <section
          id="hero"
          className="grid-split"
          style={{
            position: 'relative',
            maxWidth: 1280,
            margin: '0 auto',
            padding: '64px 32px 80px',
            gap: 24,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -120,
              right: -160,
              width: 560,
              height: 560,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(63,169,245,0.16),transparent 70%)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
          <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.7s ease both' }}>
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
              CCTV Installation · Hyderabad
            </span>
            <h1
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 'clamp(34px,4.2vw,54px)',
                lineHeight: 1.08,
                color: '#F2F4F7',
                margin: '0 0 12px',
                letterSpacing: '-0.01em',
              }}
            >
              CCTV Installation in Hyderabad — Homes, Offices & Factories
            </h1>
            <p
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 'clamp(18px,1.8vw,22px)',
                color: '#9BA5B4',
                margin: '0 0 16px',
                fontStyle: 'italic',
                lineHeight: 1.3,
              }}
            >
              See everything on your property. Miss nothing that matters.
            </p>
            <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.6, maxWidth: 480, margin: '0 0 32px' }}>
              We design, install and maintain CCTV and access-control systems for homes, offices and
              industrial sites across Hyderabad — done right the first time.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
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
                Call Now →
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
                  padding: '15px 26px',
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                WhatsApp Us
              </a>
            </div>
            <div style={{ color: '#6B7484', fontSize: 14 }}>
              Mallapur, Hyderabad &nbsp;·&nbsp; Site survey before quote &nbsp;·&nbsp; Published local projects
            </div>
          </div>
          <CameraSceneLoader />
        </section>

        {/* ── Trust highlights (no unverified metrics) ──────────────────── */}
        <section
          aria-label="Why trust AQ Enterprises"
          className="grid-responsive grid-cols-4"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 32px 72px',
          }}
        >
          {TRUST_HIGHLIGHTS.map((s) => (
            <div key={s.label} style={{ padding: '24px 0', borderTop: '2px solid #FF5A1F' }}>
              <div
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#F2F4F7',
                  lineHeight: 1.35,
                }}
              >
                {s.label}
              </div>
              <div style={{ color: '#6B7484', fontSize: 14, marginTop: 6 }}>{s.detail}</div>
            </div>
          ))}
        </section>

        {/* ── Services Grid Summary ─────────────────────────────────────── */}
        <section id="services" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span
                style={{
                  color: '#3fa9f5',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                What We Do
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 'clamp(26px,3vw,38px)',
                  color: '#F2F4F7',
                  margin: '10px 0 0',
                }}
              >
                Security systems for every property type
              </h2>
            </div>
            <Link
              href="/services"
              style={{
                color: '#F2F4F7',
                fontSize: 14,
                fontWeight: 600,
                borderBottom: '2px solid #FF5A1F',
                paddingBottom: 3,
                textDecoration: 'none',
              }}
            >
              View All Services →
            </Link>
          </div>
          
          <div
            className="grid-responsive grid-cols-4"
            style={{
              gap: 1,
              background: '#1B1F27',
              border: '1px solid #1B1F27',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {[
              {
                svg: (
                  <>
                    <path d="M8 19L20 9l12 10" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M11 17v13h18V17" stroke="#3fa9f5" strokeWidth="1.6" />
                  </>
                ),
                title: 'Home CCTV Installation',
                desc: 'Complete coverage for entry points, gates and common areas.',
              },
              {
                svg: (
                  <>
                    <rect x="10" y="8" width="20" height="24" stroke="#3fa9f5" strokeWidth="1.6" />
                    <path
                      d="M15 14h3M22 14h3M15 20h3M22 20h3M15 26h3M22 26h3"
                      stroke="#3fa9f5"
                      strokeWidth="1.6"
                    />
                  </>
                ),
                title: 'Office & Commercial',
                desc: 'Access-controlled, multi-floor surveillance for workplaces.',
              },
              {
                svg: (
                  <path
                    d="M8 32V18l7 5v-5l7 5v-5l8 5v9H8z"
                    stroke="#3fa9f5"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                ),
                title: 'Factory & Warehouse',
                desc: 'Wide-area coverage built for industrial sites and logistics.',
              },
              {
                svg: (
                  <>
                    <path d="M20 8L34 15 20 22 6 15z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M12 18v8c0 2 4 4 8 4s8-2 8-4v-8" stroke="#3fa9f5" strokeWidth="1.6" />
                  </>
                ),
                title: 'School & Institutional',
                desc: 'Campus-wide monitoring with restricted access zones.',
              },
              {
                svg: (
                  <>
                    <circle cx="20" cy="18" r="9" stroke="#3fa9f5" strokeWidth="1.6" />
                    <circle cx="20" cy="18" r="3" stroke="#3fa9f5" strokeWidth="1.6" />
                    <path d="M20 27v6M14 33h12" stroke="#3fa9f5" strokeWidth="1.6" />
                  </>
                ),
                title: 'IP Camera Installation',
                desc: 'High-resolution network cameras with remote viewing.',
              },
              {
                svg: (
                  <>
                    <path
                      d="M13 22a10 10 0 0 1 14 0M9 17a16 16 0 0 1 22 0"
                      stroke="#3fa9f5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="27" r="2.4" fill="#3fa9f5" />
                  </>
                ),
                title: 'Wireless CCTV Systems',
                desc: 'Clean installs with no cabling for tricky sites.',
              },
              {
                svg: (
                  <>
                    <rect x="12" y="18" width="16" height="14" rx="2" stroke="#3fa9f5" strokeWidth="1.6" />
                    <path d="M16 18v-4a4 4 0 0 1 8 0v4" stroke="#3fa9f5" strokeWidth="1.6" />
                  </>
                ),
                title: 'Access Control & Biometric',
                desc: 'Fingerprint and card-based entry systems.',
              },
              {
                svg: (
                  <>
                    <path
                      d="M20 8v6M20 26v6M8 20h6M26 20h6"
                      stroke="#3fa9f5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="20" cy="20" r="6" stroke="#3fa9f5" strokeWidth="1.6" />
                  </>
                ),
                title: 'AMC & Maintenance',
                desc: 'Scheduled servicing and priority repair visits.',
              },
            ].map((s) => (
              <Link
                key={s.title}
                href="/services"
                style={{ background: '#12151B', padding: '28px 24px', display: 'block', textDecoration: 'none' }}
              >
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 16 }} aria-hidden="true">
                  {s.svg}
                </svg>
                <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 8px 0' }}>{s.title}</h3>
                <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Brands ────────────────────────────────────────────────────── */}
        <section
          aria-label="Brands we commonly install"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}
        >
          <div
            style={{
              textAlign: 'center',
              color: '#6B7484',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            Brands we commonly install and support
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            {BRANDS.map((b) => (
              <div
                key={b}
                style={{
                  background: '#12151B',
                  border: '1px solid #232833',
                  borderRadius: 8,
                  padding: '16px 26px',
                  color: '#9BA5B4',
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ──────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                color: '#3fa9f5',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              How It Works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-space), sans-serif",
                fontSize: 'clamp(26px,3vw,38px)',
                color: '#F2F4F7',
                margin: '10px 0 0',
              }}
            >
              From site visit to switch-on
            </h2>
          </div>
          <div className="grid-responsive grid-cols-5" style={{ gap: 20 }}>
            {[
              { n: '01', t: 'Site Visit', d: 'We inspect your property and map every blind spot.' },
              { n: '02', t: 'Custom Quote', d: 'Transparent pricing, no hidden costs.' },
              { n: '03', t: 'Installation', d: 'Neat cabling and mounts with clear labeling.' },
              { n: '04', t: 'Testing & Handover', d: 'Coverage checks and viewing walkthrough.' },
              { n: '05', t: 'AMC & Support', d: 'Optional maintenance plans written into your quote.' },
            ].map((s) => (
              <div key={s.n} style={{ paddingTop: 20, borderTop: '1px solid #232833' }}>
                <div
                  style={{
                    fontFamily: "var(--font-space), sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#232833',
                    marginBottom: 14,
                  }}
                  aria-hidden="true"
                >
                  {s.n}
                </div>
                <h3 style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600, margin: '0 0 8px 0' }}>
                  {s.t}
                </h3>
                <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────────────── */}
        <section
          style={{
            background: '#0d0f13',
            borderTop: '1px solid #1B1F27',
            borderBottom: '1px solid #1B1F27',
            padding: '80px 32px',
          }}
        >
          <div
            className="grid-responsive grid-cols-4"
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              gap: 32,
            }}
          >
            {[
              {
                svg: (
                  <path
                    d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.7 7.1 17.2l.9-5.5-4-3.9 5.5-.8z"
                    stroke="#3fa9f5"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                ),
                t: 'Survey-led installs',
                d: 'We walk the site before quoting so coverage matches how you use the property.',
              },
              {
                svg: (
                  <path
                    d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"
                    stroke="#3fa9f5"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                ),
                t: 'Established hardware brands',
                d: `We commonly install ${BRANDS[0]}, ${BRANDS[1]}, ${BRANDS[2]} and other supported brands when they fit the brief.`,
              },
              {
                svg: (
                  <>
                    <circle cx="12" cy="12" r="9" stroke="#3fa9f5" strokeWidth="1.4" />
                    <path d="M12 7v5l3.5 2" stroke="#3fa9f5" strokeWidth="1.4" strokeLinecap="round" />
                  </>
                ),
                t: 'Hyderabad service area',
                d: 'Homes, businesses, and institutions across Hyderabad — from our Mallapur base.',
              },
              {
                svg: (
                  <>
                    <path d="M4 12a8 8 0 0 1 16 0" stroke="#3fa9f5" strokeWidth="1.4" />
                    <rect x="3" y="12" width="4" height="6" rx="1" stroke="#3fa9f5" strokeWidth="1.4" />
                    <rect x="17" y="12" width="4" height="6" rx="1" stroke="#3fa9f5" strokeWidth="1.4" />
                  </>
                ),
                t: 'AMC when you need it',
                d: 'Maintenance scope and visit frequency are written into the quotation — not invented SLAs.',
              },
            ].map((w) => (
              <div key={w.t}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: 'rgba(63,169,245,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                  }}
                  aria-hidden="true"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    {w.svg}
                  </svg>
                </div>
                <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 8px 0' }}>
                  {w.t}
                </h3>
                <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.55, margin: 0 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recent Projects ───────────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <span
                style={{
                  color: '#3fa9f5',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Recent Work
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 'clamp(26px,3vw,38px)',
                  color: '#F2F4F7',
                  margin: '10px 0 0',
                }}
              >
                Recent installations
              </h2>
            </div>
            <Link
              href="/projects"
              style={{
                color: '#F2F4F7',
                fontSize: 14,
                fontWeight: 600,
                borderBottom: '2px solid #FF5A1F',
                paddingBottom: 3,
                textDecoration: 'none',
              }}
            >
              View All Projects →
            </Link>
          </div>
          
          <div className="grid-responsive grid-cols-3" style={{ gap: 24 }}>
            {recentProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                style={{
                  display: 'block',
                  background: '#12151B',
                  border: '1px solid #1B1F27',
                  borderRadius: 12,
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: 200,
                    background: 'linear-gradient(135deg,#1B1F27,#12151B)',
                    overflow: 'hidden',
                  }}
                >
                  {resolvePublicSrc(p.image) ? (
                    <VerifiedImage
                      src={p.image}
                      alt={p.imageAlt || p.name}
                      width={PROJECT_PHOTO_WIDTH}
                      height={PROJECT_PHOTO_HEIGHT}
                      sizes={IMAGE_SIZES.card}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={p.imageAlt || p.name}
                      style={{
                        width: '100%',
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="9" stroke="#2A3040" strokeWidth="1.6" />
                        <circle cx="20" cy="20" r="3" stroke="#2A3040" strokeWidth="1.6" />
                        <path d="M20 29v5M14 34h12" stroke="#2A3040" strokeWidth="1.6" strokeLinecap="round" />
                        <rect x="6" y="6" width="28" height="28" rx="4" stroke="#1E2330" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 10px 0' }}>
                    {p.name}
                  </h3>
                  <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                    {p.cameras != null ? `${p.cameras} Cameras` : '—'} · {p.brandLabel || '—'} · {p.duration || '—'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Reviews (verified only) ───────────────────────────────────── */}
        <section
          aria-labelledby="reviews-heading"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                color: '#3fa9f5',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Customer feedback
            </span>
            <h2
              id="reviews-heading"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(26px,3vw,38px)',
                color: '#F2F4F7',
                margin: '10px 0 0',
              }}
            >
              Verified reviews
            </h2>
          </div>
          {verifiedReviews.length > 0 ? (
            <div className="grid-responsive grid-cols-3" style={{ gap: 24 }}>
              {verifiedReviews.map((t) => (
                <article
                  key={t.id}
                  style={{
                    background: '#12151B',
                    border: '1px solid #1B1F27',
                    borderRadius: 12,
                    padding: '8px 28px 28px',
                  }}
                >
                  <TestimonialCard testimonial={t} />
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: '#12151B',
                border: '1px solid #1B1F27',
                borderRadius: 12,
                padding: 32,
                textAlign: 'center',
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              <p style={{ color: '#C7CDD6', fontSize: 15, lineHeight: 1.65, margin: '0 0 12px' }}>
                We publish customer reviews only after they are independently verified (for example
                via Google Business Profile with permission). Project case studies below show our
                verified Hyderabad installs.
              </p>
              <p style={{ color: '#6B7484', fontSize: 14, margin: 0 }}>
                Prefer to talk now?{' '}
                <a href={`tel:${PHONE}`} style={{ color: '#3fa9f5' }}>
                  Call {PHONE_DISPLAY}
                </a>{' '}
                or{' '}
                <Link href="/#contact" style={{ color: '#3fa9f5' }}>
                  {CTA_COPY.survey.heading.toLowerCase()}
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <FaqSection />

        {/* ── Quote / Contact ───────────────────────────────────────────── */}
        <section id="quote" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
          <div
            id="contact"
            className="grid-split grid-split-form"
            style={{
              background: '#12151B',
              border: '1px solid #1B1F27',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {/* Form Side */}
            <div style={{ padding: 48 }}>
              <span
                style={{
                  color: '#3fa9f5',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Get Started
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontSize: 'clamp(24px,2.6vw,32px)',
                  color: '#F2F4F7',
                  margin: '10px 0 24px',
                }}
              >
                Ready for a free site visit?
              </h2>
              
              <ContactForm />
            </div>

            {/* Contact Info Side */}
            <div style={{ background: '#0d0f13', padding: 48, borderLeft: '1px solid #1B1F27' }}>
              <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600, marginBottom: 22 }}>
                Talk to us directly
              </div>
              <address
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  marginBottom: 28,
                  fontStyle: 'normal'
                }}
              >
                <a href={`tel:${PHONE}`} style={{ color: '#C7CDD6', fontSize: 15, textDecoration: 'none' }}>
                  📞 {PHONE_DISPLAY}
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#C7CDD6', fontSize: 15, textDecoration: 'none' }}>
                  💬 WhatsApp Us
                </a>
                <a href={`mailto:${EMAIL}`} style={{ color: '#C7CDD6', fontSize: 15, textDecoration: 'none' }}>
                  ✉ {EMAIL}
                </a>
                <span style={{ color: '#6B7484', fontSize: 14, lineHeight: 1.5 }}>
                  {ADDRESS.line1}<br />
                  {ADDRESS.line2}, {ADDRESS.pincode}
                </span>
                <span style={{ color: '#6B7484', fontSize: 14 }}>{HOURS}</span>
              </address>
              
              <a
                href={mapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  width: '100%',
                  minHeight: 160,
                  background: 'linear-gradient(135deg,#1B1F27,#12151B)',
                  borderRadius: 10,
                  padding: 20,
                  textDecoration: 'none',
                }}
              >
                <span style={{ display: 'block', color: '#F2F4F7', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                  Mallapur, Hyderabad
                </span>
                <span style={{ display: 'block', color: '#6B7484', fontSize: 13, lineHeight: 1.5 }}>
                  {ADDRESS.full}
                </span>
                <span style={{ display: 'block', color: '#3fa9f5', fontSize: 13, marginTop: 12 }}>
                  Open address search in Google Maps →
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
