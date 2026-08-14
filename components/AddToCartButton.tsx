"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const [variant, setVariant] = useState(product.variant?.values[0] ?? "");
  const [added, setAdded] = useState(false);

  if (product.quoteOnly) {
    return (
      <a href="/pro/quote" className="btn">
        Request a quote
      </a>
    );
  }

  return (
    <div style={{ display: "grid", gap: "0.7rem", marginTop: "1rem" }}>
      {product.variant ? (
        <label className="form" style={{ maxWidth: "16rem" }}>
          {product.variant.name}
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            {product.variant.values.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            addItem(product.handle, 1, variant || undefined);
            setAdded(true);
          }}
        >
          {added ? "Added to cart" : "Add to cart"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => toggle(product.handle)}
        >
          {has(product.handle) ? "Saved" : "Save for later"}
        </button>
      </div>
    </div>
  );
}
