import type { Metadata } from 'next';
import { getProducts } from '@/lib/cms/catalogue';
import CartPage from '@/components/shop/CartPage';
import ShopShell from '@/components/shop/ShopShell';
export const metadata: Metadata = {
  title: 'Your cart',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: '/cart' },
};
export default async function Page() {
  return (
    <ShopShell
      title="Your enquiry cart"
      description="Review your selected products, packages and quantities."
    >
      <CartPage products={await getProducts()} />
    </ShopShell>
  );
}
