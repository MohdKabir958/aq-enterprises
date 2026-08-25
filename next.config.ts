import type { NextConfig } from 'next';

/**
 * Preferred production host is https://www.aqenterprises.in (see business.ts WEBSITE_URL).
 * Apex → www permanent redirect enforces a single canonical hostname.
 * Trailing slash: Next default (false) — keep URLs without trailing slash.
 */
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
