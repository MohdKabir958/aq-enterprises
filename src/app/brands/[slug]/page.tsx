import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BrandTemplate } from '@/components/templates';
import { getBrandBySlug, getBrandSlugs, toStaticParams } from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return toStaticParams(getBrandSlugs());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return buildMetadata({ seo: brand.seo });
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();
  return <BrandTemplate brand={brand} />;
}
