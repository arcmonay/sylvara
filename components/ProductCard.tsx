import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { formatMoney } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/shop/${product.handle}`} className="product-card__media">
        <ProductVisual product={product} className="absolute inset-0" />
        {product.isBundle ? (
          <span className="pill" style={{ position: "absolute", top: 10, left: 10 }}>
            System
          </span>
        ) : null}
      </Link>
      <div className="product-card__body">
        <Link href={`/shop/${product.handle}`} className="product-card__name">
          {product.title}
        </Link>
        <p className="product-card__price">
          {product.quoteOnly ? "Request quote" : formatMoney(product.price)}
          {product.compareAtPrice ? (
            <span className="product-card__compare">{formatMoney(product.compareAtPrice)}</span>
          ) : null}
        </p>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
