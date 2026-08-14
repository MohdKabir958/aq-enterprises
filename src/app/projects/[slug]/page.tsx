import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectTemplate } from '@/components/templates';
import { getProjectBySlug, getProjectSlugs, toStaticParams } from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return toStaticParams(getProjectSlugs());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({ seo: project.seo });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectTemplate project={project} />;
}
