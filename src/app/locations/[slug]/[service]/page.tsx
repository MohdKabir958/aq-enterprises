import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceLocationTemplate } from '@/components/templates';
import {
  getServiceLocation,
  getServiceLocationStaticParams,
} from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string; service: string }>;
};

export function generateStaticParams() {
  return getServiceLocationStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, service } = await params;
  const page = getServiceLocation(slug, service);
  if (!page) return {};
  return buildMetadata({ seo: page.seo });
}

export default async function ServiceLocationPageRoute({ params }: Props) {
  const { slug, service } = await params;
  const page = getServiceLocation(slug, service);
  if (!page) notFound();
  return <ServiceLocationTemplate page={page} />;
}
