import type { BlogPost } from '@/types';
import { resolvePublicSrc } from '@/lib/assets-server';
import { SECURITY_PHOTO, NETWORK_PHOTO } from '@/lib/service-visuals';

export function getBlogVisual(post: BlogPost) {
  const custom = resolvePublicSrc(post.featuredImage || post.coverImage);
  if (custom) return { src: custom, alt: post.featuredImageAlt || post.title };
  const topic = `${post.slug} ${post.title}`.toLowerCase();
  if (/door.phone|intercom/.test(topic))
    return {
      src: '/images/illustrations/video-intercom.webp',
      alt: 'Video intercom camera and indoor monitor',
    };
  if (/biometric|access.control/.test(topic))
    return {
      src: '/images/illustrations/access-control.webp',
      alt: 'Fingerprint attendance and access-control terminal',
    };
  if (/dvr|nvr|storage|retention/.test(topic))
    return {
      src: '/images/illustrations/recorders-storage.webp',
      alt: 'CCTV recorder, surveillance hard disk and camera equipment',
    };
  if (/repair|problem|maintenance|amc/.test(topic))
    return {
      src: '/images/illustrations/cctv-maintenance.webp',
      alt: 'CCTV servicing tools and camera components',
    };
  if (/poe|network|internet|remote/.test(topic))
    return {
      src: NETWORK_PHOTO,
      alt: 'Ethernet patch panel and network connections',
    };
  const properties = [
    [
      /factor|industrial/,
      'factory-cctv-surveillance',
      'Industrial working areas',
    ],
    [
      /warehouse|logistic/,
      'warehouse-cctv-installation',
      'Warehouse aisles and storage areas',
    ],
    [/office|workplace/, 'office-cctv-installation', 'Modern office corridors'],
    [
      /apartment|societ/,
      'apartment-cctv-installation',
      'Shared apartment building spaces',
    ],
    [
      /retail|shop/,
      'retail-shop-cctv-installation',
      'Retail shop merchandise displays',
    ],
    [/villa/, 'villa-cctv-installation', 'Villa entrance and outdoor areas'],
  ] as const;
  for (const [pattern, slug, alt] of properties)
    if (pattern.test(topic))
      return { src: `/images/services/${slug}.webp`, alt };
  return {
    src: SECURITY_PHOTO,
    alt: 'Security camera overlooking a house entrance',
  };
}

export function formatArticleDate(iso?: string) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}
