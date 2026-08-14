import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  readFileSync(join(root, "data", "catalog.json"), "utf8"),
);

const imageBase =
  process.env.SHOPIFY_IMAGE_BASE_URL ||
  "https://raw.githubusercontent.com/arcmonay/sylvara/main/public";

const esc = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const header = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Alt Text",
  "Status",
].join(",");

const rows = catalog.products.map((p) => {
  const imagePath = p.image || `/products/${p.handle}.webp`;
  const imageSrc = `${imageBase}${imagePath}`;
  const grams = Math.max(20, Math.round(Number(p.weightLbs || 1) * 453.592));
  const type =
    catalog.collections.find((c) => c.handle === p.collection)?.title ??
    "Garden";
  const optionName = p.variant?.name || "Title";
  const optionValue = p.variant?.values?.[0] || "Default";
  const body = [
    `<p>${p.description}</p>`,
    `<p><strong>Is this right for me?</strong> ${p.rightForMe}</p>`,
    p.bundleIncludes?.length
      ? `<p><strong>Included:</strong></p><ul>${p.bundleIncludes.map((i) => `<li>${i}</li>`).join("")}</ul>`
      : "",
    `<ul>${Object.entries(p.specs || {})
      .map(([k, v]) => `<li>${k}: ${v}</li>`)
      .join("")}</ul>`,
  ].join("");

  return [
    p.handle,
    p.title,
    body,
    p.vendor || "HarvestHome",
    type,
    (p.tags || []).join(", "),
    "TRUE",
    optionName,
    optionValue,
    p.sku,
    String(grams),
    "shopify",
    p.inStock ? String(p.stockQty || 25) : "0",
    "deny",
    "manual",
    Number(p.price).toFixed(2),
    p.compareAtPrice ? Number(p.compareAtPrice).toFixed(2) : "",
    "TRUE",
    "TRUE",
    imageSrc,
    p.title,
    p.quoteOnly ? "draft" : "active",
  ]
    .map(esc)
    .join(",");
});

writeFileSync(
  join(root, "data", "shopify-products.csv"),
  [header, ...rows].join("\n"),
);
console.log(`Wrote ${rows.length} Shopify product rows with images.`);
