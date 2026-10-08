/**
 * Locations index — lists published Hyderabad service-area pages.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPublicBusiness } from '@/lib/cms/settings';
import { getAllLocations } from '@/lib/content/getters';

export const metadata: Metadata = {
  title: 'CCTV Installation Areas in Hyderabad',
  description:
    'AQ Enterprises provides CCTV and security system installation across Hyderabad service areas including Hitech City, Gachibowli, Banjara Hills, Uppal, and more. Request a free site survey.',
  alternates: {
    canonical: '/locations',
  },
};

export default async function LocationsPage() {
  const { PHONE, PHONE_DISPLAY } = await getPublicBusiness();
  const locations = getAllLocations();

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <Header />
      <div style={{ height: 'calc(76px + env(safe-area-inset-top))' }} aria-hidden="true" />

      <main>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px var(--page-gutter) 0' }}>
          <Breadcrumbs items={[{ name: 'Locations', url: '/locations' }]} />
        </div>

        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px var(--page-gutter) 56px' }}>
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
            Service areas
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(32px,4vw,50px)',
              lineHeight: 1.1,
              color: '#F2F4F7',
              margin: '0 0 20px',
              maxWidth: 760,
            }}
          >
            CCTV installation across Hyderabad
          </h1>
          <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.65, maxWidth: 640, margin: 0 }}>
            These pages cover neighborhoods and commercial corridors we serve from our Mallapur base
            in Hyderabad. Each area page explains local security needs and links to relevant services
            — not separate branch offices.
          </p>
        </section>

        <section
          aria-label="Hyderabad service areas"
          className="grid-responsive grid-cols-4"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 var(--page-gutter) 96px',
            gap: 20,
          }}
        >
          {locations.map((location) => (
            <article
              key={location.slug}
              style={{
                background: '#12151B',
                border: '1px solid #1B1F27',
                borderRadius: 12,
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h2 style={{ color: '#F2F4F7', fontSize: 17, fontWeight: 600, margin: '0 0 10px 0' }}>
                <Link
                  href={`/locations/${location.slug}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {location.name}
                </Link>
              </h2>
              <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.6, margin: '0 0 18px', flexGrow: 1 }}>
                {location.summary}
              </p>
              <Link
                href={`/locations/${location.slug}`}
                style={{
                  color: '#F2F4F7',
                  fontSize: 13,
                  fontWeight: 600,
                  borderBottom: '2px solid #FF5A1F',
                  paddingBottom: 2,
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                View area →
              </Link>
            </article>
          ))}
        </section>

        <section
          aria-label="Call to action"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--page-gutter) 96px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(24px,2.8vw,34px)',
              color: '#F2F4F7',
              margin: '0 0 24px',
            }}
          >
            Need CCTV in your neighborhood?
          </h2>
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
              Book a Free Site Visit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
