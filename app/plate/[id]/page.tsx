import { notFound } from "next/navigation";
import Link from "next/link";
import { allPlates, formatPrice } from "@/lib/data";

export function generateStaticParams() {
  return allPlates.map((p) => ({ id: p.id }));
}

export default async function PlatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plate = allPlates.find((p) => p.id === id);
  if (!plate) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#101012",
        color: "#ede8de",
        padding: "64px 24px",
        fontFamily: "var(--font-body, sans-serif)",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#b9b3a4",
            textDecoration: "none",
          }}
        >
          ← Back to the catalogue
        </Link>

        <p
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#b8935b",
            marginTop: 32,
          }}
        >
          {plate.plateNo} · Edition of {plate.edition}
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display, serif)",
            fontWeight: 500,
            fontSize: 40,
            margin: "10px 0 6px",
          }}
        >
          {plate.alt}
        </h1>

        <p style={{ fontSize: 16, color: "#b9b3a4", margin: "0 0 28px" }}>
          {plate.photographer} — {plate.location}, {plate.year}
        </p>

        <img
          src={plate.src}
          alt={plate.alt}
          style={{
            width: "100%",
            maxWidth: 420,
            filter: "grayscale(1)",
            borderRadius: 2,
            marginBottom: 28,
          }}
        />

        <p style={{ fontSize: 22, fontFamily: "var(--font-mono, monospace)", color: "#ede8de" }}>
          {formatPrice(plate.id)}
        </p>
        <p style={{ fontSize: 14, color: "#b9b3a4", maxWidth: "50ch" }}>
          8×10&Prime; archival pigment print, hand-numbered, edition of {plate.edition}.
          This is a placeholder detail page — replace this copy and the checkout flow
          with your real product page.
        </p>
      </div>
    </main>
  );
}
