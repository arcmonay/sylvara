import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/search";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const hits = searchProducts(q).slice(0, 36);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Search</p>
      <h1>{q ? `Results for “${q}”` : "Search the garden"}</h1>
      <p style={{ color: "var(--muted)", maxWidth: "36rem" }}>
        Try a plant (tomato), a problem (drought), a place (balcony), or a skill (beginner). We rank like a garden desk, not a SKU dump.
      </p>
      {!q ? (
        <p style={{ marginTop: "1rem" }}>Type a query in the header.</p>
      ) : hits.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>Nothing matched. Try “lettuce”, “drip”, or “greenhouse”.</p>
      ) : (
        <div className="product-grid" style={{ marginTop: "1.5rem" }}>
          {hits.map((hit) => (
            <div key={hit.product.id}>
              <ProductCard product={hit.product} />
              {hit.reasons.length ? (
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.35rem" }}>
                  {hit.reasons.join(" · ")}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
