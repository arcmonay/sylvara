/**
 * Shopify Storefront API hook-up.
 * When env vars are set, replace local catalog reads with live Shopify data.
 * Until then, the app serves `data/catalog.json` and
 * `data/shopify-products.csv` is ready for Admin → Products → Import.
 */

export type ShopifyConfig = {
  domain: string;
  storefrontToken: string;
};

export function getShopifyConfig(): ShopifyConfig | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN?.trim();
  if (!domain || !storefrontToken) return null;
  return { domain, storefrontToken };
}

export function isShopifyConnected() {
  return getShopifyConfig() !== null;
}

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const config = getShopifyConfig();
  if (!config) {
    throw new Error(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN.",
    );
  }

  const response = await fetch(
    `https://${config.domain}/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": config.storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API returned no data.");
  }

  return json.data;
}
