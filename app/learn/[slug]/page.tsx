import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { getGuide, getGuides } from "@/lib/guides";
import { productsByHandles } from "@/lib/products";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide" };
  return { title: guide.title, description: guide.dek };
}

export default async function GuidePage({ params }: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const products = productsByHandles(guide.products);

  return (
    <article className="wrap page-hero">
      <p className="eyebrow">
        {guide.category} · {guide.minutes} min read
      </p>
      <h1>{guide.title}</h1>
      <p style={{ fontSize: "1.15rem", maxWidth: "40rem" }}>{guide.dek}</p>
      <div className="prose">
        {guide.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
      {products.length ? (
        <section className="section">
          <div className="section__head">
            <h2>Related gear</h2>
            <Link href="/shop">Shop all</Link>
          </div>
          <ProductGrid products={products} />
        </section>
      ) : null}
    </article>
  );
}
