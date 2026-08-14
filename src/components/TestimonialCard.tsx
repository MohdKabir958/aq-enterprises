import type { CSSProperties } from 'react';
import type { Testimonial } from '@/types';

type Props = {
  testimonial: Pick<
    Testimonial,
    'quote' | 'name' | 'role' | 'rating' | 'source' | 'sourceUrl' | 'verificationStatus'
  >;
  /** Visual density */
  compact?: boolean;
};

const card: CSSProperties = {
  margin: 0,
  padding: '20px 0',
  borderTop: '1px solid #232833',
};

const quoteStyle: CSSProperties = {
  color: '#C5CCD8',
  fontSize: 16,
  lineHeight: 1.7,
  fontStyle: 'italic',
  margin: '0 0 12px',
};

const meta: CSSProperties = {
  color: '#6B7484',
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
};

/**
 * Reusable testimonial / review card.
 * Never invents star ratings — only renders rating when provided and verified upstream.
 */
export default function TestimonialCard({ testimonial, compact }: Props) {
  const showRating =
    typeof testimonial.rating === 'number' &&
    testimonial.verificationStatus === 'verified' &&
    testimonial.rating >= 1 &&
    testimonial.rating <= 5;

  return (
    <blockquote style={{ ...card, padding: compact ? '16px 0' : card.padding }}>
      <p style={quoteStyle}>“{testimonial.quote}”</p>
      <footer style={meta}>
        <cite style={{ fontStyle: 'normal', color: '#F2F4F7', fontWeight: 600 }}>
          {testimonial.name}
        </cite>
        {testimonial.role ? <> · {testimonial.role}</> : null}
        {showRating ? (
          <span
            style={{ display: 'block', marginTop: 6 }}
            aria-label={`Rated ${testimonial.rating} out of 5`}
          >
            {`${testimonial.rating} / 5`}
            {testimonial.source ? ` · ${testimonial.source}` : ''}
          </span>
        ) : testimonial.source ? (
          <span style={{ display: 'block', marginTop: 6 }}>{testimonial.source}</span>
        ) : null}
        {testimonial.verificationStatus === 'pending' ? (
          <span style={{ display: 'block', marginTop: 4, color: '#4A5565', fontSize: 12 }}>
            Pending independent verification — not a published platform rating.
          </span>
        ) : null}
        {testimonial.sourceUrl && testimonial.verificationStatus === 'verified' ? (
          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: 6, color: '#3fa9f5' }}
          >
            View source
          </a>
        ) : null}
      </footer>
    </blockquote>
  );
}
