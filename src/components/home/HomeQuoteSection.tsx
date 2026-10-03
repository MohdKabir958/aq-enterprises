import ContactForm from '@/components/ContactForm';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL, EMAIL, ADDRESS, HOURS } from '@/lib/constants';
import { mapsSearchUrl } from '@/lib/business';

export default function HomeQuoteSection() {
  return (
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
              fontFamily: 'var(--font-space), sans-serif',
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
              fontStyle: 'normal',
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
  );
}
