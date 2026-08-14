import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { getBundles, getProduct } from "@/lib/products";
import { complementaryProducts } from "@/lib/recommendations";

export function generateStaticParams() {
  return getBundles().map((p) => ({ slug: p.handle }));
}

export default async function BundlePage({ params }: PageProps<"/bundles/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product?.isBundle) notFound();
  const extra = complementaryProducts(product, 4);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">System</p>
      <h1>{product.title}</h1>
      <p style={{ maxWidth: "40rem" }}>{product.description}</p>
      <p>
        <a href={`/shop/${product.handle}`} className="btn" style={{ marginTop: "1rem" }}>
          View full product
        </a>
      </p>
      <h2>Who it is for</h2>
      <p>{product.bundleFor}</p>
      <h2>Included</h2>
      <ul>
        {product.bundleIncludes.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <p>
        Difficulty: {product.difficulty} · Time: {product.installTime}
      </p>
      {extra.length ? (
        <>
          <h2>You may also need</h2>
          <ProductGrid products={extra} />
        </>
      ) : null}
    </div>
  );
}
