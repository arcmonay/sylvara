import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";
import {
  averageRating,
  formatMoney,
  getCollection,
  getProduct,
  getProducts,
  inventoryLabel,
} from "@/lib/products";
import { complementaryProducts, completeTheSystem, relatedProducts } from "@/lib/recommendations";

export function generateStaticParams() {
  return getProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[handle]">) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Product" };
  return { title: product.title, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/shop/[handle]">) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const collection = getCollection(product.collection);
  const related = relatedProducts(product, 4);
  const extras = completeTheSystem(product);
  const complement = complementaryProducts(product, 4);
  const rating = averageRating(product);
  const stock = inventoryLabel(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.sku,
    brand: product.brand,
    image: product.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="pdp">
        <div className="pdp-gallery">
          <div className="visual" style={{ minHeight: "28rem" }}>
            <ProductVisual product={product} priority className="absolute inset-0" />
          </div>
        </div>
        <div className="pdp-buy">
          <p className="pdp-collection">
            {collection ? (
              <Link href={`/collections/${collection.handle}`}>{collection.title}</Link>
            ) : (
              "HarvestHome"
            )}
          </p>
          <h1>{product.title}</h1>
          <p className="pdp-price">
            {product.quoteOnly ? "Quoted to order" : formatMoney(product.price)}
            {product.compareAtPrice ? (
              <span className="product-card__compare">{formatMoney(product.compareAtPrice)}</span>
            ) : null}
          </p>
          <p className={stock.includes("Low") ? "stock-low" : "stock-ok"}>{stock}</p>
          <p className="pdp-copy">{product.description}</p>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
            {product.shipping} · Ships from the Hudson Valley
          </p>
          <AddToCartButton product={product} />
          <ul className="spec-list">
            {Object.entries(product.specs).map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
            <li>
              <span>SKU</span>
              <strong>{product.sku}</strong>
            </li>
            <li>
              <span>Skill</span>
              <strong>{product.skillLevel}</strong>
            </li>
          </ul>
          <div className="callout">
            <h2>Is this right for me?</h2>
            <p>{product.rightForMe}</p>
            <ul className="need-list">
              {product.whoShouldBuy.map((w) => (
                <li key={w}>· {w}</li>
              ))}
            </ul>
          </div>
          <div className="callout">
            <h2>What else will I need?</h2>
            <ul className="need-list">
              {product.whatElseNeeded.map((w) => (
                <li key={w}>· {w}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {product.isBundle ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2>What it includes</h2>
          <ul>
            {product.bundleIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            For {product.bundleFor}. Setup: {product.difficulty} · {product.installTime}.
          </p>
          {product.additionalRequired.length ? (
            <p>You still need: {product.additionalRequired.join("; ")}.</p>
          ) : null}
        </section>
      ) : null}

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>How to set it up</h2>
        <ol>
          {product.installation.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3>Compatibility</h3>
        <ul>
          {product.compatibility.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {extras.length ? (
        <section className="section section--linen">
          <div className="section__head">
            <h2>Complete the system</h2>
          </div>
          <ProductGrid products={extras} />
        </section>
      ) : null}

      <section className="section">
        <h2>Questions</h2>
        <div className="faq">
          {product.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>
          Reviews {rating ? `· ${rating.toFixed(1)}` : ""}
        </h2>
        {product.reviews.map((r) => (
          <div key={r.name + r.date} className="review">
            <strong>{r.title}</strong>
            <p style={{ margin: "0.2rem 0", color: "var(--muted)", fontSize: "0.9rem" }}>
              {r.name} · {r.location} · {r.rating}/5 · {r.date}
            </p>
            <p>{r.body}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Related</h2>
        </div>
        <ProductGrid products={related.length ? related : complement} />
      </section>
    </div>
  );
}
