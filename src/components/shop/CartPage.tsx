'use client';
import Link from 'next/link';
import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import { useCart } from './useCart';
import { money } from './Catalogue';
import type { Product } from '@/lib/cms/models';
export default function CartPage({
  products,
  checkout = false,
}: {
  products: Product[];
  checkout?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const cart = useCart();
  const selections = cart.items.map((item) => ({
    item,
    product: products.find((p) => p.id === item.id),
  }));
  const available = selections.filter(
    (entry): entry is typeof entry & { product: Product } =>
      Boolean(entry.product),
  );
  const total = available.reduce(
    (sum, e) =>
      sum + (e.product.offerPrice ?? e.product.price ?? 0) * e.item.quantity,
    0,
  );
  const quoteOnly = available.some((e) => e.product.price === null);
  const summary = available
    .map(
      ({ item, product }) =>
        `${product.name} × ${item.quantity} — ${money(product.offerPrice ?? product.price)} each`,
    )
    .join('\n');
  if (sent)
    return (
      <div className="shop-card" role="status">
        <h2>Quotation request received</h2>
        <p>
          We have received your selected items and contact details. Our team
          will follow up with you.
        </p>
        <Link href="/products">Browse products</Link>
      </div>
    );
  if (!cart.ready) return <p role="status">Loading your cart…</p>;
  if (!cart.items.length)
    return (
      <div className="shop-card">
        <h2>Your cart is empty</h2>
        <Link href="/products">Browse products and packages →</Link>
      </div>
    );
  return (
    <>
      {cart.storageWarning && (
        <p>
          Your browser blocks saved storage. Keep this tab open to retain your
          cart.
        </p>
      )}
      <div className="shop-checkout">
        <section>
          <h2>Selected items</h2>
          {selections.map(({ item, product }) => (
            <article key={item.id} className="shop-card">
              <h3>{product?.name || 'Unavailable product'}</h3>
              {product ? (
                <>
                  <p>{money(product.offerPrice ?? product.price)} each</p>
                  <label>
                    Quantity for {product.name}
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={99}
                      onChange={(e) => {
                        const quantity = Number(e.target.value);
                        if (
                          Number.isInteger(quantity) &&
                          quantity >= 1 &&
                          quantity <= 99
                        )
                          cart.update(item.id, quantity);
                      }}
                    />
                  </label>
                </>
              ) : (
                <p>
                  This item is no longer available. Remove it before checkout.
                </p>
              )}
              <button
                className="cms-secondary"
                onClick={() => cart.remove(item.id)}
              >
                Remove
              </button>
            </article>
          ))}
          <p className="shop-price">
            {quoteOnly ? 'Priced items subtotal' : 'Items subtotal'}:{' '}
            {money(total)}
          </p>
          <p>
            Installation, taxes, delivery and final availability are confirmed
            in your quotation. Checkout sends an enquiry.
          </p>
          {!checkout && available.length === selections.length && (
            <Link className="shop-button" href="/checkout">
              Proceed to checkout →
            </Link>
          )}
        </section>
        {checkout && (
          <section className="shop-card">
            <h2>Request your quotation</h2>
            {available.length === selections.length ? (
              <>
                <p>
                  Your selected items are filled below. Add your contact and
                  site details.
                </p>
                <ContactForm
                  cartItems={cart.items}
                  orderSummary={summary}
                  checkout
                  onSuccess={() => {
                    setSent(true);
                    cart.clear();
                  }}
                />
              </>
            ) : (
              <p>Remove unavailable items to continue.</p>
            )}
          </section>
        )}
      </div>
    </>
  );
}
