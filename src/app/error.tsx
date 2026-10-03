'use client';

/**
 * @file error.tsx
 * @description Next.js App Router error boundary for user-facing routes.
 *
 * Catches unexpected runtime exceptions gracefully without breaking the layout
 * or leaking internal server traces/secrets to the user.
 */

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Structured client logging — error digest only, no PII
    if (process.env.NODE_ENV === 'development') {
      console.error('[AppError]', error);
    } else {
      console.error('[AppError] An unexpected error occurred. Digest:', error.digest || 'none');
    }
  }, [error]);

  return (
    <div
      style={{
        background: '#0A0C10',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        color: '#F2F4F7',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 540 }}>
        <span
          style={{
            display: 'inline-block',
            color: '#FF5A1F',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Something went wrong
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-space), sans-serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            margin: '0 0 16px',
            color: '#F2F4F7',
          }}
        >
          We couldn&apos;t load this page
        </h1>
        <p style={{ color: '#9BA5B4', fontSize: 16, lineHeight: 1.6, margin: '0 0 32px' }}>
          An unexpected error occurred while preparing this content. Please try refreshing or return to
          the homepage.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: '#FF5A1F',
              color: '#0A0C10',
              fontWeight: 600,
              fontSize: 15,
              padding: '12px 24px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              background: '#12151B',
              border: '1px solid #232833',
              color: '#F2F4F7',
              fontWeight: 600,
              fontSize: 15,
              padding: '12px 24px',
              borderRadius: 6,
              textDecoration: 'none',
            }}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
