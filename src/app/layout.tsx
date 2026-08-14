/**
 * @file layout.tsx
 * @description Root layout for the Next.js App Router.
 *
 * Responsibilities:
 *   - Sets the HTML shell (`<html>`, `<head>`, `<body>`)
 *   - Injects the Three.js import-map needed by camera-scene.js (served from /public)
 *   - Renders the global FloatingCTA (sticky WhatsApp + quote modal, present on all pages)
 *   - Applies global CSS including font import and keyframe animations
 *
 * WHY HEADER/FOOTER ARE NOT HERE:
 * The active nav item differs per page (e.g. "home", "about", "services").
 * Each page renders <Header active="..."> directly so the correct nav link is highlighted.
 * Footer is also rendered per-page to keep page components self-contained.
 *
 * IMPORT MAP NOTE:
 * The importmap allows camera-scene.js (a plain ES module in /public) to import
 * from `three` and `three/addons/...` without a build step.
 * This must live in <head> before any module script executes.
 */

import type { Metadata } from 'next';
import './globals.css';
import FloatingCTA from '@/components/FloatingCTA';
import Analytics from '@/components/Analytics';
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm',
  display: 'swap',
});

import { siteConfig } from '@/lib/config';

/** Default metadata — individual pages override title and description. */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['CCTV installation Hyderabad', 'Security cameras', 'Access control', 'Biometric attendance', 'Surveillance'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Premium CCTV Installation`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#0A0C10',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlex.variable}`}>
      <head>

        {/*
         * Import map for camera-scene.js (served from /public).
         * Maps bare module specifiers to CDN URLs so the plain ES module
         * can use `import 'three'` without a bundler.
         * Must be placed before any <script type="module"> executes.
         */}
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                three: 'https://unpkg.com/three@0.184.0/build/three.module.js',
                'three/addons/environments/RoomEnvironment.js':
                  'https://unpkg.com/three@0.184.0/examples/jsm/environments/RoomEnvironment.js',
                'three/addons/controls/OrbitControls.js':
                  'https://unpkg.com/three@0.184.0/examples/jsm/controls/OrbitControls.js',
              },
            }),
          }}
        />
      </head>
      <body>
        {/* Page-specific content: each page renders its own <Header> and <Footer> */}
        {children}

        {/*
         * FloatingCTA is rendered at the layout level so it persists across
         * all pages without remounting. It contains the WhatsApp button,
         * the "Get Free Quote" modal, and the mobile bottom action bar.
         */}
        <FloatingCTA />
        <Analytics />
      </body>
    </html>
  );
}
