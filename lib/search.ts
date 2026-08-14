import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

const PLANT_ALIASES: Record<string, string[]> = {
  tomato: ["tomato", "tomatoes", "brandywine", "cherry tomato", "beefsteak", "solanum"],
  lettuce: ["lettuce", "salad", "greens", "leafy"],
  basil: ["basil", "pesto", "herb"],
  pepper: ["pepper", "peppers", "capsicum", "chile"],
  cucumber: ["cucumber", "cukes"],
  carrot: ["carrot", "carrots"],
  bean: ["bean", "beans"],
  kale: ["kale", "lacinato"],
  sunflower: ["sunflower", "sunflowers"],
  strawberry: ["strawberry", "strawberries"],
  watermelon: ["watermelon", "melon"],
  milkweed: ["milkweed", "monarch", "asclepias"],
  zinnia: ["zinnia", "pollinator"],
};

const PROBLEM_ALIASES: Record<string, string[]> = {
  drought: ["drought", "dry", "water bill", "save water", "wilt"],
  pests: ["aphid", "aphids", "whitefly", "pest", "bugs"],
  "low-light": ["dark", "winter", "no sun", "indoor light", "grow light"],
  "small-space": ["apartment", "balcony", "patio", "small space", "no yard"],
  beginner: ["beginner", "first time", "starter", "new to growing", "easy"],
};

function haystack(product: Product): string {
  return [
    product.title,
    product.description,
    product.collection,
    product.subCategory,
    product.brand,
    product.rightForMe,
    product.seedType,
    ...product.tags,
    ...product.plants,
    ...product.searchTerms,
    ...product.goals,
    ...product.problems,
    ...product.gardenTypes,
    ...product.growingMethods,
    ...product.whoShouldBuy,
  ]
    .join(" ")
    .toLowerCase();
}

function expandQuery(query: string): string[] {
  const q = query.trim().toLowerCase();
  const parts = q.split(/[^a-z0-9+]+/).filter(Boolean);
  const extra: string[] = [];
  for (const [key, aliases] of Object.entries(PLANT_ALIASES)) {
    if (aliases.some((a) => q.includes(a))) extra.push(key, ...aliases);
  }
  for (const aliases of Object.values(PROBLEM_ALIASES)) {
    if (aliases.some((a) => q.includes(a))) extra.push(...aliases);
  }
  return [...new Set([q, ...parts, ...extra])];
}

export type SearchHit = {
  product: Product;
  score: number;
  reasons: string[];
};

export function searchProducts(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return getProducts().map((product) => ({ product, score: 0, reasons: [] }));
  }
  const terms = expandQuery(q);
  const hits: SearchHit[] = [];

  for (const product of getProducts()) {
    if (product.handle === "pro-quote") continue;
    const hay = haystack(product);
    let score = 0;
    const reasons: string[] = [];

    if (product.title.toLowerCase().includes(q)) {
      score += 12;
      reasons.push("Title match");
    }
    for (const term of terms) {
      if (product.plants.some((p) => p.includes(term) || term.includes(p))) {
        score += 8;
        reasons.push(`Grows with ${product.plants[0] || term}`);
      }
      if (product.searchTerms.some((s) => s.includes(term))) score += 5;
      if (product.tags.some((t) => t.includes(term))) score += 3;
      if (hay.includes(term)) score += 1;
    }
    if (q.includes("tomato") && product.collection === "seeds" && product.plants.includes("tomato")) {
      score += 6;
      reasons.push("Tomato seed");
    }
    if (q.includes("tomato") && product.handle.includes("cage")) {
      score += 7;
      reasons.push("Tomato support");
    }
    if (q.includes("tomato") && product.growingMethods.includes("hydroponic") && product.plants.includes("tomato")) {
      score += 6;
      reasons.push("Hydroponic tomato system");
    }
    if ((q.includes("water") || q.includes("drip") || q.includes("drought")) && product.collection === "irrigation") {
      score += 5;
      reasons.push("Watering & conservation");
    }
    if (score > 0) hits.push({ product, score, reasons: [...new Set(reasons)].slice(0, 3) });
  }

  return hits.sort((a, b) => b.score - a.score);
}

export function filterProducts(
  products: Product[],
  filters: {
    collection?: string;
    subCategory?: string;
    skill?: string;
    gardenType?: string;
    goal?: string;
    inStock?: boolean;
    beginner?: boolean;
    heirloom?: boolean;
    organic?: boolean;
    pollinator?: boolean;
    indoorOutdoor?: string;
    zone?: string;
    season?: string;
    maxPrice?: number;
    bundles?: boolean;
    pro?: boolean;
  },
): Product[] {
  return products.filter((p) => {
    if (p.handle === "pro-quote" && !filters.pro) return false;
    if (filters.collection && p.collection !== filters.collection) return false;
    if (filters.subCategory && p.subCategory !== filters.subCategory) return false;
    if (filters.skill && p.skillLevel !== filters.skill) return false;
    if (filters.gardenType && !p.gardenTypes.includes(filters.gardenType)) return false;
    if (filters.goal && !p.goals.includes(filters.goal) && !p.tags.includes(filters.goal)) return false;
    if (filters.inStock && !p.inStock) return false;
    if (filters.beginner && !p.beginnerFriendly) return false;
    if (filters.heirloom && !p.heirloom) return false;
    if (filters.organic && !p.organic) return false;
    if (filters.pollinator && !p.pollinator) return false;
    if (filters.indoorOutdoor && p.indoorOutdoor && p.indoorOutdoor !== filters.indoorOutdoor && p.indoorOutdoor !== "both") {
      return false;
    }
    if (filters.zone && p.zones.length && !p.zones.includes(filters.zone)) return false;
    if (filters.season && p.seasons.length && !p.seasons.includes(filters.season)) return false;
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (filters.bundles && !p.isBundle) return false;
    if (filters.pro && !p.isPro) return false;
    return true;
  });
}
