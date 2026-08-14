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
import type { CartLine, Product } from "@/lib/types";
import { getProduct } from "@/lib/products-client";

type CartContextValue = {
  lines: CartLine[];
  saved: CartLine[];
  count: number;
  subtotal: number;
  addItem: (handle: string, quantity?: number, variant?: string) => void;
  removeItem: (handle: string, variant?: string) => void;
  setQuantity: (handle: string, quantity: number, variant?: string) => void;
  saveForLater: (handle: string, variant?: string) => void;
  moveToCart: (handle: string, variant?: string) => void;
  removeSaved: (handle: string, variant?: string) => void;
  clear: () => void;
  items: { product: Product; quantity: number; variant?: string }[];
  savedItems: { product: Product; quantity: number; variant?: string }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "harvesthome-cart";

function lineKey(line: CartLine) {
  return `${line.handle}::${line.variant ?? ""}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lines?: CartLine[]; saved?: CartLine[] };
        setLines(parsed.lines ?? []);
        setSaved(parsed.saved ?? []);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, saved }));
  }, [lines, saved, ready]);

  const addItem = useCallback((handle: string, quantity = 1, variant?: string) => {
    setLines((prev) => {
      const key = `${handle}::${variant ?? ""}`;
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { handle, quantity, variant }];
    });
  }, []);

  const removeItem = useCallback((handle: string, variant?: string) => {
    const key = `${handle}::${variant ?? ""}`;
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const setQuantity = useCallback((handle: string, quantity: number, variant?: string) => {
    const key = `${handle}::${variant ?? ""}`;
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => lineKey(l) !== key));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (lineKey(l) === key ? { ...l, quantity } : l)),
    );
  }, []);

  const saveForLater = useCallback((handle: string, variant?: string) => {
    const key = `${handle}::${variant ?? ""}`;
    setLines((prev) => {
      const line = prev.find((l) => lineKey(l) === key);
      if (line) {
        setSaved((s) => {
          if (s.some((x) => lineKey(x) === key)) return s;
          return [...s, line];
        });
      }
      return prev.filter((l) => lineKey(l) !== key);
    });
  }, []);

  const moveToCart = useCallback((handle: string, variant?: string) => {
    const key = `${handle}::${variant ?? ""}`;
    setSaved((prev) => {
      const line = prev.find((l) => lineKey(l) === key);
      if (line) {
        setLines((c) => {
          const existing = c.find((l) => lineKey(l) === key);
          if (existing) {
            return c.map((l) =>
              lineKey(l) === key ? { ...l, quantity: l.quantity + line.quantity } : l,
            );
          }
          return [...c, line];
        });
      }
      return prev.filter((l) => lineKey(l) !== key);
    });
  }, []);

  const removeSaved = useCallback((handle: string, variant?: string) => {
    const key = `${handle}::${variant ?? ""}`;
    setSaved((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(() => {
    return lines.flatMap((l) => {
      const product = getProduct(l.handle);
      return product ? [{ product, quantity: l.quantity, variant: l.variant }] : [];
    });
  }, [lines]);

  const savedItems = useMemo(() => {
    return saved.flatMap((l) => {
      const product = getProduct(l.handle);
      return product ? [{ product, quantity: l.quantity, variant: l.variant }] : [];
    });
  }, [saved]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      lines,
      saved,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      saveForLater,
      moveToCart,
      removeSaved,
      clear,
      items,
      savedItems,
    }),
    [
      lines,
      saved,
      count,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      saveForLater,
      moveToCart,
      removeSaved,
      clear,
      items,
      savedItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
