import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogTemplate } from '@/components/templates';
import { getBlogBySlug, getBlogSlugs, toStaticParams } from '@/lib/content/getters';
import { generateMetadata as buildMetadata } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toStaticParams((await getBlogSlugs()));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug));
  if (!post) return {};
  return buildMetadata({
    seo: post.seo,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: post.author ? [post.author] : undefined,
  });
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const post = (await getBlogBySlug(slug));
  if (!post) notFound();
  return <BlogTemplate post={post} />;
}
