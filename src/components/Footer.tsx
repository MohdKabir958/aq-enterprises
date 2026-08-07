import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0A0C10', borderTop: '1px solid #1B1F27', fontFamily: "'IBM Plex Sans', sans-serif", padding: '64px 32px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <Image src="/assets/aq-logo.png" alt="AQ Enterprises" width={38} height={38} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, color: '#F2F4F7' }}>AQ Enterprises</span>
          </div>
          <p style={{ color: '#6B7484', fontSize: 14, lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
            CCTV, biometric, access control, fire alarm and commercial networking installations for homes, offices and industrial sites — done right the first time.
          </p>
        </div>
        <div>
          <div style={{ color: '#F2F4F7', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 18 }}>Company</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>About Us</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Services</Link>
            <Link href="/projects" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Projects</Link>
          </div>
        </div>
        <div>
          <div style={{ color: '#F2F4F7', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 18 }}>Services</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Home CCTV Installation</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>Office &amp; Factory Security</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>IP &amp; Wireless Cameras</Link>
            <Link href="/services" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>AMC &amp; Maintenance</Link>
          </div>
        </div>
        <div>
          <div style={{ color: '#F2F4F7', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 18 }}>Get In Touch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="tel:+917815915792" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>+91 78159 15792</a>
            <a href="https://wa.me/917815915792" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>WhatsApp Us</a>
            <a href="mailto:mohammedtalha204@gmail.com" style={{ color: '#9BA5B4', fontSize: 14, textDecoration: 'none' }}>mohammedtalha204@gmail.com</a>
            <span style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5 }}>Mallapur, Chanakyapuri Colony,<br />Masjid-e-Ashraf, FCI Godown Road,<br />Hyderabad, TG 500076</span>
            <span style={{ color: '#6B7484', fontSize: 13 }}>Mon–Sat, 9am–7pm</span>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '44px auto 0', paddingTop: 24, borderTop: '1px solid #1B1F27', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ color: '#4B5261', fontSize: 13 }}>© 2026 AQ Enterprises. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ color: '#4B5261', fontSize: 13 }}>Privacy Policy</span>
          <span style={{ color: '#4B5261', fontSize: 13 }}>Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}
