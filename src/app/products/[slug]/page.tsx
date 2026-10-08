import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/cms/catalogue';
import Catalogue from '@/components/shop/Catalogue';
import ShopShell from '@/components/shop/ShopShell';
import { JsonLd } from '@/lib/json-ld';
import { WEBSITE_URL } from '@/lib/business';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProducts()).find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — Hyderabad`,
    description: p.description.slice(0, 160),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: p.name,
      description: p.description.slice(0, 160),
      url: `/products/${p.slug}`,
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = (await getProducts()).find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <ShopShell
      title={p.name}
      description="Add this item to your enquiry cart. Final scope and pricing are confirmed in a written quotation."
    >
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.name,
          description: p.description,
          url: `${WEBSITE_URL}/products/${p.slug}`,
          ...(p.image
            ? {
                image: p.image.startsWith('/')
                  ? `${WEBSITE_URL}${p.image}`
                  : p.image,
              }
            : {}),
        }}
      />
      <Catalogue products={[p]} />
    </ShopShell>
  );
}
