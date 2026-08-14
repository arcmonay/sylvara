import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { STYLES } from "@/lib/nav";
import { getProducts } from "@/lib/products";

export function generateStaticParams() {
  return STYLES.map((s) => ({ slug: s.slug }));
}

export default async function StylePage({ params }: PageProps<"/styles/[slug]">) {
  const { slug } = await params;
  const style = STYLES.find((s) => s.slug === slug);
  if (!style) notFound();
  const products = getProducts()
    .filter(
      (p) =>
        p.gardenTypes.includes(slug) ||
        p.growingMethods.includes(slug) ||
        (slug === "hydroponic" && p.collection === "hydroponics"),
    )
    .slice(0, 16);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Growing style</p>
      <h1>{style.title}</h1>
      <p style={{ maxWidth: "38rem", color: "var(--muted)" }}>{style.description}</p>
      <div style={{ marginTop: "2rem" }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
