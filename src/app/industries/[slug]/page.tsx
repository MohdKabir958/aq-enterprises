import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryTemplate } from '@/components/templates';
import { getIndustryBySlug, getIndustrySlugs, toStaticParams } from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return toStaticParams(getIndustrySlugs());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return buildMetadata({ seo: industry.seo });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  return <IndustryTemplate industry={industry} />;
}
