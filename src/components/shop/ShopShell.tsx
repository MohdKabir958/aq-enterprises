import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function ShopShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="shop-page">
        <h1>{title}</h1>
        <p className="shop-intro">{description}</p>
        {children}
      </main>
      <Footer />
    </>
  );
}
