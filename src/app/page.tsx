import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';

export const metadata: Metadata = {
  title: 'AQ Enterprises — CCTV & Security Systems Installation',
  description: 'Licensed CCTV installers for homes, offices and industrial sites. 500+ installations, 8+ years experience. Free site visit. Call +91 78159 15792.',
};

const CameraScene = dynamic(() => import('@/components/CameraScene'), { ssr: false });

export default function HomePage() {
  return (
    <div style={{ background: '#0A0C10', fontFamily: "'IBM Plex Sans', sans-serif", overflowX: 'hidden' }}>
      <Header active="home" />
      <div style={{ height: 74 }} />

      {/* Hero */}
      <section id="hero" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '64px 32px 80px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 24, alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: -120, right: -160, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle,rgba(63,169,245,0.16),transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.7s ease both' }}>
          <span style={{ display: 'inline-block', color: '#FF5A1F', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Licensed CCTV Installers</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(34px,4.2vw,54px)', lineHeight: 1.08, color: '#F2F4F7', margin: '0 0 20px', letterSpacing: '-0.01em' }}>See everything on your property. Miss nothing that matters.</h1>
          <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.6, maxWidth: 480, margin: '0 0 32px' }}>We design, install and maintain CCTV and access-control systems for homes, offices and industrial sites — done right the first time.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
            <a href="tel:+917815915792" style={{ background: '#FF5A1F', color: '#0A0C10', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Call Now →</a>
            <a href="https://wa.me/917815915792" style={{ background: '#12151B', border: '1px solid #232833', color: '#F2F4F7', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>WhatsApp Us</a>
          </div>
          <div style={{ color: '#6B7484', fontSize: 14 }}>500+ Installations &nbsp;·&nbsp; 8+ Years in Business &nbsp;·&nbsp; 24×7 Support</div>
        </div>
        <CameraScene />
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 72px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {[
          { n: '500+', l: 'Installations Completed' },
          { n: '8+', l: 'Years of Experience' },
          { n: '50+', l: 'Cities Served' },
          { n: '24/7', l: 'Rapid Support' },
        ].map(s => (
          <div key={s.l} style={{ padding: '24px 0', borderTop: '2px solid #FF5A1F' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 600, color: '#F2F4F7' }}>{s.n}</div>
            <div style={{ color: '#6B7484', fontSize: 14, marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section id="services" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>What We Do</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,38px)', color: '#F2F4F7', margin: '10px 0 0' }}>Security systems for every property type</h2>
          </div>
          <Link href="/services" style={{ color: '#F2F4F7', fontSize: 14, fontWeight: 600, borderBottom: '2px solid #FF5A1F', paddingBottom: 3, textDecoration: 'none' }}>View All Services →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: '#1B1F27', border: '1px solid #1B1F27', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { svg: <><path d="M8 19L20 9l12 10" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round"/><path d="M11 17v13h18V17" stroke="#3fa9f5" strokeWidth="1.6"/></>, title: 'Home CCTV Installation', desc: 'Complete coverage for entry points, gates and common areas.' },
            { svg: <><rect x="10" y="8" width="20" height="24" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M15 14h3M22 14h3M15 20h3M22 20h3M15 26h3M22 26h3" stroke="#3fa9f5" strokeWidth="1.6"/></>, title: 'Office & Commercial', desc: 'Access-controlled, multi-floor surveillance for workplaces.' },
            { svg: <path d="M8 32V18l7 5v-5l7 5v-5l8 5v9H8z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round"/>, title: 'Factory & Warehouse', desc: 'Wide-area coverage built for industrial sites and logistics.' },
            { svg: <><path d="M20 8L34 15 20 22 6 15z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 18v8c0 2 4 4 8 4s8-2 8-4v-8" stroke="#3fa9f5" strokeWidth="1.6"/></>, title: 'School & Institutional', desc: 'Campus-wide monitoring with restricted access zones.' },
            { svg: <><circle cx="20" cy="18" r="9" stroke="#3fa9f5" strokeWidth="1.6"/><circle cx="20" cy="18" r="3" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M20 27v6M14 33h12" stroke="#3fa9f5" strokeWidth="1.6"/></>, title: 'IP Camera Installation', desc: 'High-resolution network cameras with remote viewing.' },
            { svg: <><path d="M13 22a10 10 0 0 1 14 0M9 17a16 16 0 0 1 22 0" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="27" r="2.4" fill="#3fa9f5"/></>, title: 'Wireless CCTV Systems', desc: 'Clean installs with no cabling for tricky sites.' },
            { svg: <><rect x="12" y="18" width="16" height="14" rx="2" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M16 18v-4a4 4 0 0 1 8 0v4" stroke="#3fa9f5" strokeWidth="1.6"/></>, title: 'Access Control & Biometric', desc: 'Fingerprint and card-based entry systems.' },
            { svg: <><path d="M20 8v6M20 26v6M8 20h6M26 20h6" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="20" r="6" stroke="#3fa9f5" strokeWidth="1.6"/></>, title: 'AMC & Maintenance', desc: 'Scheduled servicing and priority repair visits.' },
          ].map(s => (
            <Link key={s.title} href="/services" style={{ background: '#12151B', padding: '28px 24px', display: 'block', textDecoration: 'none' }}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 16 }}>{s.svg}</svg>
              <div style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
              <div style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
        <div style={{ textAlign: 'center', color: '#6B7484', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>Certified Installers For Leading Brands</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
          {['Hikvision', 'CP Plus', 'Dahua', 'Uniview', 'Honeywell', 'Bosch', 'Godrej', 'Panasonic'].map(b => (
            <div key={b} style={{ background: '#12151B', border: '1px solid #232833', borderRadius: 8, padding: '16px 26px', color: '#9BA5B4', fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600 }}>{b}</div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>How It Works</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,38px)', color: '#F2F4F7', margin: '10px 0 0' }}>From site visit to switch-on</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 20 }}>
          {[
            { n: '01', t: 'Site Visit', d: 'We inspect your property and map every blind spot.' },
            { n: '02', t: 'Custom Quote', d: 'Transparent pricing, no hidden costs.' },
            { n: '03', t: 'Installation', d: 'Certified technicians, minimal disruption.' },
            { n: '04', t: 'Testing & Handover', d: 'Full walkthrough and mobile app setup.' },
            { n: '05', t: 'AMC & Support', d: 'Scheduled maintenance, 24/7 helpline.' },
          ].map(s => (
            <div key={s.n} style={{ paddingTop: 20, borderTop: '1px solid #232833' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: '#232833', marginBottom: 14 }}>{s.n}</div>
              <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s.t}</div>
              <div style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: '#0d0f13', borderTop: '1px solid #1B1F27', borderBottom: '1px solid #1B1F27', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32 }}>
          {[
            { svg: <path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.7 7.1 17.2l.9-5.5-4-3.9 5.5-.8z" stroke="#3fa9f5" strokeWidth="1.4" strokeLinejoin="round"/>, t: 'Certified Technicians', d: 'Trained and background-verified installers on every job.' },
            { svg: <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" stroke="#3fa9f5" strokeWidth="1.4" strokeLinejoin="round"/>, t: 'Genuine Hardware', d: 'Authorized dealer for Hikvision, CP Plus, Dahua and more.' },
            { svg: <><circle cx="12" cy="12" r="9" stroke="#3fa9f5" strokeWidth="1.4"/><path d="M12 7v5l3.5 2" stroke="#3fa9f5" strokeWidth="1.4" strokeLinecap="round"/></>, t: 'Same-Week Installation', d: 'Most sites up and running within 3-5 days.' },
            { svg: <><path d="M4 12a8 8 0 0 1 16 0" stroke="#3fa9f5" strokeWidth="1.4"/><rect x="3" y="12" width="4" height="6" rx="1" stroke="#3fa9f5" strokeWidth="1.4"/><rect x="17" y="12" width="4" height="6" rx="1" stroke="#3fa9f5" strokeWidth="1.4"/></>, t: 'Real After-Sales Support', d: 'Dedicated AMC plans and a 24/7 helpline.' },
          ].map(w => (
            <div key={w.t}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(63,169,245,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{w.svg}</svg>
              </div>
              <div style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{w.t}</div>
              <div style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.55 }}>{w.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recent Work</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,38px)', color: '#F2F4F7', margin: '10px 0 0' }}>Recent installations</h2>
          </div>
          <Link href="/projects" style={{ color: '#F2F4F7', fontSize: 14, fontWeight: 600, borderBottom: '2px solid #FF5A1F', paddingBottom: 3, textDecoration: 'none' }}>View All Projects →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            { label: 'Residential villa install', t: 'Residential Villa, Whitefield', m: '8 Cameras · Hikvision · 2 Days' },
            { label: 'Factory surveillance install', t: 'Textile Factory, Peenya', m: '32 Cameras · Dahua · 6 Days' },
            { label: 'Retail chain install', t: 'Retail Chain, 6 Outlets', m: '48 Cameras · CP Plus · 9 Days' },
          ].map(p => (
            <Link key={p.t} href="/projects" style={{ display: 'block', background: '#12151B', border: '1px solid #1B1F27', borderRadius: 12, overflow: 'hidden', textDecoration: 'none' }}>
              <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg,#1B1F27,#12151B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4B5261', fontSize: 13 }}>{p.label}</span>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{p.t}</div>
                <div style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.7 }}>{p.m}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Customer Reviews</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3vw,38px)', color: '#F2F4F7', margin: '10px 0 0' }}>Trusted by 500+ customers</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            { stars: '★★★★★', q: '"Installation was clean and the team explained every camera angle before finalizing. Zero blind spots in our warehouse now."', n: 'Ravi Kumar', r: 'Factory Owner, Peenya' },
            { stars: '★★★★★', q: '"Quick response every time we\'ve needed support. Worth the AMC."', n: 'Priya Nair', r: 'Villa Owner, Whitefield' },
            { stars: '★★★★★', q: '"Rolled out across all 6 stores in under two weeks with zero downtime."', n: 'Arjun Mehta', r: 'Retail Operations Manager' },
          ].map(t => (
            <div key={t.n} style={{ background: '#12151B', border: '1px solid #1B1F27', borderRadius: 12, padding: 28 }}>
              <div style={{ color: '#FF5A1F', fontSize: 15, marginBottom: 16, letterSpacing: 2 }}>{t.stars}</div>
              <p style={{ color: '#C7CDD6', fontSize: 14, lineHeight: 1.7, margin: '0 0 20px' }}>{t.q}</p>
              <div style={{ color: '#F2F4F7', fontSize: 14, fontWeight: 600 }}>{t.n}</div>
              <div style={{ color: '#6B7484', fontSize: 13 }}>{t.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Quote / Contact */}
      <section id="quote" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
        <div id="contact" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', background: '#12151B', border: '1px solid #1B1F27', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: 48 }}>
            <span style={{ color: '#3fa9f5', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get Started</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(24px,2.6vw,32px)', color: '#F2F4F7', margin: '10px 0 24px' }}>Ready for a free site visit?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Full name" style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '13px 14px', color: '#F2F4F7', fontSize: 14, fontFamily: 'inherit' }} />
              <input placeholder="Phone number" style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '13px 14px', color: '#F2F4F7', fontSize: 14, fontFamily: 'inherit' }} />
              <select style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '13px 14px', color: '#9BA5B4', fontSize: 14, fontFamily: 'inherit' }}>
                <option>Property type — Home</option>
                <option>Property type — Office</option>
                <option>Property type — Factory / Warehouse</option>
                <option>Property type — School / Institution</option>
              </select>
              <textarea placeholder="Tell us about your property" rows={3} style={{ background: '#0A0C10', border: '1px solid #232833', borderRadius: 6, padding: '13px 14px', color: '#F2F4F7', fontSize: 14, fontFamily: 'inherit', resize: 'none' }} />
              <button style={{ background: '#FF5A1F', color: '#0A0C10', border: 'none', borderRadius: 6, padding: 15, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Request Free Site Visit</button>
            </div>
          </div>
          <div style={{ background: '#0d0f13', padding: 48, borderLeft: '1px solid #1B1F27' }}>
            <div style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600, marginBottom: 22 }}>Talk to us directly</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
              <a href="tel:+917815915792" style={{ color: '#C7CDD6', fontSize: 15, textDecoration: 'none' }}>📞 +91 78159 15792</a>
              <a href="https://wa.me/917815915792" style={{ color: '#C7CDD6', fontSize: 15, textDecoration: 'none' }}>💬 WhatsApp Us</a>
              <a href="mailto:mohammedtalha204@gmail.com" style={{ color: '#C7CDD6', fontSize: 15, textDecoration: 'none' }}>✉ mohammedtalha204@gmail.com</a>
              <span style={{ color: '#6B7484', fontSize: 14, lineHeight: 1.5 }}>Mallapur, Chanakyapuri Colony, Masjid-e-Ashraf,<br />FCI Godown Road, Hyderabad, TG 500076</span>
              <span style={{ color: '#6B7484', fontSize: 14 }}>Mon–Sat, 9am–7pm</span>
            </div>
            <div style={{ width: '100%', height: 160, background: 'linear-gradient(135deg,#1B1F27,#12151B)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#4B5261', fontSize: 13 }}>Drop a map / storefront image</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
