import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { GOALS, PATHS, STYLES } from "@/lib/nav";
import {
  getBundles,
  getCollections,
  getFeaturedProducts,
  getHighTicketProducts,
} from "@/lib/products";

export default function HomePage() {
  const collections = getCollections().filter((c) => c.handle !== "growing-systems");
  const featured = getFeaturedProducts(8);
  const systems = getBundles().slice(0, 4);
  const production = getHighTicketProducts(8);

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image
            src="/media/hero.webp"
            alt="Rows of tomatoes ripening inside a working greenhouse"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__veil" />
        </div>
        <div className="hero__copy">
          <p className="eyebrow" style={{ color: "var(--lime)" }}>
            Garden & growing supply
          </p>
          <h1>
            Grow better.
            <br />
            Live greener.
          </h1>
          <p>
            Everything you need to grow food, store water, and run a working
            garden — from a balcony tomato to a full irrigation system, indoor
            production room, or industrial compost line.
          </p>
          <div className="hero__actions">
            <Link href="/shop" className="btn btn-accent">
              Shop all growing
            </Link>
            <Link href="/find" className="btn btn-ghost" style={{ color: "#faf6ee", borderColor: "#faf6ee" }}>
              Find your system
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Shop by need</p>
              <h2>What are you here to grow?</h2>
            </div>
          </div>
          <div className="cat-grid">
            {collections.map((c) => (
              <Link key={c.handle} href={`/collections/${c.handle}`} className="cat">
                <Image src={c.image} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" />
                <div className="cat__veil" />
                <div className="cat__copy">
                  <strong>{c.title}</strong>
                  <span>{c.promise}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--linen">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Choose your growing style</p>
              <h2>Start with the room you have</h2>
            </div>
          </div>
          <div className="style-grid">
            {STYLES.map((s) => (
              <Link key={s.slug} href={`/styles/${s.slug}`} className="style-card">
                <strong>{s.title}</strong>
                <span>{s.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Shop by goal</p>
              <h2>A garden is a set of jobs</h2>
            </div>
          </div>
          <div className="goal-grid">
            {GOALS.map((g) => (
              <Link key={g.slug} href={g.href} className="goal-card">
                <strong>{g.title}</strong>
                <span>{g.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--linen">
        <div className="wrap banner">
          <div className="banner__copy">
            <p className="eyebrow">Heirloom Seed Vault</p>
            <h2>Open-pollinated food crops, kept like a pantry staple.</h2>
            <p>
              Vegetables, herbs, natives, and bulk bags for people who sow weekly.
              Browse by plant, zone, season, or whether you have ever grown
              anything at all.
            </p>
            <div className="hero__actions" style={{ marginTop: "1.2rem" }}>
              <Link href="/seeds/vault" className="btn">
                Enter the vault
              </Link>
              <Link href="/learn/what-are-heirloom-seeds" className="btn btn-ghost">
                What are heirlooms?
              </Link>
            </div>
          </div>
          <div className="banner__media">
            <Image src="/media/seeds.webp" alt="Seedlings in trays" fill sizes="50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap banner">
          <div className="banner__media">
            <Image src="/media/irrigation.webp" alt="Irrigation in a food garden" fill sizes="50vw" />
          </div>
          <div className="banner__copy">
            <p className="eyebrow">Irrigation & water</p>
            <h2>Build your irrigation system</h2>
            <p>
              Garden size, beds, water source, distance, automation. We will not
              sell you a kit that assumes the spigot is next to the tomatoes.
              Acre drip, cisterns, fertigation, and septic tanks live here too.
            </p>
            <Link href="/irrigation-builder" className="btn" style={{ marginTop: "1rem" }}>
              Start the builder
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--linen">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Complete growing systems</p>
              <h2>One decision. A working garden.</h2>
            </div>
            <Link href="/bundles">All systems</Link>
          </div>
          <ProductGrid products={systems} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Production floor</p>
              <h2>The equipment a serious garden actually runs.</h2>
            </div>
            <Link href="/paths/serious">Serious growing</Link>
          </div>
          <p style={{ maxWidth: "40rem", color: "var(--muted)", margin: "-0.6rem 0 1.4rem" }}>
            Stainless mixing tanks, recirculating DWC, acre drip, in-vessel composters,
            and septic systems — food production at the scale of a greenhouse bay or a farm block.
          </p>
          <ProductGrid products={production} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Tell us where you are</p>
              <h2>Shopping paths for actual people</h2>
            </div>
          </div>
          <div className="path-grid">
            {PATHS.map((p) => (
              <Link key={p.slug} href={p.href} className="path-card">
                <strong>{p.title}</strong>
                <span>{p.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--linen">
        <div className="wrap">
          <div className="section__head">
            <h2>From the floor</h2>
            <Link href="/shop">Shop all</Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Learn</p>
              <h2>Read first if the catalog feels loud</h2>
            </div>
            <Link href="/learn">All guides</Link>
          </div>
          <div className="steps">
            <Link href="/learn/start-vegetable-garden" className="step">
              <span>01</span>
              <h3>How to start a vegetable garden</h3>
              <p>Sun, a bed, seed you will eat, and water that does not depend on memory.</p>
            </Link>
            <Link href="/learn/hydroponics-for-beginners" className="step">
              <span>02</span>
              <h3>Hydroponics for beginners</h3>
              <p>A reservoir, some air, and plants that like wet feet — not a laboratory.</p>
            </Link>
            <Link href="/learn/build-drip-irrigation" className="step">
              <span>03</span>
              <h3>Build a drip system</h3>
              <p>Measure the run. Tame the pressure. Then water the roots.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
