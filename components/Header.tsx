"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { MEGA } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const { handles } = useWishlist();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [query, setQuery] = useState("");

  function search(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    setMega(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      <div className="announce">
        Free shipping over $75 · Grow better. Live greener. ·{" "}
        <Link href="/find">What do you need to grow?</Link>
      </div>
      <header className="topbar">
        <div className="topbar__inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <BrandLogo withSub />
          </Link>

          <nav className="topbar__nav" aria-label="Primary">
            <button
              type="button"
              className="mega-trigger"
              aria-expanded={mega}
              onClick={() => setMega((v) => !v)}
              onMouseEnter={() => setMega(true)}
            >
              Shop
            </button>
            <Link href="/seeds" className={pathname.startsWith("/seeds") ? "is-active" : ""}>
              Seeds
            </Link>
            <Link href="/bundles" className={pathname.startsWith("/bundles") ? "is-active" : ""}>
              Systems
            </Link>
            <Link href="/learn" className={pathname.startsWith("/learn") ? "is-active" : ""}>
              Learn
            </Link>
            <Link href="/pro" className={pathname.startsWith("/pro") ? "is-active" : ""}>
              Pro
            </Link>
          </nav>

          <div className="topbar__actions">
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
            <Link href="/wishlist" className="icon-link">
              Saved{handles.length ? ` (${handles.length})` : ""}
            </Link>
            <Link href="/account" className="icon-link">
              Account
            </Link>
            <Link href="/cart" className="btn btn-sm">
              Cart{count ? ` (${count})` : ""}
            </Link>
          </div>
        </div>

        <form className="search-strip" onSubmit={search} role="search">
          <label className="sr-only" htmlFor="site-search">
            Search products, plants, and problems
          </label>
          <input
            id="site-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tomato, drip, balcony, beginner…"
          />
        </form>

        <div className={`mega${mega ? " is-open" : ""}`} onMouseLeave={() => setMega(false)}>
          <div className="mega__grid">
            {MEGA.map((col) => (
              <div key={col.title}>
                <h3>
                  <Link href={col.href} onClick={() => setMega(false)}>
                    {col.title}
                  </Link>
                </h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={() => setMega(false)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={`drawer${open ? " is-open" : ""}`}>
          <form onSubmit={search} role="search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the garden…"
              aria-label="Search"
              style={{
                width: "100%",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "0.65rem 1rem",
              }}
            />
          </form>
          <Link href="/shop" onClick={() => setOpen(false)}>
            Shop all growing
          </Link>
          <Link href="/seeds" onClick={() => setOpen(false)}>
            Heirloom Seed Vault
          </Link>
          <Link href="/irrigation-builder" onClick={() => setOpen(false)}>
            Build your irrigation
          </Link>
          <Link href="/find" onClick={() => setOpen(false)}>
            What do you need to grow?
          </Link>
          <Link href="/bundles" onClick={() => setOpen(false)}>
            Complete systems
          </Link>
          <Link href="/learn" onClick={() => setOpen(false)}>
            Learn
          </Link>
          <Link href="/pro" onClick={() => setOpen(false)}>
            Pro & wholesale
          </Link>
        </div>
      </header>
    </>
  );
}
