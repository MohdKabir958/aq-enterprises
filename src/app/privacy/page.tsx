import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/config';
import { EMAIL, ADDRESS } from '@/lib/constants';
import { BUSINESS_NAME, WEBSITE_URL } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Privacy Policy — AQ Enterprises',
  description:
    'Privacy policy for AQ Enterprises, Mallapur, Hyderabad. How we collect, use, and protect personal information submitted through our contact forms.',
  alternates: {
    canonical: '/privacy',
  },
  robots: { index: true, follow: true },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Privacy Policy', url: '/privacy' },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — AQ Enterprises',
  url: `${siteConfig.url}/privacy`,
  description: metadata.description as string,
  publisher: {
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    url: WEBSITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.line1} ${ADDRESS.line2}`,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.pincode,
      addressCountry: 'IN',
    },
  },
};

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#C9D1E0' }}>
      <JsonLd schema={pageSchema} />
      <Header />
      <div style={{ height: 74 }} aria-hidden="true" />

      <main
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        <Breadcrumbs items={breadcrumbs} />

        <h1
          style={{
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 700,
            color: '#F2F4F7',
            marginTop: 32,
            marginBottom: 8,
            lineHeight: 1.25,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: '#6B7484', marginBottom: 40 }}>
          Last updated: October 2025
        </p>

        <Section heading="1. Who We Are">
          <p>
            AQ Enterprises is a security systems installation and networking business based at{' '}
            {ADDRESS.full}. This privacy policy applies to our website at{' '}
            <a href={WEBSITE_URL} style={{ color: '#3fa9f5' }}>
              {WEBSITE_URL}
            </a>
            .
          </p>
        </Section>

        <Section heading="2. Information We Collect">
          <p>
            We collect personal information only when you choose to submit it to us — for example
            through our contact form or quote request. This may include:
          </p>
          <ul>
            <li>Your name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Property type and location (to assess CCTV or networking requirements)</li>
            <li>Any details you include in a free-text message</li>
          </ul>
          <p>
            We do not collect payment information. We do not use cookies for advertising tracking.
          </p>
        </Section>

        <Section heading="3. How We Use Your Information">
          <p>Information you submit is used solely to:</p>
          <ul>
            <li>Respond to your enquiry or quote request</li>
            <li>Arrange a site survey appointment</li>
            <li>Follow up on a project or service call you have requested</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal information with third parties for their
            marketing purposes.
          </p>
        </Section>

        <Section heading="4. How We Store Your Information">
          <p>
            Enquiries submitted through our contact form are delivered to our business email inbox
            and are not automatically stored in a separate database. We retain email records only
            for as long as is necessary to complete your service request and any follow-up support.
          </p>
          <p>
            Our website is hosted on Vercel. Please refer to{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3fa9f5' }}
            >
              Vercel&apos;s Privacy Policy
            </a>{' '}
            for information about how hosting infrastructure handles request data.
          </p>
        </Section>

        <Section heading="5. Security">
          <p>
            We take reasonable precautions to protect the information you provide. However, no
            transmission of data over the internet can be guaranteed to be 100% secure. Please do
            not send sensitive financial or identification documents through our contact form.
          </p>
        </Section>

        <Section heading="6. Your Rights">
          <p>
            You may request that we delete or correct personal information we hold about you at any
            time by contacting us at the address below. We will respond within a reasonable time.
          </p>
        </Section>

        <Section heading="7. Links to Other Websites">
          <p>
            Our website contains links to third-party platforms (such as Google Maps, JustDial, and
            WhatsApp). We are not responsible for the privacy practices of those services and
            encourage you to review their policies directly.
          </p>
        </Section>

        <Section heading="8. Changes to This Policy">
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top of
            this page will reflect the most recent revision. Continued use of the website after a
            change constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section heading="9. Contact Us">
          <p>
            For any privacy-related questions, write to us at:
          </p>
          <address
            style={{
              fontStyle: 'normal',
              marginTop: 12,
              padding: '16px 20px',
              background: '#12151C',
              borderRadius: 8,
              borderLeft: '3px solid #3fa9f5',
              lineHeight: 1.8,
            }}
          >
            <strong style={{ color: '#F2F4F7' }}>AQ Enterprises</strong>
            <br />
            {ADDRESS.line1}
            <br />
            {ADDRESS.line2}, {ADDRESS.state} {ADDRESS.pincode}
            <br />
            Email:{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: '#3fa9f5' }}>
              {EMAIL}
            </a>
          </address>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#F2F4F7',
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: '1px solid #1E2433',
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          fontSize: 15,
          lineHeight: 1.75,
          color: '#C9D1E0',
        }}
      >
        {children}
      </div>
    </section>
  );
}
