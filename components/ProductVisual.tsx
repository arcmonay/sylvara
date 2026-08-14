import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductVisual({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const src = product.image || `/products/${product.handle}.webp`;
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[var(--bg-deep)] ${className}`.trim()}>
      <Image
        src={src}
        alt={product.title}
        fill
        unoptimized
        sizes="(max-width: 768px) 90vw, 50vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
