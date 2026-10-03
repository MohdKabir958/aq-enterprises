import type { CSSProperties } from 'react';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/lib/assets';
import { resolvePublicSrc } from '@/lib/assets-server';

export type AssetProvenance = 'client_verified' | 'provisional_illustration' | 'system_asset';

export type VerifiedImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  caption?: string;
  style?: CSSProperties;
  /**
   * Provenance of the image asset:
   * - `client_verified`: Authenticated on-site client photography approved for publication.
   * - `provisional_illustration`: Illustrative or diagrammatic asset pending client photo replacement.
   * - `system_asset`: Built-in site graphic (e.g. logo, system diagram).
   */
  provenance?: AssetProvenance;
};

/**
 * Safe image renderer with technical availability check and provenance tracking.
 * Only mounts `<Image>` if the asset file exists under `/public` on disk,
 * preventing broken image icons or 404 image requests.
 *
 * NOTE: Filesystem presence verifies technical availability, NOT client authenticity.
 * Authenticity is tracked via the `provenance` property.
 *
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
  provenance = 'provisional_illustration',
}: VerifiedImageProps) {
  const resolved = resolvePublicSrc(src);
  if (!resolved) return null;

  const isIllustration = provenance === 'provisional_illustration';
  const displayCaption = caption
    ? isIllustration && !caption.toLowerCase().includes('illustrative')
      ? `${caption} (Illustrative image)`
      : caption
    : isIllustration
      ? 'Illustrative image'
      : undefined;

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
      {displayCaption ? (
        <figcaption style={{ color: '#6B7484', fontSize: 13, lineHeight: 1.5, marginTop: 8 }}>
          {displayCaption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Semantic alias for clarity across non-verified assets */
export { VerifiedImage as SafeImage };
