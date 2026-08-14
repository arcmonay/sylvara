import Image from "next/image";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="wrap page-hero prose">
      <p className="eyebrow">Garden & growing supply</p>
      <h1>HarvestHome is a house you grow inside of.</h1>
      <div
        style={{
          position: "relative",
          width: "min(22rem, 100%)",
          aspectRatio: "1 / 1",
          background: "#050505",
          borderRadius: "1.2rem",
          margin: "1.5rem 0",
          overflow: "hidden",
        }}
      >
        <Image
          src="/brand/logo.png"
          alt="HarvestHome logo: a house with three leaves, garden and growing supply"
          fill
          sizes="22rem"
          className="object-contain"
        />
      </div>
      <p>
        HarvestHome started from a simple irritation: hydroponic suppliers talked like warehouses, and garden centers talked like gift shops. Meanwhile people wanted tomatoes, fewer gallons on the lawn, and a backyard that still had birds in it.
      </p>
      <p>
        Hydroponics is one aisle. Seeds are another. Irrigation is a flagship. Greenhouses, compost, and mason bees belong in the same company because they are the same job — grow more of your own food, and spend water like it matters.
      </p>
      <p>
        Grow better. Live greener. The Garden House in Rhinebeck is the pickup desk. The site is the floor. Shopify is how inventory will move when the store is connected. Until then, the catalog and cart run here.
      </p>
      <p>© 2025 HarvestHome.</p>
    </article>
  );
}
