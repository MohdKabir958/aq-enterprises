import type { Metadata } from 'next';
import { getProducts } from '@/lib/cms/catalogue';
import Catalogue from '@/components/shop/Catalogue';
import ShopShell from '@/components/shop/ShopShell';
export const metadata: Metadata = {
  title: 'CCTV Products, Packages & Combo Offers in Hyderabad',
  description:
    'Browse AQ Enterprises products, installation packages and combo offers. Add items to your cart and request a quotation for your Hyderabad property.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'CCTV Products & Packages | AQ Enterprises',
    description: 'Browse products and request a quotation in Hyderabad.',
    url: '/products',
  },
};
export default async function ProductsPage() {
  return (
    <ShopShell
      title="Products, packages & combo offers"
      description="Choose the equipment and packages you need, then send us your selections for a quotation."
    >
      <Catalogue products={await getProducts()} />
    </ShopShell>
  );
}
