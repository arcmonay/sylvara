"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/lib/cart-context";
import { cartRecommendations } from "@/lib/recommendations";
import { formatMoney } from "@/lib/products-client";
import { ProductCard } from "@/components/ProductCard";

export function CartView() {
  const { items, savedItems, subtotal, setQuantity, removeItem, saveForLater, moveToCart, removeSaved } =
    useCart();
  const recs = cartRecommendations(items.map((i) => i.product.handle));

  if (!items.length && !savedItems.length) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link href="/shop" className="btn" style={{ marginTop: "1.2rem" }}>
          Continue growing
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div>
        {items.map(({ product, quantity, variant }) => (
          <div key={product.handle + (variant ?? "")} className="cart-line">
            <ProductVisual product={product} className="aspect-square rounded-[0.8rem]" />
            <div>
              <Link href={`/shop/${product.handle}`} className="product-card__name">
                {product.title}
              </Link>
              {variant ? <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{variant}</p> : null}
              <p>{formatMoney(product.price)}</p>
              <label style={{ fontSize: "0.88rem" }}>
                Qty{" "}
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(product.handle, Number(e.target.value), variant)}
                  style={{ width: "3.5rem", marginLeft: "0.3rem" }}
                />
              </label>
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.4rem", fontSize: "0.85rem" }}>
                <button type="button" onClick={() => saveForLater(product.handle, variant)}>
                  Save for later
                </button>
                <button type="button" onClick={() => removeItem(product.handle, variant)}>
                  Remove
                </button>
              </div>
            </div>
            <p className="hidden sm:block">{formatMoney(product.price * quantity)}</p>
          </div>
        ))}
        {savedItems.length ? (
          <div style={{ marginTop: "2rem" }}>
            <h2>Saved for later</h2>
            {savedItems.map(({ product, variant }) => (
              <div key={product.handle + "saved"} className="cart-line">
                <ProductVisual product={product} className="aspect-square rounded-[0.8rem]" />
                <div>
                  <Link href={`/shop/${product.handle}`}>{product.title}</Link>
                  <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.4rem" }}>
                    <button type="button" onClick={() => moveToCart(product.handle, variant)}>
                      Move to cart
                    </button>
                    <button type="button" onClick={() => removeSaved(product.handle, variant)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {recs.length ? (
          <div style={{ marginTop: "2rem" }}>
            <h2>Complete the order</h2>
            <div className="product-grid">
              {recs.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <aside className="summary">
        <p className="eyebrow">Summary</p>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0.8rem 0" }}>
          <span>Subtotal</span>
          <strong>{formatMoney(subtotal)}</strong>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
          Shipping, pickup, discounts, and gift cards are calculated at checkout. Until Shopify credentials are set, checkout stays on this site.
        </p>
        <Link href="/checkout" className="btn" style={{ width: "100%", marginTop: "1rem" }}>
          Checkout
        </Link>
      </aside>
    </div>
  );
}
