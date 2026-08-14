import catalog from "@/data/catalog.json";
import type { Catalog, Collection, Product, Subcategory } from "@/lib/types";

const data = catalog as unknown as Catalog;

export function getCollections(): Collection[] {
  return data.collections;
}

export function getCollection(handle: string): Collection | undefined {
  return data.collections.find((c) => c.handle === handle);
}

export function getSubcategories(collection?: string): Subcategory[] {
  if (!collection) return data.subcategories;
  return data.subcategories.filter((s) => s.collection === collection);
}

export function getProducts(): Product[] {
  return data.products;
}

export function getProduct(handle: string): Product | undefined {
  return data.products.find((p) => p.handle === handle);
}

export function getProductsByCollection(handle: string): Product[] {
  return data.products.filter((p) => p.collection === handle);
}

export function getProductsBySubcategory(handle: string): Product[] {
  return data.products.filter((p) => p.subCategory === handle);
}

export function getFeaturedProducts(limit = 8): Product[] {
  const featured = data.products.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return data.products.slice(0, limit);
}

export function getBundles(): Product[] {
  return data.products.filter((p) => p.isBundle && p.handle !== "pro-quote");
}

export function getProProducts(): Product[] {
  return data.products.filter((p) => p.isPro);
}

export function getSeedProducts(): Product[] {
  return data.products.filter((p) => p.collection === "seeds");
}

export function productsByHandles(handles: string[]): Product[] {
  return handles
    .map((h) => getProduct(h))
    .filter((p): p is Product => Boolean(p));
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function collectionTitle(handle: string): string {
  return getCollection(handle)?.title ?? handle;
}

export function averageRating(product: Product): number {
  if (!product.reviews.length) return 0;
  return (
    product.reviews.reduce((sum, r) => sum + r.rating, 0) /
    product.reviews.length
  );
}

export function inventoryLabel(product: Product): string {
  if (product.quoteOnly) return "Quoted to order";
  if (!product.inStock || product.stockQty <= 0) return "Backordered";
  if (product.stockQty < 6) return `Low stock · ${product.stockQty} left`;
  return "In stock";
}
