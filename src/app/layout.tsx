import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export const metadata: Metadata = {
  title: 'AQ Enterprises — CCTV & Security Systems Installation',
  description: 'Licensed CCTV installers for homes, offices and industrial sites. 500+ installations, 8+ years experience. Free site visit. Call +91 78159 15792.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body style={{ margin: 0, background: '#0A0C10', fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
