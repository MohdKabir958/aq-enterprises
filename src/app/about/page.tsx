import { getPublicBusiness } from '@/lib/cms/settings';
/**
 * @file page.tsx (About)
 * @description About Us page for AQ Enterprises — trust-focused, no fabricated team/stats.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutVideo from '@/components/AboutVideo';
import Breadcrumbs from '@/components/Breadcrumbs';
import BusinessLocation from '@/components/BusinessLocation';
import { BRANDS, CERTIFICATIONS, TRUST_HIGHLIGHTS } from '@/lib/constants';
import { CTA_COPY } from '@/lib/business';
import {
  JsonLd,
  generateLocalBusinessSchema,
} from '@/lib/json-ld';

export async function generateMetadata(): Promise<Metadata> {
  const { PHONE_DISPLAY } = await getPublicBusiness();
  return {
  title: 'About Us',
  description:
    `AQ Enterprises — CCTV and security installation based in Mallapur, Hyderabad. Site survey before quote. Call ${PHONE_DISPLAY}.`,
  alternates: {
    canonical: '/about',
  },
  };
}

import Image from '@/components/ManagedImage';
import { resolvePublicSrc } from '@/lib/assets-server';

function AssetSlot({
  label,
  ariaLabel,
  hint,
  src,
}: {
  label: string;
  ariaLabel: string;
  hint: string;
  src?: string;
}) {
  const resolved = resolvePublicSrc(src);
  if (resolved) {
    return (
      <div
        style={{
          width: '100%',
          minHeight: 220,
          background: '#12151B',
          border: '1px solid #1B1F27',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <Image
          src={resolved}
          alt={ariaLabel}
          width={800}
          height={533}
          style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '14px 16px' }}>
          <p
            style={{
              color: '#F2F4F7',
              fontSize: 14,
              fontWeight: 600,
              margin: '0 0 4px',
            }}
          >
            {label}
          </p>
          <p style={{ color: '#6B7484', fontSize: 12, margin: 0 }}>{hint}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{
        width: '100%',
        minHeight: 220,
        background: '#12151B',
        border: '1px dashed #2A3140',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div>
        <p
          style={{
            color: '#6B7484',
            fontSize: 12,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin: '0 0 8px',
          }}
        >
          {label}
        </p>
        <p style={{ color: '#4A5565', fontSize: 13, margin: 0, maxWidth: 280 }}>{hint}</p>
      </div>
    </div>
  );
}

export default async function AboutPage() {
  const { PHONE, PHONE_DISPLAY, ADDRESS } = await getPublicBusiness();
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <JsonLd schema={(await generateLocalBusinessSchema())} />
      <Header active="about" />
      <div style={{ height: 'calc(76px + env(safe-area-inset-top))' }} aria-hidden="true" />

      <main>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px var(--page-gutter) 0' }}>
          <Breadcrumbs items={[{ name: 'About', url: '/about' }]} />
        </div>

        <section
          className="grid-split"
          style={{
            position: 'relative',
            maxWidth: 1280,
            margin: '0 auto',
            padding: '64px var(--page-gutter) 56px',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
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
              About Us
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(30px,3.6vw,46px)',
                lineHeight: 1.1,
                color: '#F2F4F7',
                margin: '0 0 20px',
              }}
            >
              CCTV and security installs built to keep working after day one.
            </h1>
            <p style={{ color: '#9BA5B4', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
              AQ Enterprises is based in Mallapur, Hyderabad. We plan camera and security systems with
              a site walkthrough first — proper cable runs, tested angles, and handover that people
              can actually use. We publish Hyderabad project case studies rather than invented branch
              networks or unverified customer counts.
            </p>
          </div>
          <AboutVideo />
        </section>

        <section
          aria-label="Company trust highlights"
          className="grid-responsive grid-cols-4"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 var(--page-gutter) 88px',
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

        <BusinessLocation />

        <section
          aria-labelledby="mission-heading"
          className="grid-split grid-split-equal"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 var(--page-gutter) 88px',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <AssetSlot
            label="Mallapur Operations Base"
            ariaLabel="AQ Enterprises headquarters and technical operations in Mallapur, Hyderabad"
            hint="Our central workshop and logistics base in Mallapur, Hyderabad."
            src="/images/company/office-mallapur.webp"
          />

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
              Our approach
            </span>
            <h2
              id="mission-heading"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(24px,2.6vw,32px)',
                color: '#F2F4F7',
                margin: '10px 0 20px',
              }}
            >
              Security systems people can operate after installation day.
            </h2>
            <p style={{ color: '#9BA5B4', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>
              Every job starts with a real site walkthrough, not a phone-only estimate. We recommend
              hardware for the property and document what was installed. Optional AMC scope is written
              into the quotation — we do not invent response-time SLAs or star ratings.
            </p>
            <p style={{ color: '#9BA5B4', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              Headquarters: {ADDRESS.full}
            </p>
          </div>
        </section>

        {/* Team slots — no fabricated names or roles */}
        <section
          aria-labelledby="team-heading"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--page-gutter) 88px' }}
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
              Team &amp; company photos
            </span>
            <h2
              id="team-heading"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(26px,3vw,38px)',
                color: '#F2F4F7',
                margin: '10px 0 12px',
              }}
            >
              Ready for verified photographs
            </h2>
            <p style={{ color: '#6B7484', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
              Photographs of our Mallapur team and workshop will appear here when available. We do
              not invent team members, qualifications, or headshots.
            </p>
          </div>

          <div className="grid-responsive grid-cols-4" style={{ gap: 24 }}>
            {[
              {
                label: 'Field Installation Team',
                hint: 'Qualified technicians on-site across Hyderabad.',
                src: '/images/company/cctv-field-team.webp',
              },
              {
                label: 'Monitoring & Control Rack',
                hint: 'Central NVR and server room setups.',
                src: '/images/company/cctv-control-room.webp',
              },
              {
                label: 'Tools & Precision Testing',
                hint: 'Cable testers, optical power meters & crimping equipment.',
                src: '/images/company/cctv-tools.webp',
              },
              {
                label: 'Mallapur Operations Base',
                hint: 'Service dispatch and hardware testing facility.',
                src: '/images/company/office-mallapur.webp',
              },
            ].map((slot) => (
              <article key={slot.label}>
                <AssetSlot
                  label={slot.label}
                  ariaLabel={`Photo: ${slot.label}`}
                  hint={slot.hint}
                  src={slot.src}
                />
              </article>
            ))}
          </div>
        </section>

        <section
          aria-label="Brands and certifications"
          style={{
            background: '#0d0f13',
            borderTop: '1px solid #1B1F27',
            borderBottom: '1px solid #1B1F27',
            padding: '64px var(--page-gutter)',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                textAlign: 'center',
                color: '#6B7484',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Brands we commonly install
            </div>
            <p
              style={{
                textAlign: 'center',
                color: '#4A5565',
                fontSize: 13,
                margin: '0 0 28px',
              }}
            >
              Supported / supplied brands — not authorized-dealer claims unless separately verified.
            </p>
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
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  {b}
                </div>
              ))}
            </div>

            {CERTIFICATIONS.length > 0 ? (
              <>
                <div
                  style={{
                    textAlign: 'center',
                    color: '#6B7484',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    margin: '48px 0 28px',
                  }}
                >
                  Verified certifications
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
                  {CERTIFICATIONS.map((c) => (
                    <div
                      key={c}
                      style={{
                        background: '#12151B',
                        border: '1px solid #232833',
                        borderRadius: 8,
                        padding: '16px 26px',
                        color: '#9BA5B4',
                        fontFamily: 'var(--font-space), sans-serif',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </section>

        <section
          aria-label="Call to action"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px var(--page-gutter)', textAlign: 'center' }}
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
