import { getProduct, getProducts, productsByHandles } from "@/lib/products";
import type { Product } from "@/lib/types";

export function complementaryProducts(product: Product, limit = 4): Product[] {
  const handles = [...product.completeTheSystem, ...product.relatedHandles];
  const unique = [...new Set(handles)].filter((h) => h !== product.handle);
  const found = productsByHandles(unique);
  if (found.length >= limit) return found.slice(0, limit);
  const extra = getProducts().filter(
    (p) =>
      p.handle !== product.handle &&
      !unique.includes(p.handle) &&
      (p.collection === product.collection ||
        p.plants.some((pl) => product.plants.includes(pl))),
  );
  return [...found, ...extra].slice(0, limit);
}

export function completeTheSystem(product: Product): Product[] {
  return productsByHandles(
    product.completeTheSystem.filter((h) => h !== product.handle),
  ).slice(0, 6);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const related = productsByHandles(product.relatedHandles);
  if (related.length >= limit) return related.slice(0, limit);
  return [
    ...related,
    ...getProducts().filter(
      (p) => p.collection === product.collection && p.handle !== product.handle,
    ),
  ].slice(0, limit);
}

export function cartRecommendations(handles: string[], limit = 3): Product[] {
  const inCart = new Set(handles);
  const scores = new Map<string, number>();
  for (const handle of handles) {
    const product = getProduct(handle);
    if (!product) continue;
    for (const h of [...product.completeTheSystem, ...product.relatedHandles]) {
      if (inCart.has(h)) continue;
      scores.set(h, (scores.get(h) ?? 0) + 2);
    }
  }
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([h]) => getProduct(h))
    .filter((p): p is Product => Boolean(p))
    .slice(0, limit);
}
