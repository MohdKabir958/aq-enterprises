import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutVideo from '@/components/AboutVideo';

export const metadata: Metadata = {
  title: 'About Us — AQ Enterprises | 8 Years of CCTV Installations',
  description: 'Eight years of protecting homes, businesses and factories. 500+ installations, 18 certified technicians. AQ Enterprises, Hyderabad.',
};

export default function AboutPage() {
  return (
    <div style={{ background: '#0A0C10', fontFamily: "'IBM Plex Sans', sans-serif", overflowX: 'hidden' }}>
      <Header active="about" />
      <div style={{ height: 74 }} />

      {/* Hero */}
      <section style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '64px 32px 56px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40, alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-block', color: '#FF5A1F', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>About Us</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(30px,3.6vw,46px)', lineHeight: 1.1, color: '#F2F4F7', margin: '0 0 20px' }}>Eight years of protecting homes, businesses and factories across the region.</h1>
          <p style={{ color: '#9BA5B4', fontSize: 16, lineHeight: 1.65, margin: 0 }}>AQ Enterprises started with a simple frustration: too many CCTV installs looked finished on day one and broke down by month three. We built our business around the parts installers usually skip — proper cable runs, tested angles, and support that answers the phone.</p>
        </div>
        <AboutVideo />
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {[
          { n: '2018', l: 'Founded' },
          { n: '500+', l: 'Installations Completed' },
          { n: '12,000+', l: 'Cameras Installed' },
          { n: '18', l: 'Certified Technicians' },
        ].map(s => (
          <div key={s.l} style={{ padding: '24px 0', borderTop: '2px solid #FF5A1F' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 600, color: '#F2F4F7' }}>{s.n}</div>
            <div style={{ color: '#6B7484', fontSize: 14, marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div style={{ width: '100%', height: 380, background: 'linear-gradient(135deg,#1B1F27,#12151B)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#4B5261', fontSize: 13 }}>Drop a team or workshop photo</span>
        </div>
        <div>
          <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Mission</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(24px,2.6vw,32px)', color: '#F2F4F7', margin: '10px 0 20px' }}>Security systems people actually trust after installation day.</h2>
          <p style={{ color: '#9BA5B4', fontSize: 15, lineHeight: 1.7, margin: '0 0 16px' }}>Every job starts with a real site walkthrough, not a phone estimate. We spec hardware for the property, not the cheapest catalog option, and we stand behind the install with an AMC plan that includes real technicians — not a call center.</p>
          <p style={{ color: '#9BA5B4', fontSize: 15, lineHeight: 1.7, margin: 0 }}>That approach has kept us working with the same clients for years, and it&apos;s why most of our new business comes from referrals.</p>
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Team</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,38px)', color: '#F2F4F7', margin: '10px 0 0' }}>The people behind the install</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[
            { name: 'Mohammed Talha', role: 'Founder & Lead Engineer' },
            { name: 'Suresh Rao', role: 'Site Operations Head' },
            { name: 'Meena Iyer', role: 'Client Relations' },
            { name: 'Vikram Das', role: 'Senior Technician' },
          ].map(m => (
            <div key={m.name}>
              <div style={{ width: '100%', height: 260, background: 'linear-gradient(135deg,#1B1F27,#12151B)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <span style={{ color: '#4B5261', fontSize: 13 }}>Team photo</span>
              </div>
              <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600 }}>{m.name}</div>
              <div style={{ color: '#6B7484', fontSize: 13 }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ background: '#0d0f13', borderTop: '1px solid #1B1F27', borderBottom: '1px solid #1B1F27', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', color: '#6B7484', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>Certifications &amp; Authorized Dealerships</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            {['Hikvision Authorized', 'CP Plus Certified', 'ISO 9001:2015', 'Dahua Partner'].map(c => (
              <div key={c} style={{ background: '#12151B', border: '1px solid #232833', borderRadius: 8, padding: '16px 26px', color: '#9BA5B4', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600 }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(24px,2.8vw,34px)', color: '#F2F4F7', margin: '0 0 24px' }}>Want a security system that&apos;s still working in year five?</h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+917815915792" style={{ background: '#FF5A1F', color: '#0A0C10', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Call Now →</a>
          <Link href="/#quote" style={{ background: '#12151B', border: '1px solid #232833', color: '#F2F4F7', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Get a Free Quote</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
