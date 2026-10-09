import Link from 'next/link';
import Image from '@/components/ManagedImage';
import { defaultHero, getHero, getPublicBusiness } from '@/lib/cms/settings';
import Icon from '@/components/Icon';
import HeroVisual from './HeroVisual';

export default async function HeroSection() {
  const [hero, business] = await Promise.all([getHero(), getPublicBusiness()]);
  const defaultMedia = hero.mediaType === 'default' || !hero.mediaUrl;
  const defaultTitle = hero.title === defaultHero.title;
  return (
    <section id="hero" className="home-hero" aria-labelledby="hero-title">
      <div className="home-hero-main">
        <div className="home-hero-copy">
          <span className="home-hero-eyebrow">
            <span aria-hidden="true" />
            {hero.eyebrow}
          </span>
          <h1 id="hero-title">
            {defaultTitle ? (
              <>
                CCTV &amp; Internet{' '}
                <br />
                Services in{' '}
                <br />
                <span>Hyderabad.</span>
              </>
            ) : (
              hero.title
            )}
          </h1>
          {hero.subtitle && (
            <p className="home-hero-promise">{hero.subtitle}</p>
          )}
          <p className="home-hero-description">{hero.description}</p>
          <div className="home-hero-actions">
            <Link href="/site-survey" className="home-hero-primary">
              Request a Site Survey <Icon name="arrow-up-right" size={18} />
            </Link>
            <a
              href={business.WHATSAPP_URL}
              className="home-hero-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" size={18} />
              WhatsApp Us
            </a>
          </div>
          <a className="home-hero-phone" href={`tel:${business.PHONE}`}>
            <Icon name="phone" size={15} />
            <span>
              Prefer to talk? <strong>{business.PHONE_DISPLAY}</strong>
            </span>
          </a>
          <div className="home-hero-assurance">
            <Icon name="check" size={16} /> Site survey before quote{' '}
            <span aria-hidden="true">·</span> Installation & support
          </div>
        </div>

        <div className="home-hero-visual">
          <HeroVisual interactive={hero.mediaType !== 'video'}>
            <div className="hero-art-stage">
              {hero.mediaType === 'video' && hero.mediaUrl ? (
                <video
                  src={hero.mediaUrl}
                  poster={hero.poster || undefined}
                  controls
                  preload="metadata"
                  aria-label={hero.mediaAlt || 'Business introduction video'}
                />
              ) : (
                <Image
                  src={
                    defaultMedia
                      ? '/images/illustrations/hero-security-connectivity.webp'
                      : hero.mediaUrl
                  }
                  alt={
                    defaultMedia
                      ? 'Modern outdoor CCTV camera with a wall mount and a Wi-Fi router, illustrative equipment scene'
                      : hero.mediaAlt
                  }
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 610px"
                  preload
                />
              )}
              {defaultMedia && (
                <div className="hero-art-label">
                  <Icon name="shield" size={16} />
                  <span>Security + connectivity</span>
                </div>
              )}
            </div>
          </HeroVisual>
          <div className="hero-service-links">
            <a href="#services">
              <span className="hero-service-icon">
                <Icon name="shield" size={19} />
              </span>
              <span>
                <small>Protect your space</small>
                <strong>CCTV installation</strong>
              </span>
              <Icon name="arrow-up-right" size={17} />
            </a>
            <a href="#internet">
              <span className="hero-service-icon">
                <Icon name="wifi" size={19} />
              </span>
              <span>
                <small>Connect your business</small>
                <strong>Internet & networking</strong>
              </span>
              <Icon name="arrow-up-right" size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
