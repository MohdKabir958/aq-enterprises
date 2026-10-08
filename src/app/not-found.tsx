import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublicBusiness } from '@/lib/cms/settings';
import { CTA_COPY } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const { PHONE, PHONE_DISPLAY, WHATSAPP_URL } = await getPublicBusiness();
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#F2F4F7' }}>
      <Header />
      <div style={{ height: 'calc(76px + env(safe-area-inset-top))' }} aria-hidden="true" />
      <main
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '80px 20px 120px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#FF5A1F',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            margin: '0 0 16px',
            lineHeight: 1.2,
          }}
        >
          This page is not available
        </h1>
        <p style={{ color: '#9BA5B4', fontSize: 16, lineHeight: 1.65, margin: '0 0 32px' }}>
          The link may be outdated, or the page was moved. Use the links below to continue, or
          request a site survey.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          <Link
            href="/"
            style={{
              background: '#FF5A1F',
              color: '#0A0C10',
              fontWeight: 600,
              fontSize: 15,
              padding: '14px 22px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Go to homepage
          </Link>
          <Link
            href="/services"
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              color: '#F2F4F7',
              fontWeight: 600,
              fontSize: 15,
              padding: '14px 22px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Browse services
          </Link>
          <Link
            href="/#contact"
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              color: '#F2F4F7',
              fontWeight: 600,
              fontSize: 15,
              padding: '14px 22px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            {CTA_COPY.survey.heading}
          </Link>
          <a
            href={`tel:${PHONE}`}
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              color: '#F2F4F7',
              fontWeight: 600,
              fontSize: 15,
              padding: '14px 22px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Call {PHONE_DISPLAY}
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
              padding: '14px 22px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
