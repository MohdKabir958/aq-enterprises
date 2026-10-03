import { BRANDS } from '@/lib/constants';

export default function BrandsSection() {
  return (
    <section
      aria-label="Brands we commonly install"
      style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#6B7484',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 28,
        }}
      >
        Brands we commonly install and support
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
        {BRANDS.map((b) => (
          <div
            key={b}
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              borderRadius: 8,
              padding: '16px 26px',
              color: '#9BA5B4',
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}
