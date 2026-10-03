import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/lib/json-ld';
import { siteConfig } from '@/lib/config';
import { EMAIL, ADDRESS } from '@/lib/constants';
import { BUSINESS_NAME, WEBSITE_URL } from '@/lib/business';

export const metadata: Metadata = {
  title: 'Terms & Conditions — AQ Enterprises',
  description:
    'Terms and conditions for AQ Enterprises, Mallapur, Hyderabad. Website usage, service enquiries, and limitation of liability.',
  alternates: {
    canonical: '/terms',
  },
  robots: { index: true, follow: true },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Terms & Conditions', url: '/terms' },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms & Conditions — AQ Enterprises',
  url: `${siteConfig.url}/terms`,
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

export default function TermsPage() {
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
          Terms &amp; Conditions
        </h1>
        <p style={{ fontSize: 14, color: '#6B7484', marginBottom: 40 }}>
          Last updated: October 2025
        </p>

        <Section heading="1. About This Website">
          <p>
            This website is operated by AQ Enterprises, a security systems and networking business
            registered at {ADDRESS.full}. By using this website you agree to these terms.
          </p>
        </Section>

        <Section heading="2. Information Only — Not a Contract">
          <p>
            Content on this website is provided for general information purposes only. Nothing on
            this site constitutes a binding quotation, service agreement, or legal advice. Any
            prices, features, or specifications shown are indicative and subject to change without
            notice.
          </p>
          <p>
            A binding service agreement is formed only when both parties sign a written order form
            or service contract following a site survey.
          </p>
        </Section>

        <Section heading="3. Enquiries and Contact Forms">
          <p>
            Submitting an enquiry through our website does not create a contract. We will respond
            as soon as we are able during our normal working hours (Monday to Saturday). Response
            times depend on availability and are not guaranteed.
          </p>
        </Section>

        <Section heading="4. Accuracy of Information">
          <p>
            We make reasonable efforts to ensure the information on this website is accurate and
            current. However, we do not warrant that all content is error-free or complete. Pricing
            and technical details should be confirmed with us directly before you make a purchasing
            decision.
          </p>
          <p>
            Brands mentioned on this website (such as Hikvision, CP Plus, Dahua, and Uniview) are
            brands we commonly install. Any mention of a brand does not imply authorised
            dealership, official partnership, or certification unless separately documented.
          </p>
        </Section>

        <Section heading="5. Third-Party Links">
          <p>
            Our website contains links to third-party platforms including Google Maps, JustDial, and
            WhatsApp. We have no control over the content of those sites and accept no
            responsibility for them. Accessing third-party links is at your own risk.
          </p>
        </Section>

        <Section heading="6. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, AQ Enterprises is not liable for
            any indirect, incidental, or consequential loss arising from:
          </p>
          <ul>
            <li>Use of, or inability to use, this website</li>
            <li>Reliance on any information presented on this website</li>
            <li>
              Technical interruptions, inaccuracies, or omissions in the website content
            </li>
          </ul>
          <p>
            Our liability for any service provided is limited to the terms agreed in the signed
            service contract for that project.
          </p>
        </Section>

        <Section heading="7. Intellectual Property">
          <p>
            All content on this website — including text, graphics, and layout — is the property
            of AQ Enterprises or its content suppliers. You may not reproduce, distribute, or
            commercially exploit any part of this website without prior written consent.
          </p>
        </Section>

        <Section heading="8. Governing Law">
          <p>
            These terms are governed by the laws of India. Any disputes will be subject to the
            jurisdiction of the courts of Hyderabad, Telangana.
          </p>
        </Section>

        <Section heading="9. Changes to These Terms">
          <p>
            We may revise these terms at any time by updating this page. The &quot;Last updated&quot; date
            at the top of this page reflects the most recent revision. Continued use of the website
            after any change constitutes acceptance of the updated terms.
          </p>
        </Section>

        <Section heading="10. Contact Us">
          <p>For questions about these terms, contact us at:</p>
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
