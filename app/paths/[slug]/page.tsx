import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { PATHS } from "@/lib/nav";
import { getBundles, getHighTicketProducts, getProducts, getProductsByCollection, getSeedProducts } from "@/lib/products";

const MAP: Record<string, () => ReturnType<typeof getProducts>> = {
  new: () => getProducts().filter((p) => p.beginnerFriendly && (p.isBundle || p.featured)),
  "food-at-home": () => getBundles().filter((p) => p.goals.includes("grow-food") || p.collection === "growing-systems"),
  greenhouse: () => getProductsByCollection("greenhouses"),
  "save-water": () => getProductsByCollection("irrigation"),
  indoors: () => getProductsByCollection("indoor-growing"),
  serious: () => {
    const high = getHighTicketProducts(16);
    const rest = getProducts().filter((p) => p.isPro || p.skillLevel === "advanced");
    const seen = new Set(high.map((p) => p.handle));
    return [...high, ...rest.filter((p) => !seen.has(p.handle) && p.handle !== "pro-quote")];
  },
  heirloom: () => getSeedProducts(),
  habitat: () => getProductsByCollection("backyard-wildlife"),
};

export function generateStaticParams() {
  return PATHS.map((p) => ({ slug: p.slug }));
}

export default async function PathPage({ params }: PageProps<"/paths/[slug]">) {
  const { slug } = await params;
  const path = PATHS.find((p) => p.slug === slug);
  if (!path) notFound();
  const products = (MAP[slug] || getProducts)().filter((p) => p.handle !== "pro-quote").slice(0, slug === "serious" ? 24 : 16);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Start here</p>
      <h1>{path.title}</h1>
      <p style={{ maxWidth: "38rem", color: "var(--muted)" }}>{path.description}</p>
      <div style={{ marginTop: "2rem" }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
