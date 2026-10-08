'use client';
import { useSyncExternalStore } from 'react';
import { cartItemsSchema, type CartItem } from '@/lib/cms/cart';
const KEY = 'aq_cart_v1';
const empty: CartItem[] = [];
const server = { items: empty, ready: false, storageWarning: false };
let snapshot = server;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());
function load() {
  try {
    const parsed = cartItemsSchema.safeParse(
      JSON.parse(localStorage.getItem(KEY) || '[]'),
    );
    snapshot = {
      items: parsed.success ? parsed.data : [],
      ready: true,
      storageWarning: false,
    };
  } catch {
    snapshot = { ...snapshot, ready: true, storageWarning: true };
  }
  notify();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!snapshot.ready) load();
  const storage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) load();
  };
  window.addEventListener('storage', storage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', storage);
  };
}
function write(items: CartItem[]) {
  const valid = cartItemsSchema.safeParse(items);
  if (!valid.success) return false;
  let warning = false;
  try {
    localStorage.setItem(KEY, JSON.stringify(valid.data));
  } catch {
    warning = true;
  }
  snapshot = { items: valid.data, ready: true, storageWarning: warning };
  notify();
  return true;
}
export function useCart() {
  const state = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => server,
  );
  return {
    ...state,
    add: (id: string) => {
      const existing = snapshot.items.find((i) => i.id === id);
      return write(
        existing
          ? snapshot.items.map((i) =>
              i.id === id
                ? { ...i, quantity: Math.min(i.quantity + 1, 99) }
                : i,
            )
          : [...snapshot.items, { id, quantity: 1 }],
      );
    },
    update: (id: string, quantity: number) =>
      write(snapshot.items.map((i) => (i.id === id ? { ...i, quantity } : i))),
    remove: (id: string) => write(snapshot.items.filter((i) => i.id !== id)),
    clear: () => write([]),
  };
}
