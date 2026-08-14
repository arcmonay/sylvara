import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AccountProvider } from "@/lib/account-context";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { isShopifyConnected } from "@/lib/shopify";
import "./globals.css";

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harvesthome.garden"),
  title: {
    default: "HarvestHome — Grow better. Live greener.",
    template: "%s · HarvestHome",
  },
  description:
    "Garden & growing supply for home food production: heirloom seed, irrigation, greenhouses, hydroponics, and backyard habitat.",
  openGraph: {
    title: "HarvestHome — Grow better. Live greener.",
    description:
      "A modern retailer for growing food at home, conserving water, and building habitat.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const shopify = isShopifyConnected();
  const ga = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="min-h-full antialiased">
        {ga ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
              }}
            />
          </>
        ) : null}
        <CartProvider>
          <WishlistProvider>
            <AccountProvider>
              <div className="site">
                <Header />
                <main className="site-main">{children}</main>
                <Footer />
              </div>
            </AccountProvider>
          </WishlistProvider>
        </CartProvider>
        <span className="sr-only" data-commerce={shopify ? "shopify" : "catalog"}>
          Catalog mode
        </span>
      </body>
    </html>
  );
}
