'use client';
import Link from 'next/link';
import Image from '@/components/ManagedImage';
import type { Product } from '@/lib/cms/models';
import { useCart } from './useCart';
import { useState } from 'react';
export const money = (price: number | null) =>
  price === null
    ? 'Request a quotation'
    : `₹${price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
export default function Catalogue({ products }: { products: Product[] }) {
  const cart = useCart();
  const [filter, setFilter] = useState('all');
  const [notice, setNotice] = useState('');
  return (
    <>
      <div className="shop-toolbar">
        <label>
          Show
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All products and offers</option>
            <option value="product">Products</option>
            <option value="package">Packages</option>
            <option value="combo">Combo offers</option>
          </select>
        </label>
        <Link href="/cart">
          View cart ({cart.items.reduce((n, i) => n + i.quantity, 0)}) →
        </Link>
      </div>
      {notice && (
        <p role="status" className="cms-notice">
          {notice} <Link href="/cart">View cart</Link>
        </p>
      )}
      {cart.storageWarning && (
        <p>
          Your browser blocks saved storage. Keep this tab open to retain your
          cart.
        </p>
      )}
      <div className="shop-grid">
        {products
          .filter((p) => filter === 'all' || p.kind === filter)
          .map((p) => (
            <article className="shop-card" key={p.id}>
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.imageAlt || p.name}
                  width={640}
                  height={420}
                  sizes="(max-width: 600px) 100vw, 33vw"
                  style={{
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                    borderRadius: 10,
                  }}
                />
              )}
              <p className="cms-kicker">
                {p.kind === 'combo' ? 'Combo offer' : p.kind}
              </p>
              <h2>
                <Link href={`/products/${p.slug}`}>{p.name}</Link>
              </h2>
              <p>{p.description}</p>
              {p.features.length > 0 && (
                <ul>
                  {p.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
              <p className="shop-price">
                {p.offerPrice !== null && <del>{money(p.price)} </del>}
                {money(p.offerPrice ?? p.price)}
              </p>
              <button
                disabled={!cart.ready}
                onClick={() =>
                  setNotice(
                    cart.add(p.id)
                      ? `${p.name} added to your cart.`
                      : 'Your cart has reached its 40-item limit.',
                  )
                }
              >
                Add to cart
              </button>
            </article>
          ))}
      </div>
      {!products.length && (
        <div className="shop-card">
          <h2>Tell us what you need</h2>
          <p>
            Published products and packages will appear here. You can request a
            quotation for your requirements now.
          </p>
          <Link href="/contact">Request a quotation →</Link>
        </div>
      )}
    </>
  );
}
