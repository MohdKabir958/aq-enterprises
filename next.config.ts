import type { NextConfig } from 'next';

/**
 * Preferred production host is https://www.aqenterprises.in (see business.ts WEBSITE_URL).
 * Apex → www permanent redirect enforces a single canonical hostname.
 * Trailing slash: Next default (false) — keep URLs without trailing slash.
 */
const nextConfig: NextConfig = {
  // Enabled native Next.js image optimization (unoptimized: true removed)
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/commercial-internet',
        destination: '/commercial-internet-hyderabad',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aqenterprises.in' }],
        destination: 'https://www.aqenterprises.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
