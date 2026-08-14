import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { getProProducts } from "@/lib/products";

export const metadata = {
  title: "Pro & wholesale",
  description: "Bulk seed, commercial irrigation, greenhouse bays, and business accounts.",
};

export default function ProPage() {
  const products = getProProducts().filter((p) => p.handle !== "pro-quote");
  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Pro & wholesale</p>
      <h1>For the people who water for a living.</h1>
      <p style={{ maxWidth: "40rem", color: "var(--muted)" }}>
        Garden centers, landscapers, greenhouse operators, and farms. Retail stays on the main floor — this desk is for volume, quotes, and equipment that does not fit a hatchback.
      </p>
      <div className="hero__actions" style={{ margin: "1.2rem 0 2rem" }}>
        <Link href="/pro/quote" className="btn">
          Request a quote
        </Link>
        <Link href="/account" className="btn btn-ghost">
          Business account
        </Link>
      </div>
      <div className="goal-grid" style={{ marginBottom: "2rem" }}>
        <div className="goal-card">
          <strong>Bulk seed</strong>
          <span>Pound bags and weekly sow rates, not pretty packets.</span>
        </div>
        <div className="goal-card">
          <strong>Commercial irrigation</strong>
          <span>Multi-zone controllers, tanks, and filtration for dirty water.</span>
        </div>
        <div className="goal-card">
          <strong>Greenhouse bays</strong>
          <span>Quoted wind/snow packages. We do not pretend a 20×40 is DIY.</span>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
