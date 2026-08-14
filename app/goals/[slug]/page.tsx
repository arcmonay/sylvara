import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { GOALS } from "@/lib/nav";
import { getProducts } from "@/lib/products";

export function generateStaticParams() {
  return GOALS.map((g) => ({ slug: g.slug }));
}

export default async function GoalPage({ params }: PageProps<"/goals/[slug]">) {
  const { slug } = await params;
  const goal = GOALS.find((g) => g.slug === slug);
  if (!goal) notFound();
  const products = getProducts()
    .filter((p) => p.goals.includes(slug) || p.tags.includes(slug))
    .slice(0, 16);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Shop by goal</p>
      <h1>{goal.title}</h1>
      <p style={{ maxWidth: "38rem", color: "var(--muted)" }}>{goal.description}</p>
      <div style={{ marginTop: "2rem" }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
