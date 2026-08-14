export type Discount = {
  code: string;
  label: string;
  percent?: number;
  amount?: number;
  freeShipping?: boolean;
  collection?: string;
};

export const DISCOUNTS: Discount[] = [
  { code: "GREENER10", label: "10% off your order", percent: 10 },
  { code: "SEEDVAULT", label: "15% off seed", percent: 15, collection: "seeds" },
  { code: "WELCOME15", label: "15% off first order", percent: 15 },
  { code: "FREESHIP", label: "Free standard shipping", freeShipping: true },
  { code: "POLLINATOR", label: "10% off habitat goods", percent: 10, collection: "backyard-wildlife" },
];

export const GIFT_CARDS: Record<string, number> = {
  "HARVEST-GIFT-25": 25,
  "HARVEST-GIFT-50": 50,
  "HARVEST-GIFT-100": 100,
};

export function findDiscount(code: string): Discount | undefined {
  return DISCOUNTS.find((d) => d.code === code.trim().toUpperCase());
}

export function giftCardValue(code: string): number {
  return GIFT_CARDS[code.trim().toUpperCase()] ?? 0;
}

export const SHIPPING = {
  threshold: 75,
  standard: 8.95,
  expedited: 18,
  pickup: 0,
  pickupLabel: "HarvestHome Garden House · Rhinebeck, NY",
};
