import Link from 'next/link';
import TestimonialCard from '@/components/TestimonialCard';
import { PHONE, PHONE_DISPLAY } from '@/lib/constants';
import { CTA_COPY } from '@/lib/business';
import type { Testimonial } from '@/types';

export default function VerifiedReviewsSection({ reviews }: { reviews: Testimonial[] }) {
  return (
    <section
      aria-labelledby="reviews-heading"
      style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 88px' }}
    >
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
          Customer feedback
        </span>
        <h2
          id="reviews-heading"
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(26px,3vw,38px)',
            color: '#F2F4F7',
            margin: '10px 0 0',
          }}
        >
          Verified reviews
        </h2>
      </div>
      {reviews.length > 0 ? (
        <div className="grid-responsive grid-cols-3" style={{ gap: 24 }}>
          {reviews.map((t) => (
            <article
              key={t.id}
              style={{
                background: '#12151B',
                border: '1px solid #1B1F27',
                borderRadius: 12,
                padding: '8px 28px 28px',
              }}
            >
              <TestimonialCard testimonial={t} />
            </article>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#12151B',
            border: '1px solid #1B1F27',
            borderRadius: 12,
            padding: 32,
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          <p style={{ color: '#C7CDD6', fontSize: 15, lineHeight: 1.65, margin: '0 0 12px' }}>
            We publish customer reviews only after they are independently verified (for example
            via Google Business Profile with permission). Project case studies below show our
            verified Hyderabad installs.
          </p>
          <p style={{ color: '#6B7484', fontSize: 14, margin: 0 }}>
            Prefer to talk now?{' '}
            <a href={`tel:${PHONE}`} style={{ color: '#3fa9f5' }}>
              Call {PHONE_DISPLAY}
            </a>{' '}
            or{' '}
            <Link href="/#contact" style={{ color: '#3fa9f5' }}>
              {CTA_COPY.survey.heading.toLowerCase()}
            </Link>
            .
          </p>
        </div>
      )}
    </section>
  );
}
