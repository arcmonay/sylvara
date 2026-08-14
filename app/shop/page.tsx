import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { filterProducts } from "@/lib/search";
import { getCollections, getProducts, getSubcategories } from "@/lib/products";

type Props = {
  searchParams: Promise<{
    sub?: string;
    skill?: string;
    collection?: string;
    beginner?: string;
    bundles?: string;
  }>;
};

export const metadata = {
  title: "Shop all growing",
  description: "Hydroponics, seeds, irrigation, greenhouses, and habitat — the full HarvestHome floor.",
};

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const collections = getCollections();
  const products = filterProducts(getProducts(), {
    collection: params.collection,
    subCategory: params.sub,
    skill: params.skill,
    beginner: params.beginner === "1",
    bundles: params.bundles === "1",
  });
  const subs = getSubcategories(params.collection);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">The floor</p>
      <h1>Shop all growing</h1>
      <p style={{ maxWidth: "36rem", color: "var(--muted)" }}>
        {products.length} products. Filter by the job you are doing, not by whether you already know the acronyms.
      </p>
      <div className="filters">
        <Link href="/shop" className={!params.collection && !params.sub ? "is-on" : ""}>
          All
        </Link>
        {collections.map((c) => (
          <Link
            key={c.handle}
            href={`/shop?collection=${c.handle}`}
            className={params.collection === c.handle ? "is-on" : ""}
          >
            {c.title}
          </Link>
        ))}
        <Link href="/shop?beginner=1" className={params.beginner === "1" ? "is-on" : ""}>
          Beginner-friendly
        </Link>
        <Link href="/shop?bundles=1" className={params.bundles === "1" ? "is-on" : ""}>
          Complete systems
        </Link>
      </div>
      {subs.length ? (
        <div className="filters">
          {subs.slice(0, 24).map((s) => (
            <Link
              key={s.handle}
              href={`/shop?collection=${s.collection}&sub=${s.handle}`}
              className={params.sub === s.handle ? "is-on" : ""}
            >
              {s.title}
            </Link>
          ))}
        </div>
      ) : null}
      <ProductGrid products={products} />
    </div>
  );
}
