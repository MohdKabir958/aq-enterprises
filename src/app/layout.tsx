/**
 * @file layout.tsx
 * @description Root layout for the Next.js App Router.
 *
 * Responsibilities:
 *   - Sets the HTML shell (`<html>`, `<head>`, `<body>`)
 *   - Renders the global FloatingCTA (sticky WhatsApp + quote modal, present on all pages)
 *   - Injects Analytics tracking component
 *   - Applies global CSS including font variables and keyframe animations
 *
 * WHY HEADER/FOOTER ARE NOT HERE:
 * The active nav item differs per page (e.g. "home", "about", "services").
 * Each page renders <Header active="..."> directly so the correct nav link is highlighted.
 * Footer is also rendered per-page to keep page components self-contained.
 *
 * THREE.JS NOTE:
 * Three.js is route-scoped exclusively to the homepage hero via CameraSceneLoader
 * with ssr: false, keeping non-homepage bundles lightweight and fast.
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
      <head />
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
