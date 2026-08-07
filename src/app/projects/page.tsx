import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects — AQ Enterprises | 500+ CCTV Installations',
  description: 'View our portfolio of 500+ CCTV and security installations across homes, offices and industrial sites. Hikvision, Dahua, CP Plus, Bosch and more.',
};

export default function ProjectsPage() {
  return (
    <div style={{ background: '#0A0C10', fontFamily: "'IBM Plex Sans', sans-serif", overflowX: 'hidden' }}>
      <Header active="projects" />
      <div style={{ height: 74 }} />

      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 40px' }}>
        <span style={{ display: 'inline-block', color: '#FF5A1F', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Projects</span>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(32px,4vw,50px)', lineHeight: 1.1, color: '#F2F4F7', margin: '0 0 20px', maxWidth: 760 }}>500+ installations, and counting.</h1>
        <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.65, maxWidth: 620, margin: 0 }}>A sample of recent work across homes, offices and industrial sites — real camera counts, real brands, real timelines.</p>
      </section>

      {/* Filterable Grid */}
      <ProjectsGrid />

      {/* Testimonial */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px' }}>
        <div style={{ background: '#12151B', border: '1px solid #1B1F27', borderRadius: 12, padding: 28 }}>
          <div style={{ color: '#FF5A1F', fontSize: 15, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
          <p style={{ color: '#C7CDD6', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px', maxWidth: 720 }}>&quot;We evaluated three vendors before choosing AQ Enterprises for our warehouse rollout. The site survey caught blind spots the others missed, and the install finished a day ahead of schedule.&quot;</p>
          <div style={{ color: '#F2F4F7', fontSize: 14, fontWeight: 600 }}>Deepak Shah</div>
          <div style={{ color: '#6B7484', fontSize: 13 }}>Operations Head, Logistics Firm</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(24px,2.8vw,34px)', color: '#F2F4F7', margin: '0 0 24px' }}>Want your property on this list?</h2>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+917815915792" style={{ background: '#FF5A1F', color: '#0A0C10', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Call Now →</a>
          <Link href="/#quote" style={{ background: '#12151B', border: '1px solid #232833', color: '#F2F4F7', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 6, textDecoration: 'none' }}>Get a Free Quote</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
