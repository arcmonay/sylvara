# HarvestHome

**Grow better. Live greener.** Garden & growing supply for home food production — hydroponics, heirloom seed, irrigation, greenhouses, and backyard habitat.

Repo: [github.com/arcmonay/sylvara](https://github.com/arcmonay/sylvara) (working title on GitHub; storefront brand is HarvestHome).

## Stack

Next.js (App Router) + Tailwind v4. Local `data/catalog.json` and a browser cart until Shopify credentials are set.

## Shopify

1. Copy `.env.example` to `.env.local` and add `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_TOKEN`.
2. Import products: Shopify Admin → Products → Import using `data/shopify-products.csv`.
3. Regenerate the CSV anytime:

```bash
npm run catalog
npm run catalog:csv
```

Image Src values point at `https://raw.githubusercontent.com/arcmonay/sylvara/main/public` + each product image.

## Scripts

```bash
npm run dev
npm run catalog
npm run photos
npm run images
npm run catalog:csv
npm run build
```

## Deploy

Add a **new** Vercel/Netlify project from [github.com/arcmonay/sylvara](https://github.com/arcmonay/sylvara). Do not attach this repo to an old site.
