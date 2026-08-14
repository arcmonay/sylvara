import Link from "next/link";
import { getGuides } from "@/lib/guides";

export const metadata = {
  title: "Learn",
  description: "Guides on food gardening, hydroponics, irrigation, seed saving, and habitat.",
};

export default function LearnPage() {
  const guides = getGuides();
  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Learn</p>
      <h1>Read like a gardener. Buy like a retailer.</h1>
      <p style={{ maxWidth: "38rem", color: "var(--muted)" }}>
        These guides exist to get you to the right product with fewer regrets — not to rank for “best grow tent.”
      </p>
      <div className="path-grid" style={{ marginTop: "2rem" }}>
        {guides.map((g) => (
          <Link key={g.slug} href={`/learn/${g.slug}`} className="path-card">
            <strong>{g.title}</strong>
            <span>
              {g.category} · {g.minutes} min · {g.dek}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
