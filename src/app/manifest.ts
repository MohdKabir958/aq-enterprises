import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { BUSINESS_NAME } from '@/lib/business';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_NAME,
    short_name: BUSINESS_NAME,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0C10',
    theme_color: '#0A0C10',
    icons: [
      {
        src: '/icon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/assets/aq-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
