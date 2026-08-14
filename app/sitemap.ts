import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/guides";
import { getCollections, getProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://harvesthome.garden";
  const staticPaths = [
    "",
    "/shop",
    "/seeds",
    "/seeds/vault",
    "/bundles",
    "/learn",
    "/find",
    "/irrigation-builder",
    "/pro",
    "/cart",
    "/about",
  ];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...getCollections().map((c) => ({ url: `${base}/collections/${c.handle}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...getProducts().map((p) => ({ url: `${base}/shop/${p.handle}`, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...getGuides().map((g) => ({ url: `${base}/learn/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
