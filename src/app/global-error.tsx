'use client';

/**
 * @file global-error.tsx
 * @description Next.js App Router root layout fallback error boundary.
 */

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#0A0C10',
          color: '#F2F4F7',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Service Unavailable</h1>
          <p style={{ color: '#9BA5B4', lineHeight: 1.6, marginBottom: 28 }}>
            An unexpected application error occurred. Please try reloading the page.
          </p>
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
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
