import type { CSSProperties } from 'react';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/assets';
import { resolvePublicSrc } from '@/lib/assets-server';

type VerifiedImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  caption?: string;
  style?: CSSProperties;
};

/**
 * Renders next/image only when the file exists under /public.
 * Server Component — do not import from client components.
 */
export default function VerifiedImage({
  src,
  alt,
  width,
  height,
  sizes = IMAGE_SIZES.content,
  priority = false,
  caption,
  style,
}: VerifiedImageProps) {
  const resolved = resolvePublicSrc(src);
  if (!resolved) return null;

  return (
    <figure style={{ margin: 0 }}>
      <Image
        src={resolved}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        style={{ width: '100%', height: 'auto', display: 'block', ...style }}
      />
      {caption ? (
        <figcaption style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
