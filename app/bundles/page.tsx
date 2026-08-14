import { ProductGrid } from "@/components/ProductCard";
import { getBundles } from "@/lib/products";

export const metadata = {
  title: "Complete growing systems",
  description: "Bundled kits that answer what you actually need to grow food at home.",
};

export default function BundlesPage() {
  const bundles = getBundles();
  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Systems</p>
      <h1>Complete growing systems</h1>
      <p style={{ maxWidth: "40rem", color: "var(--muted)" }}>
        Each kit says who it is for, what is in the box, what you still need, and how long setup takes. That is the difference between a store and a parts bin.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <ProductGrid products={bundles} />
      </div>
    </div>
  );
}
