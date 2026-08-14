import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { getCollection, getCollections, getProductsByCollection } from "@/lib/products";

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.handle }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const products = getProductsByCollection(slug).filter((p) => p.handle !== "pro-quote");

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Collection</p>
      <h1>{collection.title}</h1>
      <p style={{ maxWidth: "40rem", color: "var(--muted)" }}>{collection.description}</p>
      <p style={{ color: "var(--accent)", fontWeight: 650 }}>{collection.promise}</p>
      <div style={{ marginTop: "2rem" }}>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
