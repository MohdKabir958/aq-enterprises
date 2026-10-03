import Link from 'next/link';

export default function ServicesSummarySection() {
  return (
    <section id="services" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}>
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
        {[
          {
            svg: (
              <>
                <path d="M8 19L20 9l12 10" stroke="#3fa9f5" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M11 17v13h18V17" stroke="#3fa9f5" strokeWidth="1.6" />
              </>
            ),
            title: 'Home CCTV Installation',
            desc: 'Complete coverage for entry points, gates and common areas.',
          },
          {
            svg: (
              <>
                <rect x="10" y="8" width="20" height="24" stroke="#3fa9f5" strokeWidth="1.6" />
                <path
                  d="M15 14h3M22 14h3M15 20h3M22 20h3M15 26h3M22 26h3"
                  stroke="#3fa9f5"
                  strokeWidth="1.6"
                />
              </>
            ),
            title: 'Office & Commercial',
            desc: 'Access-controlled, multi-floor surveillance for workplaces.',
          },
          {
            svg: (
              <path
                d="M8 32V18l7 5v-5l7 5v-5l8 5v9H8z"
                stroke="#3fa9f5"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            ),
            title: 'Factory & Warehouse',
            desc: 'Wide-area coverage built for industrial sites and logistics.',
          },
          {
            svg: (
              <>
                <path d="M20 8L34 15 20 22 6 15z" stroke="#3fa9f5" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M12 18v8c0 2 4 4 8 4s8-2 8-4v-8" stroke="#3fa9f5" strokeWidth="1.6" />
              </>
            ),
            title: 'School & Institutional',
            desc: 'Campus-wide monitoring with restricted access zones.',
          },
          {
            svg: (
              <>
                <circle cx="20" cy="18" r="9" stroke="#3fa9f5" strokeWidth="1.6" />
                <circle cx="20" cy="18" r="3" stroke="#3fa9f5" strokeWidth="1.6" />
                <path d="M20 27v6M14 33h12" stroke="#3fa9f5" strokeWidth="1.6" />
              </>
            ),
            title: 'IP Camera Installation',
            desc: 'High-resolution network cameras with remote viewing.',
          },
          {
            svg: (
              <>
                <path
                  d="M13 22a10 10 0 0 1 14 0M9 17a16 16 0 0 1 22 0"
                  stroke="#3fa9f5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="27" r="2.4" fill="#3fa9f5" />
              </>
            ),
            title: 'Wireless CCTV Systems',
            desc: 'Clean installs with no cabling for tricky sites.',
          },
          {
            svg: (
              <>
                <rect x="12" y="18" width="16" height="14" rx="2" stroke="#3fa9f5" strokeWidth="1.6" />
                <path d="M16 18v-4a4 4 0 0 1 8 0v4" stroke="#3fa9f5" strokeWidth="1.6" />
              </>
            ),
            title: 'Access Control & Biometric',
            desc: 'Fingerprint and card-based entry systems.',
          },
          {
            svg: (
              <>
                <path
                  d="M20 8v6M20 26v6M8 20h6M26 20h6"
                  stroke="#3fa9f5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="20" r="6" stroke="#3fa9f5" strokeWidth="1.6" />
              </>
            ),
            title: 'AMC & Maintenance',
            desc: 'Scheduled servicing and priority repair visits.',
          },
        ].map((s) => (
          <Link
            key={s.title}
            href="/services"
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
