import { TRUST_HIGHLIGHTS } from '@/lib/constants';

export default function TrustHighlightsSection() {
  return (
    <section
      aria-label="Why trust AQ Enterprises"
      className="grid-responsive grid-cols-4"
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 32px 72px',
      }}
    >
      {TRUST_HIGHLIGHTS.map((s) => (
        <div key={s.label} style={{ padding: '24px 0', borderTop: '2px solid #FF5A1F' }}>
          <div
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 18,
              fontWeight: 600,
              color: '#F2F4F7',
              lineHeight: 1.35,
            }}
          >
            {s.label}
          </div>
          <div style={{ color: '#6B7484', fontSize: 14, marginTop: 6 }}>{s.detail}</div>
        </div>
      ))}
    </section>
  );
}
