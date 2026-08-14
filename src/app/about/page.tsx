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
import { PHONE, PHONE_DISPLAY, EMAIL, HOURS, WHATSAPP_URL, BRANDS, CERTIFICATIONS, TRUST_HIGHLIGHTS } from '@/lib/constants';
import { CTA_COPY, ADDRESS, mapsSearchUrl } from '@/lib/business';
import {
  JsonLd,
  generateLocalBusinessSchema,
} from '@/lib/json-ld';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    `AQ Enterprises — CCTV and security installation based in Mallapur, Hyderabad. Site survey before quote. Call ${PHONE_DISPLAY}.`,
  alternates: {
    canonical: '/about',
  },
};

function AssetSlot({
  label,
  ariaLabel,
  hint,
}: {
  label: string;
  ariaLabel: string;
  hint: string;
}) {
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

export default function AboutPage() {
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <JsonLd schema={generateLocalBusinessSchema()} />
      <Header active="about" />
      <div style={{ height: 74 }} aria-hidden="true" />

      <main>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 0' }}>
          <Breadcrumbs items={[{ name: 'About', url: '/about' }]} />
        </div>

        <section
          className="grid-split"
          style={{
            position: 'relative',
            maxWidth: 1280,
            margin: '0 auto',
            padding: '64px 32px 56px',
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
            padding: '0 32px 88px',
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

        <section
          aria-labelledby="nap-heading"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}
        >
          <h2
            id="nap-heading"
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(24px,2.6vw,32px)',
              color: '#F2F4F7',
              margin: '0 0 12px',
            }}
          >
            How to reach us
          </h2>
          <p style={{ color: '#9BA5B4', fontSize: 15, lineHeight: 1.7, margin: '0 0 24px', maxWidth: 640 }}>
            One physical base in Mallapur. Neighborhood pages on this site are service areas we
            survey from here — not additional branch offices.{' '}
            <Link href="/locations" style={{ color: '#3fa9f5' }}>
              Browse Hyderabad service areas
            </Link>
            {' · '}
            <Link href="/projects" style={{ color: '#3fa9f5' }}>
              View published projects
            </Link>
            .
          </p>
          <address
            style={{
              display: 'grid',
              gap: 12,
              fontStyle: 'normal',
              color: '#C7CDD6',
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            <a href={`tel:${PHONE}`} style={{ color: '#C7CDD6', textDecoration: 'none' }}>
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C7CDD6', textDecoration: 'none' }}
            >
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} style={{ color: '#C7CDD6', textDecoration: 'none' }}>
              {EMAIL}
            </a>
            <span>{ADDRESS.full}</span>
            <span>{HOURS}</span>
            <a
              href={mapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3fa9f5', textDecoration: 'none' }}
            >
              Open address search in Google Maps
            </a>
          </address>
        </section>

        <section
          aria-labelledby="mission-heading"
          className="grid-split grid-split-equal"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 32px 88px',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <AssetSlot
            label="Company photograph pending"
            ariaLabel="Placeholder for AQ Enterprises office or workshop photograph"
            hint="Office or workshop photograph of the Mallapur base — not stock imagery."
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
                label: 'Founder / lead',
                hint: 'Approved name, role, and headshot with consent.',
              },
              {
                label: 'Installation technicians',
                hint: 'Group or on-site install photos — no stock imagery.',
              },
              {
                label: 'Office photograph',
                hint: 'Mallapur office or workshop exterior or interior.',
              },
              {
                label: 'Equipment / install detail',
                hint: 'Wiring, NVR, or mount close-ups from a real job.',
              },
            ].map((slot) => (
              <article key={slot.label}>
                <AssetSlot
                  label={slot.label}
                  ariaLabel={`Placeholder: ${slot.label}`}
                  hint={slot.hint}
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
            padding: '64px 32px',
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
          style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px', textAlign: 'center' }}
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
