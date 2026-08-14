"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/types";
import { getProduct } from "@/lib/products-client";

type WishlistContextValue = {
  handles: string[];
  items: Product[];
  has: (handle: string) => boolean;
  toggle: (handle: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const KEY = "harvesthome-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [handles, setHandles] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setHandles(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(handles));
  }, [handles, ready]);

  const toggle = useCallback((handle: string) => {
    setHandles((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle],
    );
  }, []);

  const has = useCallback((handle: string) => handles.includes(handle), [handles]);

  const items = useMemo(
    () =>
      handles
        .map((h) => getProduct(h))
        .filter((p): p is Product => Boolean(p)),
    [handles],
  );

  const value = useMemo(
    () => ({ handles, items, has, toggle }),
    [handles, items, has, toggle],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
