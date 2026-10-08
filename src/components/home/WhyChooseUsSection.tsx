import { BRANDS } from '@/lib/constants';

export default function WhyChooseUsSection() {
  return (
    <section
      style={{
        background: '#0d0f13',
        borderTop: '1px solid #1B1F27',
        borderBottom: '1px solid #1B1F27',
        padding: '80px var(--page-gutter)',
      }}
    >
      <div
        className="grid-responsive grid-cols-4"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          gap: 32,
        }}
      >
        {[
          {
            svg: (
              <path
                d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.7 7.1 17.2l.9-5.5-4-3.9 5.5-.8z"
                stroke="#3fa9f5"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            ),
            t: 'Survey-led installs',
            d: 'We walk the site before quoting so coverage matches how you use the property.',
          },
          {
            svg: (
              <path
                d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"
                stroke="#3fa9f5"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            ),
            t: 'Established hardware brands',
            d: `We commonly install ${BRANDS[0]}, ${BRANDS[1]}, ${BRANDS[2]} and other supported brands when they fit the brief.`,
          },
          {
            svg: (
              <>
                <circle cx="12" cy="12" r="9" stroke="#3fa9f5" strokeWidth="1.4" />
                <path d="M12 7v5l3.5 2" stroke="#3fa9f5" strokeWidth="1.4" strokeLinecap="round" />
              </>
            ),
            t: 'Hyderabad service area',
            d: 'Homes, businesses, and institutions across Hyderabad — from our Mallapur base.',
          },
          {
            svg: (
              <>
                <path d="M4 12a8 8 0 0 1 16 0" stroke="#3fa9f5" strokeWidth="1.4" />
                <rect x="3" y="12" width="4" height="6" rx="1" stroke="#3fa9f5" strokeWidth="1.4" />
                <rect x="17" y="12" width="4" height="6" rx="1" stroke="#3fa9f5" strokeWidth="1.4" />
              </>
            ),
            t: 'AMC when you need it',
            d: 'Maintenance scope and visit frequency are written into the quotation — not invented SLAs.',
          },
        ].map((w) => (
          <div key={w.t}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                background: 'rgba(63,169,245,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 18,
              }}
              aria-hidden="true"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {w.svg}
              </svg>
            </div>
            <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 8px 0' }}>
              {w.t}
            </h3>
            <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.55, margin: 0 }}>{w.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
