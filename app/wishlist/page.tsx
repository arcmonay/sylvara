"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const { items } = useWishlist();
  return (
    <div className="wrap page-hero">
      <h1>Saved</h1>
      {items.length ? (
        <ProductGrid products={items} />
      ) : (
        <p>
          Nothing saved. <Link href="/shop">Browse the floor.</Link>
        </p>
      )}
    </div>
  );
}
