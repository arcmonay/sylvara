import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="brand">
            <BrandLogo invert withSub />
          </Link>
          <p style={{ marginTop: "0.9rem", maxWidth: "22rem" }}>
            Garden & growing supply for people who want more food, less waste,
            and a backyard that still has birds in it.
          </p>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            <li>
              <Link href="/shop">All growing</Link>
            </li>
            <li>
              <Link href="/seeds">Seed Vault</Link>
            </li>
            <li>
              <Link href="/collections/irrigation">Irrigation</Link>
            </li>
            <li>
              <Link href="/bundles">Complete systems</Link>
            </li>
            <li>
              <Link href="/pro">Pro & wholesale</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Learn</h3>
          <ul>
            <li>
              <Link href="/learn">Guides</Link>
            </li>
            <li>
              <Link href="/find">Product finder</Link>
            </li>
            <li>
              <Link href="/irrigation-builder">Irrigation builder</Link>
            </li>
            <li>
              <Link href="/learn/what-are-heirloom-seeds">Heirloom seeds</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Visit</h3>
          <ul>
            <li>Garden House · Rhinebeck, NY</li>
            <li>Local pickup at checkout</li>
            <li>
              <Link href="/account">Your account</Link>
            </li>
            <li>
              <Link href="/about">About HarvestHome</Link>
            </li>
            <li>hello@harvesthome.garden</li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">© 2026 HarvestHome. Grow better. Live greener.</div>
    </footer>
  );
}
