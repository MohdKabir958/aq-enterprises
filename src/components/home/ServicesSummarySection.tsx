import { getAllServices } from '@/lib/content/getters';
import Link from 'next/link';

export default async function ServicesSummarySection() {
  const services = await getAllServices();
  return (
    <section id="services" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--page-gutter) 88px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              color: '#3fa9f5',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            What We Do
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(26px,3vw,38px)',
              color: '#F2F4F7',
              margin: '10px 0 0',
            }}
          >
            Security systems for every property type
          </h2>
        </div>
        <Link
          href="/services"
          style={{
            color: '#F2F4F7',
            fontSize: 14,
            fontWeight: 600,
            borderBottom: '2px solid #FF5A1F',
            paddingBottom: 3,
            textDecoration: 'none',
          }}
        >
          View All Services →
        </Link>
      </div>

      <div
        className="grid-responsive grid-cols-4"
        style={{
          gap: 1,
          background: '#1B1F27',
          border: '1px solid #1B1F27',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {services.map(service => ({ title: service.name, desc: service.summary, href: `/services/${service.slug}`, svg: <path d="M8 19L20 9l12 10" stroke="#3fa9f5" strokeWidth="1.6" /> })).map((s) => (
          <Link
            key={s.title}
            href={s.href}
            style={{ background: '#12151B', padding: '28px 24px', display: 'block', textDecoration: 'none' }}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 16 }} aria-hidden="true">
              {s.svg}
            </svg>
            <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 8px 0' }}>{s.title}</h3>
            <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
