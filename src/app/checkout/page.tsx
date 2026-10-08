import type { Metadata } from 'next';
import { getProducts } from '@/lib/cms/catalogue';
import CartPage from '@/components/shop/CartPage';
import ShopShell from '@/components/shop/ShopShell';
export const metadata: Metadata = {
  title: 'Request your quotation',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: '/checkout' },
};
export default async function Page() {
  return (
    <ShopShell
      title="Checkout — request a quotation"
      description="Your items will be sent with your contact details. Our team will confirm the quotation with you."
    >
      <CartPage checkout products={await getProducts()} />
    </ShopShell>
  );
}
