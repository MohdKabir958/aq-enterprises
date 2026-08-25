/**
 * @file page.tsx (Contact)
 * @description Dedicated contact page for AQ Enterprises.
 *
 * Sections:
 *   - Hero / intro with breadcrumb
 *   - Two-column layout: Quote form (left) + Contact details (right)
 *   - "What happens next" process strip
 *   - FAQ row (common contact questions)
 *
 * SEO:
 *   - ContactPage + LocalBusiness JSON-LD schema
 *   - Keyword-optimised title and description
 *   - Canonical URL set to /contact
 */

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd, generateLocalBusinessSchema } from '@/lib/json-ld';
import { siteConfig } from '@/lib/config';
import {
  PHONE,
  PHONE_DISPLAY,
  WHATSAPP_URL,
  EMAIL,
  ADDRESS,
  HOURS,
} from '@/lib/constants';
import { CTA_COPY, mapsSearchUrl, SOCIAL_PROFILES } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Contact AQ Enterprises — CCTV Installation Hyderabad',
  description: `Get in touch with AQ Enterprises for CCTV installation, security systems, and site surveys in Hyderabad. Call ${PHONE_DISPLAY} or request a free callback. Based in Mallapur.`,
  alternates: {
    canonical: '/contact',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact AQ Enterprises',
  url: `${siteConfig.url}/contact`,
  description:
    'Contact page for AQ Enterprises — CCTV and security system installation in Hyderabad.',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    telephone: PHONE,
    email: EMAIL,
    url: siteConfig.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.line1} ${ADDRESS.line2}`,
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: ADDRESS.pincode,
      addressCountry: 'IN',
    },
  },
};

const nextSteps = [
  {
    n: '01',
    t: 'Submit your request',
    d: 'Fill the form with your name, number, and property type — takes under a minute.',
  },
  {
    n: '02',
    t: 'We call you back',
    d: 'Our team reviews your details and calls to understand your site and requirements.',
  },
  {
    n: '03',
    t: 'Free site survey',
    d: 'We visit your property, map blind spots, and design a system that fits how you use the space.',
  },
  {
    n: '04',
    t: 'Clear written quote',
    d: 'You get a transparent, itemised quotation — no hidden costs, no pressure.',
  },
];

export default function ContactPage() {
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <JsonLd schema={contactPageSchema} />
      <JsonLd schema={generateLocalBusinessSchema()} />
      <Header active="contact" />
      <div style={{ height: 74 }} aria-hidden="true" />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 32px 0' }}>
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact' },
            ]}
          />
          <div style={{ marginTop: 32, marginBottom: 56 }}>
            <span
              style={{
                display: 'inline-block',
                color: '#FF5A1F',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              Get In Touch
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(30px,3.8vw,50px)',
                lineHeight: 1.08,
                color: '#F2F4F7',
                margin: '0 0 16px',
                letterSpacing: '-0.01em',
              }}
            >
              Contact AQ Enterprises
            </h1>
            <p
              style={{
                color: '#9BA5B4',
                fontSize: 17,
                lineHeight: 1.65,
                maxWidth: 560,
                margin: 0,
              }}
            >
              Request a free site survey, get a quote, or simply ask a question. We serve
              homes, offices, factories, and institutions across Hyderabad from our Mallapur base.
            </p>
          </div>
        </section>

        {/* ── Two-column: Form + Details ────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)',
              gap: 32,
              alignItems: 'start',
            }}
          >
            {/* Form side */}
            <div
              style={{
                background: '#12151B',
                border: '1px solid #1B1F27',
                borderRadius: 16,
                padding: 'clamp(28px,4vw,48px)',
              }}
            >
              <span
                style={{
                  color: '#3fa9f5',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Free Site Survey
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 'clamp(20px,2.2vw,28px)',
                  color: '#F2F4F7',
                  margin: '10px 0 6px',
                }}
              >
                {CTA_COPY.survey.heading}
              </h2>
              <p style={{ color: '#6B7484', fontSize: 14, lineHeight: 1.6, margin: '0 0 28px' }}>
                {CTA_COPY.survey.body}
              </p>
              <ContactForm />
            </div>

            {/* Contact details side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Phone */}
              <a
                href={`tel:${PHONE}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  background: '#12151B',
                  border: '1px solid #1B1F27',
                  borderRadius: 12,
                  padding: '20px 24px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(63,169,245,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.06-.24c1.16.4 2.42.6 3.74.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.6 21 3 14.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.32.2 2.58.6 3.74a1 1 0 0 1-.24 1.06L6.6 10.8z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#6B7484', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Call us</div>
                  <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600 }}>{PHONE_DISPLAY}</div>
                  <div style={{ color: '#6B7484', fontSize: 13, marginTop: 2 }}>Mon–Sat, 9 am – 7 pm</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  background: '#12151B', border: '1px solid #1B1F27',
                  borderRadius: 12, padding: '20px 24px', textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(63,169,245,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.52 5.83L0 24l6.35-1.5A11.95 11.95 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52z" fill="rgba(63,169,245,0.12)" stroke="#3fa9f5" strokeWidth="1" />
                    <path d="M17.47 14.38c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.63.14-.19.28-.72.91-.88 1.1-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.47.1-.18.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.55-.46-.47-.63-.48h-.54c-.18 0-.47.07-.72.35-.25.28-.95.93-.95 2.27s.97 2.63 1.1 2.81c.14.18 1.9 2.9 4.61 4.07.64.28 1.15.44 1.54.56.65.2 1.24.17 1.71.1.52-.08 1.6-.65 1.83-1.29.22-.63.22-1.17.15-1.28-.06-.12-.26-.18-.54-.32z" fill="#3fa9f5" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#6B7484', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>WhatsApp</div>
                  <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600 }}>Chat with us on WhatsApp</div>
                  <div style={{ color: '#6B7484', fontSize: 13, marginTop: 2 }}>Quick response for quotes</div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  background: '#12151B', border: '1px solid #1B1F27',
                  borderRadius: 12, padding: '20px 24px', textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(63,169,245,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#6B7484', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Email</div>
                  <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600 }}>{EMAIL}</div>
                  <div style={{ color: '#6B7484', fontSize: 13, marginTop: 2 }}>We reply within 24 hours</div>
                </div>
              </a>

              {/* JustDial */}
              <a
                href={SOCIAL_PROFILES.justdial.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  background: '#12151B', border: '1px solid #1B1F27',
                  borderRadius: 12, padding: '20px 24px', textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(255,102,0,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <span style={{ color: '#FF6600', fontWeight: 800, fontSize: 14, letterSpacing: '-0.02em' }}>JD</span>
                </div>
                <div>
                  <div style={{ color: '#6B7484', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>JustDial</div>
                  <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600 }}>Reviews on JustDial</div>
                  <div style={{ color: '#6B7484', fontSize: 13, marginTop: 2 }}>See our customer reviews</div>
                </div>
              </a>

              {/* Address */}
              <div
                style={{
                  background: '#12151B', border: '1px solid #1B1F27',
                  borderRadius: 12, padding: '20px 24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: 'rgba(63,169,245,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="2.5" stroke="#3fa9f5" strokeWidth="1.6" />
                    </svg>
                  </div>
                  <address style={{ fontStyle: 'normal' }}>
                    <div style={{ color: '#6B7484', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>Address</div>
                    <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{ADDRESS.line1}</div>
                    <div style={{ color: '#9BA5B4', fontSize: 14 }}>{ADDRESS.line2}, {ADDRESS.pincode}</div>
                    <div style={{ color: '#6B7484', fontSize: 13, marginTop: 4 }}>{HOURS}</div>
                    <a
                      href={mapsSearchUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', marginTop: 10, color: '#3fa9f5', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                    >
                      Open in Maps →
                    </a>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What happens next ─────────────────────────────────────────── */}
        <section
          style={{
            background: '#0d0f13',
            borderTop: '1px solid #1B1F27',
            borderBottom: '1px solid #1B1F27',
            padding: '80px 32px',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                What Happens Next
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-space), sans-serif',
                  fontSize: 'clamp(24px,2.8vw,36px)',
                  color: '#F2F4F7',
                  margin: '10px 0 0',
                }}
              >
                From enquiry to installation
              </h2>
            </div>
            <div className="grid-responsive grid-cols-4" style={{ gap: 28 }}>
              {nextSteps.map((s) => (
                <div key={s.n} style={{ paddingTop: 20, borderTop: '2px solid #FF5A1F' }}>
                  <div
                    style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 28, fontWeight: 700, color: '#1B1F27', marginBottom: 14 }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </div>
                  <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>{s.t}</h3>
                  <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 96px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Common Questions
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 'clamp(24px,2.8vw,36px)',
                color: '#F2F4F7',
                margin: '10px 0 0',
              }}
            >
              Before you get in touch
            </h2>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                q: 'Is the site survey free?',
                a: 'Yes. We visit your property, assess coverage needs, and provide a written quotation at no charge. There is no obligation to proceed.',
              },
              {
                q: 'How quickly can you come for a survey?',
                a: 'We aim to schedule site surveys within 2–3 working days of your request, depending on availability across Hyderabad.',
              },
              {
                q: 'Do you only serve Mallapur or all of Hyderabad?',
                a: 'We are based in Mallapur but serve the entire Hyderabad district — homes, offices, factories, and institutions. Our location pages list the specific neighbourhoods we cover.',
              },
              {
                q: 'Can I get a quote without a site visit?',
                a: 'For a rough estimate, yes — call or WhatsApp us with your property type and size. For an accurate quote, a site visit is always recommended to avoid surprises during installation.',
              },
              {
                q: 'What information should I have ready when I call?',
                a: 'Your property type (home, office, factory, etc.), number of floors or approximate area, and what you want to monitor. The rest we figure out during the survey.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                style={{
                  background: '#12151B',
                  border: '1px solid #1B1F27',
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: 2,
                }}
              >
                <summary
                  style={{
                    padding: '18px 24px',
                    cursor: 'pointer',
                    color: '#F2F4F7',
                    fontWeight: 600,
                    fontSize: 15,
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M6 9l6 6 6-6" stroke="#6B7484" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div style={{ padding: '0 24px 20px', color: '#9BA5B4', fontSize: 14, lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
