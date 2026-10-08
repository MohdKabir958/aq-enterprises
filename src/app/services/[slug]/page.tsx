import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceTemplate } from '@/components/templates';
import { getServiceBySlug, getServiceSlugs, toStaticParams } from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toStaticParams((await getServiceSlugs()));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getServiceBySlug(slug));
  if (!service) return {};
  return buildMetadata({ seo: service.seo });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = (await getServiceBySlug(slug));
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}
