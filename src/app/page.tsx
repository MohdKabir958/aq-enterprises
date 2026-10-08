/**
 * @file page.tsx
 * @description Homepage for AQ Enterprises.
 *
 * Architecture:
 * - Clean section composition from `@/components/home`
 * - Server Component pre-rendered with static metadata & structured data
 * - Strict accessibility & semantic HTML landmarks (<main>, <section>, <article>)
 */

import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import { getPublicBusiness } from '@/lib/cms/settings';
import {
  getAllProjects,
  getPublishedVerifiedTestimonials,
} from '@/lib/content/getters';
import {
  JsonLd,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from '@/lib/json-ld';
import {
  HeroSection,
  TrustHighlightsSection,
  ServicesSummarySection,
  BrandsSection,
  HowItWorksSection,
  WhyChooseUsSection,
  RecentProjectsSection,
  VerifiedReviewsSection,
  HomeQuoteSection,
} from '@/components/home';

export async function generateMetadata(): Promise<Metadata> {
  const { PHONE_DISPLAY } = await getPublicBusiness();
  return {
  title: {
    absolute: 'AQ Enterprises — CCTV & Security Systems, Hyderabad',
  },
  description:
    `CCTV and security installation for homes and businesses across Hyderabad. Site survey before quote. Call ${PHONE_DISPLAY}. Based in Mallapur.`,
  alternates: {
    canonical: '/',
  },
  };
}

export default async function HomePage() {
  const recentProjects = getAllProjects().slice(0, 3);
  const verifiedReviews = getPublishedVerifiedTestimonials();

  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh' }}>
      <JsonLd schema={(await generateOrganizationSchema())} />
      <JsonLd schema={(await generateLocalBusinessSchema())} />
      <Header active="home" />

      {/* Spacer for fixed header */}
      <div style={{ height: 'calc(76px + env(safe-area-inset-top))' }} aria-hidden="true" />

      <main>
        {/* ── Hero Section (with isolated 3D Camera) ── */}
        <HeroSection />

        {/* ── Trust highlights (evidenced facts only) ── */}
        <TrustHighlightsSection />

        {/* ── Services Grid Summary ─────────────────── */}
        <ServicesSummarySection />

        {/* ── Brands (commonly installed) ───────────── */}
        <BrandsSection />

        {/* ── How It Works ──────────────────────────── */}
        <HowItWorksSection />

        {/* ── Why Choose Us ─────────────────────────── */}
        <WhyChooseUsSection />

        {/* ── Recent Projects (evidenced installs) ──── */}
        <RecentProjectsSection projects={recentProjects} />

        {/* ── Reviews (verified only) ───────────────── */}
        <VerifiedReviewsSection reviews={verifiedReviews} />

        {/* ── FAQ ───────────────────────────────────── */}
        <FaqSection />

        {/* ── Quote / Contact ───────────────────────── */}
        <HomeQuoteSection />
      </main>

      <Footer />
    </div>
  );
}
