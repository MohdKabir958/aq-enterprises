import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services — AQ Enterprises | CCTV, Access Control, Networking',
  description: 'CCTV installation for homes, offices, factories. Access control, biometric, fire alarms, LAN networking, AMC plans. Free site visit.',
};

const SERVICES = [
  { svg: <><path d="M8 19L20 9l12 10" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round"/><path d="M11 17v13h18V17" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Home CCTV Installation', d: 'Full coverage for gates, entries and common areas, with a mobile app for remote viewing.' },
  { svg: <><rect x="10" y="8" width="20" height="24" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M15 14h3M22 14h3M15 20h3M22 20h3M15 26h3M22 26h3" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Office CCTV Installation', d: 'Multi-floor surveillance with access logs, tuned for reception, cabins and server rooms.' },
  { svg: <><path d="M20 6l14 8v18H6V14z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round"/><path d="M16 34v-8h8v8" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Apartment Security', d: 'Lobby, gate and parking coverage plus visitor management for housing societies.' },
  { svg: <path d="M8 32V18l7 5v-5l7 5v-5l8 5v9H8z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round"/>, t: 'Factory Surveillance', d: 'Wide-area, high-durability cameras built for shop floors, loading bays and perimeters.' },
  { svg: <><rect x="7" y="12" width="26" height="20" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M7 18h26" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Warehouse CCTV', d: 'High-mount, wide-angle cameras covering racking aisles, docks and exits.' },
  { svg: <><path d="M20 8L34 15 20 22 6 15z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 18v8c0 2 4 4 8 4s8-2 8-4v-8" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'School & College CCTV', d: 'Campus-wide monitoring with restricted zones and entry-log integration.' },
  { svg: <><path d="M12 8h16v6a8 8 0 0 1-16 0z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round"/><path d="M20 22v8M13 34h14" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Hospital CCTV', d: 'Ward, corridor and pharmacy coverage compliant with patient-privacy zoning.' },
  { svg: <><circle cx="20" cy="18" r="9" stroke="#3fa9f5" strokeWidth="1.6"/><circle cx="20" cy="18" r="3" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M20 27v6M14 33h12" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'IP Camera Installation', d: 'High-resolution network cameras with NVR storage and remote app access.' },
  { svg: <><path d="M13 22a10 10 0 0 1 14 0M9 17a16 16 0 0 1 22 0" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="27" r="2.4" fill="#3fa9f5"/></>, t: 'Wireless CCTV', d: 'Clean installs with no cabling — ideal for heritage or leased properties.' },
  { svg: <><rect x="10" y="12" width="20" height="16" rx="3" stroke="#3fa9f5" strokeWidth="1.6"/><circle cx="20" cy="20" r="4" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'PTZ Camera Installation', d: 'Pan-tilt-zoom cameras for large open areas needing active monitoring.' },
  { svg: <><rect x="12" y="18" width="16" height="14" rx="2" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M16 18v-4a4 4 0 0 1 8 0v4" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Biometric Attendance', d: 'Fingerprint and face-recognition attendance systems for staff entry points.' },
  { svg: <><rect x="14" y="6" width="12" height="28" rx="2" stroke="#3fa9f5" strokeWidth="1.6"/><circle cx="20" cy="27" r="1.6" fill="#3fa9f5"/></>, t: 'Video Door Phone', d: 'See and speak to visitors before opening the door, from anywhere in the house.' },
  { svg: <><rect x="8" y="8" width="24" height="24" rx="4" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M15 20l3.5 3.5L26 16" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>, t: 'Access Control', d: 'Card, PIN and biometric door control with visitor and audit logging.' },
  { svg: <><path d="M20 8v6M20 26v6M8 20h6M26 20h6" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round"/><circle cx="20" cy="20" r="6" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'AMC & Maintenance', d: 'Quarterly and annual plans covering cleaning, firmware updates and priority repairs.', highlight: true },
  { svg: <path d="M20 4l3 9h9l-7.5 6 3 10L20 23l-7.5 6 3-10L8 13h9z" stroke="#3fa9f5" strokeWidth="1.5" strokeLinejoin="round"/>, t: 'Fire Alarm Systems', d: 'Smoke and heat detection, alarm panels and emergency signal wiring.' },
  { svg: <><rect x="6" y="10" width="28" height="18" rx="2" stroke="#3fa9f5" strokeWidth="1.6"/><path d="M12 34h16M14 28v6M26 28v6" stroke="#3fa9f5" strokeWidth="1.6"/></>, t: 'Commercial LAN Cabling & Networking', d: 'Structured cabling, switches and network setup for offices and factories.' },
];

export default function ServicesPage() {
  return (
    <div style={{ background: '#0A0C10', fontFamily: "'IBM Plex Sans', sans-serif", overflowX: 'hidden' }}>
      <Header active="services" />
      <div style={{ height: 74 }} />

      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 56px' }}>
        <span style={{ display: 'inline-block', color: '#FF5A1F', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Services</span>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(32px,4vw,50px)', lineHeight: 1.1, color: '#F2F4F7', margin: '0 0 20px', maxWidth: 760 }}>One team for every kind of security install.</h1>
        <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.65, maxWidth: 620, margin: 0 }}>From a single home to a multi-floor factory, we spec, install and maintain the right system for your property — with a free site visit before you commit to anything.</p>
      </section>

      {/* Services Grid */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {SERVICES.map(s => (
          <div key={s.t} style={{ background: s.highlight ? 'linear-gradient(150deg,#1a2230,#12151B)' : '#12151B', border: `1px solid ${s.highlight ? '#2a3648' : '#1B1F27'}`, borderRadius: 12, padding: 28 }}>
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 16 }}>{s.svg}</svg>
            <div style={{ color: '#F2F4F7', fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{s.t}</div>
            <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.6, margin: '0 0 18px' }}>{s.d}</p>
            <Link href="/#quote" style={{ color: '#F2F4F7', fontSize: 13, fontWeight: 600, borderBottom: '2px solid #FF5A1F', paddingBottom: 2, textDecoration: 'none' }}>Get Quote →</Link>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(24px,2.8vw,34px)', color: '#F2F4F7', margin: '0 0 24px' }}>Not sure which system fits your property?</h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+917815915792" style={{ background: '#FF5A1F', color: '#0A0C10', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Call Now →</a>
          <Link href="/#quote" style={{ background: '#12151B', border: '1px solid #232833', color: '#F2F4F7', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Book a Free Site Visit</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
