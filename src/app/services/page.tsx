/**
 * @file page.tsx (Services)
 * @description Services index — lists all published services from the content layer.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { PHONE } from '@/lib/constants';
import { getAllServices } from '@/lib/content/getters';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'CCTV installation for homes, offices, factories in Hyderabad. Access control, biometric, fire alarms, LAN networking, AMC plans. Free site visit.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <Header active="services" />
      <div style={{ height: 74 }} aria-hidden="true" />

      <main>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 0' }}>
          <Breadcrumbs items={[{ name: 'Services', url: '/services' }]} />
        </div>

        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 56px' }}>
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
            Services
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
            One team for every kind of security install.
          </h1>
          <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.65, maxWidth: 620, margin: 0 }}>
            From a single home to a multi-floor factory, we spec, install and maintain the right
            system for your property — with a free site visit before you commit to anything.
          </p>
        </section>

        <section
          aria-label="List of Services"
          className="grid-responsive grid-cols-4"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 32px 96px',
            gap: 20,
          }}
        >
          {services.map((service) => (
            <article
              key={service.slug}
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
                  href={`/services/${service.slug}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {service.name}
                </Link>
              </h2>
              <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.6, margin: '0 0 18px', flexGrow: 1 }}>
                {service.summary}
              </p>
              <Link
                href={`/services/${service.slug}`}
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
                View service →
              </Link>
            </article>
          ))}
        </section>

        <section
          aria-label="Call to action"
          style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', textAlign: 'center' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(24px,2.8vw,34px)',
              color: '#F2F4F7',
              margin: '0 0 24px',
            }}
          >
            Not sure which system fits your property?
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
              Call Now →
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
