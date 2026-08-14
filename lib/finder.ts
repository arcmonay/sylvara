import { getProduct, getProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

export type FinderAnswers = {
  grow: string;
  where: string;
  space: string;
  experience: string;
  automation: string;
  budget: string;
};

export const FINDER_STEPS: {
  key: keyof FinderAnswers;
  question: string;
  options: { value: string; label: string; hint: string }[];
}[] = [
  {
    key: "grow",
    question: "What do you want to grow?",
    options: [
      { value: "vegetables", label: "Vegetables", hint: "Tomatoes, greens, peppers" },
      { value: "herbs", label: "Herbs", hint: "Basil, cilantro, kitchen leaves" },
      { value: "mixed-food", label: "A bit of everything edible", hint: "The household plot" },
      { value: "flowers-habitat", label: "Flowers & pollinators", hint: "Bees, birds, color" },
      { value: "year-round-greens", label: "Salad greens year-round", hint: "Indoor or hydroponic" },
    ],
  },
  {
    key: "where",
    question: "Where are you growing it?",
    options: [
      { value: "indoor", label: "Indoors", hint: "Shelf, spare room, tent" },
      { value: "balcony", label: "Balcony or patio", hint: "Containers and railing" },
      { value: "backyard", label: "Backyard beds", hint: "Soil and sun" },
      { value: "greenhouse", label: "A greenhouse", hint: "You have (or want) a house" },
      { value: "hydroponic", label: "In water / hydroponic", hint: "Reservoirs and channels" },
    ],
  },
  {
    key: "space",
    question: "How much space do you have?",
    options: [
      { value: "tiny", label: "A counter or a corner", hint: "Under 10 sq ft" },
      { value: "small", label: "A balcony or a 4×8", hint: "One serious bed" },
      { value: "medium", label: "A typical backyard plot", hint: "A few beds" },
      { value: "large", label: "A greenhouse or many beds", hint: "You are in it" },
    ],
  },
  {
    key: "experience",
    question: "How experienced are you?",
    options: [
      { value: "beginner", label: "New to growing", hint: "Tell me what I need" },
      { value: "intermediate", label: "I’ve grown a season or two", hint: "I want a better system" },
      { value: "advanced", label: "Serious grower", hint: "Show me the equipment" },
    ],
  },
  {
    key: "automation",
    question: "How much automation do you want?",
    options: [
      { value: "none", label: "I’ll water by hand", hint: "Simple tools" },
      { value: "some", label: "A timer would help", hint: "Set it and check it" },
      { value: "lots", label: "Make it run without me", hint: "Controllers and drip" },
    ],
  },
  {
    key: "budget",
    question: "What’s your approximate budget?",
    options: [
      { value: "under-100", label: "Under $100", hint: "Seed, tools, a starter kit" },
      { value: "100-400", label: "$100–$400", hint: "A complete small system" },
      { value: "400-1500", label: "$400–$1,500", hint: "Beds, lights, irrigation" },
      { value: "1500-plus", label: "$1,500+", hint: "Greenhouse, production room, or acre drip" },
    ],
  },
];

const BUDGET_MAX: Record<string, number> = {
  "under-100": 100,
  "100-400": 400,
  "400-1500": 1500,
  "1500-plus": 100000,
};

export type FinderResult = {
  headline: string;
  summary: string;
  system: Product | undefined;
  products: Product[];
};

export function runFinder(answers: FinderAnswers): FinderResult {
  const max = BUDGET_MAX[answers.budget] ?? 1500;
  let systemHandle = "first-time-vegetable-garden";
  let headline = "A backyard food plot";
  let summary =
    "Start with a bed, seed, and a way to water it. Everything else is optional until the first harvest.";

  if (answers.budget === "1500-plus" && answers.where === "indoor") {
    systemHandle = "production-room-bundle";
    headline = "An indoor production room";
    summary = "A sealed tent, production LED, climate stack, and recirculating DWC — food at room scale.";
  } else if (answers.budget === "1500-plus" && answers.where === "hydroponic") {
    systemHandle = "rdwc-24-site";
    headline = "A recirculating production line";
    summary = "Twenty-four DWC sites, a stainless tank, and the lights a room actually needs.";
  } else if (answers.where === "indoor" || answers.space === "tiny") {
    systemHandle = answers.grow === "year-round-greens" ? "backyard-hydroponics-starter" : "indoor-herb-garden";
    headline = "An indoor kitchen garden";
    summary = "A lit shelf and herbs (or a small DWC) will feed you without a yard.";
  } else if (answers.where === "balcony") {
    systemHandle = "balcony-food-garden";
    headline = "A balcony food garden";
    summary = "Containers, cherry tomatoes, and herbs. Keep the landlord’s deck dry with saucers.";
  } else if (answers.where === "hydroponic" || answers.grow === "year-round-greens") {
    systemHandle = "backyard-hydroponics-starter";
    headline = "A hydroponic greens system";
    summary = "Deep water culture, a light, and a pH pen. Lettuce in weeks, not months.";
  } else if (answers.where === "greenhouse") {
    systemHandle = answers.budget === "1500-plus" ? "greenhouse-starter-package" : "gh-drip-kit";
    headline = answers.budget === "1500-plus" ? "A working backyard greenhouse" : "Equip the house you have";
    summary =
      answers.budget === "1500-plus"
        ? "Structure, benches, vents, and irrigation as one package."
        : "If the house already exists, start with drip, vents, and a thermometer.";
  } else if (answers.grow === "flowers-habitat") {
    systemHandle = "pollinator-garden-kit";
    headline = "A pollinator patch";
    summary = "Seed, a bee hotel, and a map. Habitat is a planting, not a poster.";
  } else if (answers.budget === "1500-plus" && answers.space === "large" && answers.where === "backyard") {
    systemHandle = "acre-drip-package";
    headline = "A production water system";
    summary = "Acre drip, filtration, and a controller. Measure the block before you order freight.";
  } else if (answers.budget === "1500-plus" && answers.where === "backyard") {
    systemHandle = "self-sufficient-backyard";
    headline = "A closed-loop backyard";
    summary = "Food, water harvest, compost, and habitat — the long game in one package.";
  } else if (answers.experience === "advanced") {
    systemHandle = "year-round-food-system";
    headline = "A four-season system";
    summary = "Indoor starts, summer beds, and greens in water. Built for people who already garden.";
  }

  const system = getProduct(systemHandle);
  const scored = getProducts()
    .filter((p) => p.handle !== "pro-quote" && p.price <= max)
    .map((p) => {
      let score = 0;
      if (answers.where && p.gardenTypes.includes(answers.where)) score += 4;
      if (answers.where === "hydroponic" && p.growingMethods.includes("hydroponic")) score += 5;
      if (answers.experience === "beginner" && p.beginnerFriendly) score += 3;
      if (answers.experience === "advanced" && p.skillLevel === "advanced") score += 3;
      if (answers.automation === "lots" && (p.tags.includes("automation") || p.tags.includes("timer") || p.tags.includes("smart"))) {
        score += 4;
      }
      if (answers.grow === "herbs" && p.plants.includes("herbs")) score += 4;
      if (answers.grow === "vegetables" && (p.plants.includes("tomato") || p.collection === "seeds")) score += 2;
      if (answers.grow === "flowers-habitat" && (p.pollinator || p.collection === "backyard-wildlife")) score += 5;
      if (p.isBundle) score += 2;
      if (p.featured) score += 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);

  const products: Product[] = [];
  if (system && system.price <= max) products.push(system);
  for (const p of scored) {
    if (products.length >= 8) break;
    if (!products.some((x) => x.handle === p.handle)) products.push(p);
  }

  return { headline, summary, system, products };
}
