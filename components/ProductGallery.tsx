"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const images = (product.images?.length ? product.images : [product.image]).filter(Boolean);
  const [active, setActive] = useState(0);
  const src = images[active] || product.image;

  return (
    <div className="pdp-gallery">
      <div className="visual" style={{ minHeight: "28rem" }}>
        <Image
          src={src}
          alt={product.title}
          fill
          unoptimized
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 ? (
        <div className="pdp-thumbs">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Photo ${index + 1}`}
            >
              <Image src={image} alt="" fill unoptimized className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
