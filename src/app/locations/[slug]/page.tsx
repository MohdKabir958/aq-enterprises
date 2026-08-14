import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocationTemplate } from '@/components/templates';
import { getLocationBySlug, getLocationSlugs, toStaticParams } from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return toStaticParams(getLocationSlugs());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return buildMetadata({ seo: location.seo });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();
  return <LocationTemplate location={location} />;
}
