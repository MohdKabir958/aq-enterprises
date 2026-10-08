export default function HowItWorksSection() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--page-gutter) 88px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span
          style={{
            color: '#3fa9f5',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          How It Works
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(26px,3vw,38px)',
            color: '#F2F4F7',
            margin: '10px 0 0',
          }}
        >
          From site visit to switch-on
        </h2>
      </div>
      <div className="grid-responsive grid-cols-5" style={{ gap: 20 }}>
        {[
          { n: '01', t: 'Site Visit', d: 'We inspect your property and map every blind spot.' },
          { n: '02', t: 'Custom Quote', d: 'Transparent pricing, no hidden costs.' },
          { n: '03', t: 'Installation', d: 'Neat cabling and mounts with clear labeling.' },
          { n: '04', t: 'Testing & Handover', d: 'Coverage checks and viewing walkthrough.' },
          { n: '05', t: 'AMC & Support', d: 'Optional maintenance plans written into your quote.' },
        ].map((s) => (
          <div key={s.n} style={{ paddingTop: 20, borderTop: '1px solid #232833' }}>
            <div
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontSize: 28,
                fontWeight: 700,
                color: '#232833',
                marginBottom: 14,
              }}
              aria-hidden="true"
            >
              {s.n}
            </div>
            <h3 style={{ color: '#F2F4F7', fontSize: 15, fontWeight: 600, margin: '0 0 8px 0' }}>
              {s.t}
            </h3>
            <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
