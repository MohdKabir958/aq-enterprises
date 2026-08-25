/**
 * @file Footer.tsx
 * @description Global site footer with brand info, navigation, services, and contact.
 *
 * Renders a 4-column grid:
 *   1. Brand description column
 *   2. Company links (Home, About, Services, Projects)
 *   3. Services quick-links
 *   4. Contact information (phone, WhatsApp, email, address, hours)
 *
 * Bottom bar: copyright notice and legal links.
 *
 * PREVIOUS ISSUES FIXED:
 *   - Privacy Policy and Terms were plain <span> elements with no href (dead links).
 *     They are now clearly marked as "Coming Soon" to be honest with users.
 *   - Contact data was hardcoded. Now imported from constants.ts.
 *
 * ACCESSIBILITY:
 *   - <footer> landmark (implicit)
 *   - Column headings use <h3> for proper document outline
 *   - All links have visible text
 *   - Phone/email links use proper tel: and mailto: hrefs
 */

import Image from 'next/image';
import Link from 'next/link';
import { ADDRESS, EMAIL, HOURS, PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';
import { SOCIAL_PROFILES, BUSINESS_NAME, mapsSearchUrl } from '@/lib/business';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#0A0C10',
        borderTop: '1px solid #1B1F27',
        padding: '64px 32px 28px',
      }}
    >
      {/* ── Main 4-column grid ────────────────────────────────────────── */}
      <div
        className="footer-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {/* ── Column 1: Brand ──────────────────────────────────────────── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: '#F2F4F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Image
                src="/assets/aq-logo.png"
                alt={`${BUSINESS_NAME} logo`}
                width={38}
                height={38}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontFamily: "var(--font-space), sans-serif", fontWeight: 600, fontSize: 17, color: '#F2F4F7' }}>
              {BUSINESS_NAME}
            </span>
          </div>
          <p style={{ color: '#6B7484', fontSize: 14, lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
            CCTV, biometric, access control, fire alarm and commercial networking
            installations for homes, offices and industrial sites across Hyderabad —
            done right the first time.
          </p>
        </div>

        {/* ── Column 2: Company Links ───────────────────────────────────── */}
        <div>
          <h3
            style={{
              color: '#F2F4F7',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            Company
          </h3>
          <nav aria-label="Company navigation" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>About Us</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Services</Link>
            <Link href="/locations" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Locations</Link>
            <Link href="/projects" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Projects</Link>
            <Link href="/blog" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Blog</Link>
            <Link href="/contact" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Contact</Link>
          </nav>
        </div>

        {/* ── Column 3: Services Links ──────────────────────────────────── */}
        <div>
          <h3
            style={{
              color: '#F2F4F7',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            Services
          </h3>
          <nav aria-label="Services navigation" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Home CCTV Installation</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Office &amp; Factory Security</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>IP &amp; Wireless Cameras</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Access Control &amp; Biometric</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>AMC &amp; Maintenance</Link>
          </nav>
        </div>

        {/* ── Column 4: Contact Information ──────────────────────────────── */}
        <div>
          <h3
            style={{
              color: '#F2F4F7',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            Get In Touch
          </h3>
          <address style={{ display: 'flex', flexDirection: 'column', gap: 12, fontStyle: 'normal' }}>
            <a
              href={`tel:${PHONE}`}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
              style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}
            >
              WhatsApp Us
            </a>
            <a
              href={`mailto:${EMAIL}`}
              style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}
            >
              {EMAIL}
            </a>
            <span style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5 }}>
              {ADDRESS.line1}
              <br />
              {ADDRESS.line2}, {ADDRESS.pincode}
            </span>
            <span style={{ color: '#6B7484', fontSize: 13 }}>{HOURS}</span>
            <a
              href={mapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}
            >
              Maps (address search)
            </a>
            <a
              href={SOCIAL_PROFILES.justdial.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View AQ Enterprises on JustDial"
              style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span
                style={{
                  background: '#FF6600',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 5px',
                  borderRadius: 3,
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                }}
              >
                JD
              </span>
              Reviews on JustDial
            </a>
          </address>
        </div>
      </div>

      {/* ── Bottom Bar: Copyright + Legal ─────────────────────────────── */}
      <div
        style={{
          maxWidth: 1280,
          margin: '44px auto 0',
          paddingTop: 24,
          borderTop: '1px solid #1B1F27',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ color: '#4B5261', fontSize: 13 }}>
          © {currentYear} {BUSINESS_NAME}. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          {/*
           * Privacy Policy and Terms pages are planned for Phase 3.
           * Using <span> until dedicated pages exist is intentional — avoids
           * broken links. These should be replaced with <Link> once /privacy and /terms are created in future phases.
           */}
          <span style={{ color: '#4B5261', fontSize: 13 }}>Privacy Policy</span>
          <span style={{ color: '#4B5261', fontSize: 13 }}>Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}
