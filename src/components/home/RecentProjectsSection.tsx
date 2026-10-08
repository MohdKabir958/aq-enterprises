import Link from 'next/link';
import VerifiedImage from '@/components/VerifiedImage';
import { IMAGE_SIZES } from '@/lib/assets';
import { resolvePublicSrc } from '@/lib/assets-server';
import { PROJECT_PHOTO_HEIGHT, PROJECT_PHOTO_WIDTH } from '@/lib/project-photos';
import type { Project } from '@/types';

export default function RecentProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '88px var(--page-gutter)' }}>
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
            Recent Work
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-space), sans-serif',
              fontSize: 'clamp(26px,3vw,38px)',
              color: '#F2F4F7',
              margin: '10px 0 0',
            }}
          >
            Recent installations
          </h2>
        </div>
        <Link
          href="/projects"
          style={{
            color: '#F2F4F7',
            fontSize: 14,
            fontWeight: 600,
            borderBottom: '2px solid #FF5A1F',
            paddingBottom: 3,
            textDecoration: 'none',
          }}
        >
          View All Projects →
        </Link>
      </div>

      <div className="grid-responsive grid-cols-3" style={{ gap: 24 }}>
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            style={{
              display: 'block',
              background: '#12151B',
              border: '1px solid #1B1F27',
              borderRadius: 12,
              overflow: 'hidden',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 200,
                background: 'linear-gradient(135deg,#1B1F27,#12151B)',
                overflow: 'hidden',
              }}
            >
              {resolvePublicSrc(p.image) ? (
                <VerifiedImage
                  src={p.image}
                  alt={p.imageAlt || p.name}
                  width={PROJECT_PHOTO_WIDTH}
                  height={PROJECT_PHOTO_HEIGHT}
                  sizes={IMAGE_SIZES.card}
                  style={{ height: 200, objectFit: 'cover' }}
                />
              ) : (
                <div
                  role="img"
                  aria-label={p.imageAlt || p.name}
                  style={{
                    width: '100%',
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <circle cx="20" cy="20" r="9" stroke="#2A3040" strokeWidth="1.6" />
                    <circle cx="20" cy="20" r="3" stroke="#2A3040" strokeWidth="1.6" />
                    <path d="M20 29v5M14 34h12" stroke="#2A3040" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="6" y="6" width="28" height="28" rx="4" stroke="#1E2330" strokeWidth="1" />
                  </svg>
                </div>
              )}
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ color: '#F2F4F7', fontSize: 16, fontWeight: 600, margin: '0 0 10px 0' }}>
                {p.name}
              </h3>
              <p style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                {p.cameras != null ? `${p.cameras} Cameras` : '—'} · {p.brandLabel || '—'} · {p.duration || '—'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
