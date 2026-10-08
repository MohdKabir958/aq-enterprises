import Image from '@/components/ManagedImage';
import { getHero } from '@/lib/cms/settings';
import { getPublicBusiness } from '@/lib/cms/settings';
import CameraSceneLoader from '@/components/CameraSceneLoader';


export default async function HeroSection() {
  const hero = await getHero();
  const { PHONE, WHATSAPP_URL } = await getPublicBusiness();
  return (
    <section
      id="hero"
      className="grid-split hero-section"
      style={{
        position: 'relative',
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px var(--page-gutter) 80px',
        gap: 24,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -160,
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(63,169,245,0.16),transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.7s ease both' }}>
        <span
          style={{
            display: 'inline-block',
            color: '#FF5A1F',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          {hero.eyebrow}
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(34px,4.2vw,54px)',
            lineHeight: 1.08,
            color: '#F2F4F7',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}
        >
          {hero.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(18px,1.8vw,22px)',
            color: '#9BA5B4',
            margin: '0 0 16px',
            fontStyle: 'italic',
            lineHeight: 1.3,
          }}
        >
          {hero.subtitle}
        </p>
        <p style={{ color: '#9BA5B4', fontSize: 17, lineHeight: 1.6, maxWidth: 480, margin: '0 0 32px' }}>
          {hero.description}
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
          <a
            href={`tel:${PHONE}`}
            style={{
              background: '#FF5A1F',
              color: '#0A0C10',
              fontWeight: 600,
              fontSize: 15,
              padding: '15px 26px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Call Now →
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              color: '#F2F4F7',
              fontWeight: 600,
              fontSize: 15,
              padding: '15px 26px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            WhatsApp Us
          </a>
        </div>
        <div style={{ color: '#6B7484', fontSize: 14 }}>
          Mallapur, Hyderabad &nbsp;·&nbsp; Site survey before quote &nbsp;·&nbsp; Published local projects
        </div>
      </div>
      {hero.mediaType === 'image' && hero.mediaUrl ? <Image src={hero.mediaUrl} alt={hero.mediaAlt} width={1200} height={800} priority style={{ width: '100%', height: 'auto', borderRadius: 16 }} /> : hero.mediaType === 'video' && hero.mediaUrl ? <video src={hero.mediaUrl} poster={hero.poster || undefined} controls preload="metadata" aria-label={hero.mediaAlt || 'Business introduction video'} style={{ width: '100%', borderRadius: 16 }} /> : <CameraSceneLoader />}
    </section>
  );
}
