import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page-hero">
      <h1>That bed is empty.</h1>
      <p>The page isn’t planted yet.</p>
      <Link href="/shop" className="btn" style={{ marginTop: "1rem" }}>
        Shop all growing
      </Link>
    </div>
  );
}
