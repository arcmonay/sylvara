import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { filterProducts } from "@/lib/search";
import { getSeedProducts } from "@/lib/products";

export const metadata = {
  title: "Heirloom Seed Vault",
  description: "A library of open-pollinated seed for food and genetic diversity.",
};

export default function SeedVaultPage() {
  const vault = filterProducts(getSeedProducts(), { heirloom: true });
  const kits = getSeedProducts().filter((p) => p.subCategory === "seed-kits");

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">The vault</p>
      <h1>A tin, not a trend.</h1>
      <div className="prose">
        <p>
          Heirloom seed is open-pollinated seed with a memory. You can save it, share it, and eat the same tomato next year. The vault is how HarvestHome keeps that library from turning into a junk drawer of unlabeled packets.
        </p>
        <p>
          Cool, dark, dated. That is the whole storage lecture. What you grow from it is how genetic diversity stays on dinner plates instead of in a gene bank you will never visit.
        </p>
      </div>
      <p style={{ margin: "1.2rem 0" }}>
        <Link href="/learn/what-are-heirloom-seeds">What are heirloom seeds?</Link>
        {" · "}
        <Link href="/learn/how-to-save-seeds">How to save seeds</Link>
      </p>
      <h2>Collections</h2>
      <ProductGrid products={kits} />
      <h2 style={{ marginTop: "2.5rem" }}>Open-pollinated packets</h2>
      <ProductGrid products={vault} />
    </div>
  );
}
