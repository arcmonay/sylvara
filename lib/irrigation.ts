import { getProduct } from "@/lib/products";
import type { Product } from "@/lib/types";

export type IrrigationAnswers = {
  size: string;
  beds: string;
  source: string;
  distance: string;
  automation: string;
};

export const IRRIGATION_STEPS: {
  key: keyof IrrigationAnswers;
  question: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "size",
    question: "How large is the garden?",
    options: [
      { value: "tiny", label: "Containers / under 50 sq ft" },
      { value: "small", label: "One or two beds (up to 100 sq ft)" },
      { value: "medium", label: "A typical backyard plot" },
      { value: "large", label: "Greenhouse or 400+ sq ft" },
      { value: "acre", label: "An acre, estate, or farm block" },
    ],
  },
  {
    key: "beds",
    question: "How many beds or zones?",
    options: [
      { value: "1", label: "One bed or one container group" },
      { value: "2", label: "Two beds" },
      { value: "3-plus", label: "Three or more zones" },
    ],
  },
  {
    key: "source",
    question: "What’s the water source?",
    options: [
      { value: "spigot", label: "Hose bib / city water" },
      { value: "well", label: "Well water" },
      { value: "rain", label: "Rain barrel or tank" },
      { value: "greenhouse", label: "Greenhouse header" },
    ],
  },
  {
    key: "distance",
    question: "How far is the garden from the water?",
    options: [
      { value: "close", label: "Under 25 feet" },
      { value: "mid", label: "25–75 feet" },
      { value: "far", label: "More than 75 feet" },
    ],
  },
  {
    key: "automation",
    question: "How automated should it be?",
    options: [
      { value: "manual", label: "I’ll turn a valve" },
      { value: "timer", label: "A simple timer" },
      { value: "smart", label: "Weather-aware controller" },
    ],
  },
];

export type IrrigationPlan = {
  title: string;
  summary: string;
  products: Product[];
  notes: string[];
};

export function buildIrrigationPlan(a: IrrigationAnswers): IrrigationPlan {
  const handles: string[] = [];
  const notes: string[] = [];
  let title = "A drip system for a home garden";
  let summary = "Filter, regulate, drip, and a timer. Water the roots; stop watering the walk.";

  if (a.size === "tiny") {
    handles.push("balcony-food-garden", "emitter-pack", "watering-can-8");
    title = "Container watering";
    summary = "A watering can plus a small drip rail if you have a spigot on the balcony.";
  } else if (a.beds === "2" || a.size === "small") {
    handles.push("raised-bed-irrigation-kit");
    title = "Two-bed drip";
    summary = "A manifold and drip line sized for a pair of 4×8s.";
  } else if (a.size === "acre") {
    handles.push("acre-drip-package", "zone-12-controller", "filter-station-2inch");
    title = "A one-acre drip system";
    summary = "Mainline, zones, and filtration for a food block — not a backyard starter kit.";
    notes.push("We will want a site sketch before freight. The package assumes a roughly rectangular acre.");
  } else if (a.size === "large" || a.source === "greenhouse") {
    handles.push("gh-drip-kit", "garden-irrigation-kit");
    title = "Greenhouse and plot irrigation";
    summary = "Separate the greenhouse zone from the outdoor beds so they can run on different schedules.";
  } else {
    handles.push("drip-starter-50");
  }

  if (a.automation === "timer") handles.push("garden-timer-mechanical");
  if (a.automation === "smart") handles.push("smart-irrigation-controller");
  if (a.automation === "manual") notes.push("You can add a timer later without redoing the line.");

  if (a.source === "spigot") {
    handles.push("pressure-regulator", "disc-filter");
    notes.push("City pressure is usually too high for drip. The regulator is not optional.");
  }
  if (a.source === "well") {
    handles.push("canister-filter", "disc-filter", "pressure-regulator");
    if (a.size === "acre" || a.size === "large") {
      handles.push("well-pump-irrigation", "filter-station-2inch", "vfd-pump-skid");
    }
    notes.push("Well grit clogs emitters. Filter first, then regulate, then drip.");
  }
  if (a.source === "rain") {
    handles.push("rain-barrel-50", "transfer-pump", "disc-filter");
    if (a.size === "acre" || a.size === "large") {
      handles.push("cistern-1000", "vfd-pump-skid");
    }
    notes.push("Gravity from a barrel rarely runs emitters. Budget a pump.");
  }

  if (a.distance === "mid") handles.push("irrigation-tube-100");
  if (a.distance === "far") {
    handles.push("irrigation-tube-100", "connector-assortment");
    notes.push("Measure the run. Kits assume the garden is near the house — most are not.");
  }

  if (a.beds === "3-plus") {
    handles.push("smart-irrigation-controller", "connector-assortment");
    notes.push("Three zones want a controller, not a stack of mechanical timers.");
  }

  if (a.automation === "timer" && !handles.includes("automatic-watering-kit") && a.size !== "tiny") {
    handles.unshift("automatic-watering-kit");
    title = "Automatic garden watering";
    summary = "Timer, filter, regulator, and drip in one kit — then extend the mainline if you need the distance.";
  }

  const products = [...new Set(handles)]
    .map((h) => getProduct(h))
    .filter((p): p is Product => Boolean(p));

  return { title, summary, products, notes };
}
