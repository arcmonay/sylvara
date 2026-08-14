import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { filterProducts } from "@/lib/search";
import { getSeedProducts } from "@/lib/products";

export const metadata = {
  title: "Seeds",
  description: "Heirloom, organic, native, and bulk seed for food gardens and habitat.",
};

export default async function SeedsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; zone?: string; season?: string; heirloom?: string }>;
}) {
  const params = await searchParams;
  const products = filterProducts(getSeedProducts(), {
    heirloom: params.heirloom === "1",
    season: params.season,
    zone: params.zone,
  }).filter((p) => (params.type ? p.seedType === params.type || p.subCategory.includes(params.type) : true));

  const types = [
    ["vegetable", "Vegetable"],
    ["herb", "Herb"],
    ["flower", "Flower"],
    ["fruit", "Fruit"],
    ["native", "Native"],
    ["collection", "Kits"],
  ];

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Heirloom Seed Vault</p>
      <h1>Start with seed.</h1>
      <p style={{ maxWidth: "38rem", color: "var(--muted)" }}>
        Open-pollinated food crops, pollinator forage, and bulk bags. Browse like a gardener — by plant, zone, and whether this is your first packet.
      </p>
      <div className="hero__actions" style={{ margin: "1rem 0 1.5rem" }}>
        <Link href="/seeds/vault" className="btn">
          Open the vault
        </Link>
        <Link href="/learn/how-to-save-seeds" className="btn btn-ghost">
          How to save seed
        </Link>
      </div>
      <div className="filters">
        <Link href="/seeds" className={!params.type ? "is-on" : ""}>
          All
        </Link>
        {types.map(([id, label]) => (
          <Link key={id} href={`/seeds?type=${id}`} className={params.type === id ? "is-on" : ""}>
            {label}
          </Link>
        ))}
        <Link href="/seeds?heirloom=1" className={params.heirloom === "1" ? "is-on" : ""}>
          Heirloom
        </Link>
        <Link href="/seeds?season=spring">Spring</Link>
        <Link href="/seeds?season=summer">Summer</Link>
        <Link href="/seeds?zone=5">Zone 5</Link>
        <Link href="/seeds?zone=6">Zone 6</Link>
        <Link href="/seeds?zone=7">Zone 7</Link>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
