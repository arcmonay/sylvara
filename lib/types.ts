export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type Faq = { q: string; a: string };

export type Review = {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type VariantOption = {
  name: string;
  values: string[];
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  promise: string;
  image: string;
};

export type Subcategory = {
  handle: string;
  title: string;
  collection: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  collection: string;
  subCategory: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  sku: string;
  vendor: string;
  brand: string;
  featured: boolean;
  tags: string[];
  inStock: boolean;
  stockQty: number;
  image: string;
  images: string[];
  photoId: string;
  weightLbs: number;
  specs: Record<string, string>;
  compatibility: string[];
  installation: string[];
  faqs: Faq[];
  reviews: Review[];
  relatedHandles: string[];
  completeTheSystem: string[];
  rightForMe: string;
  whoShouldBuy: string[];
  whatElseNeeded: string[];
  shipping: string;
  skillLevel: SkillLevel;
  growingMethods: string[];
  gardenTypes: string[];
  plants: string[];
  seasons: string[];
  problems: string[];
  goals: string[];
  searchTerms: string[];
  isBundle: boolean;
  bundleIncludes: string[];
  bundleFor: string;
  difficulty: string;
  installTime: string;
  additionalRequired: string[];
  variant: VariantOption | null;
  seedType: string | null;
  heirloom: boolean;
  organic: boolean;
  pollinator: boolean;
  indoorOutdoor: string | null;
  zones: string[];
  daysToMaturity: string | null;
  beginnerFriendly: boolean;
  isPro: boolean;
  quoteOnly: boolean;
};

export type CartLine = {
  handle: string;
  quantity: number;
  variant?: string;
};

export type SavedLine = CartLine;

export type Catalog = {
  brand: string;
  tagline: string;
  generatedAt?: string;
  collections: Collection[];
  subcategories: Subcategory[];
  products: Product[];
};
