'use client';
import Image, { type ImageProps } from 'next/image';
import { useSiteSettings } from './SiteSettings';
export default function ManagedImage(props: ImageProps) {
  const { images } = useSiteSettings();
  const original = typeof props.src === 'string' ? props.src : '';
  const replacement = images.find((image) => image.original === original);
  if (replacement?.replacement === null) return null;
  const src = replacement?.replacement || props.src;
  const hosted =
    typeof src === 'string' &&
    (src.startsWith('https://') || src.startsWith('/api/media/'));
  return (
    <Image
      {...props}
      src={src}
      alt={replacement?.alt || props.alt}
      unoptimized={hosted || props.unoptimized}
    />
  );
}
