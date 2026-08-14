"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { FINDER_STEPS, runFinder, type FinderAnswers } from "@/lib/finder";

const empty: FinderAnswers = {
  grow: "",
  where: "",
  space: "",
  experience: "",
  automation: "",
  budget: "",
};

export default function FinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>(empty);
  const current = FINDER_STEPS[step];
  const done = step >= FINDER_STEPS.length;
  const result = useMemo(() => (done ? runFinder(answers) : null), [done, answers]);

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Product finder</p>
      <h1>What do you need to grow?</h1>
      <p style={{ maxWidth: "36rem", color: "var(--muted)" }}>
        Six questions. A recommended system. Then the supporting pieces — not a 400-SKU stare-down.
      </p>

      {!done && current ? (
        <div style={{ marginTop: "2rem", maxWidth: "36rem" }}>
          <p style={{ color: "var(--accent)", fontWeight: 650 }}>
            {step + 1} / {FINDER_STEPS.length}
          </p>
          <h2>{current.question}</h2>
          <div className="finder" style={{ marginTop: "1rem" }}>
            {current.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`choice${answers[current.key] === opt.value ? " is-on" : ""}`}
                onClick={() => {
                  setAnswers((a) => ({ ...a, [current.key]: opt.value }));
                  setStep((s) => s + 1);
                }}
              >
                <strong>{opt.label}</strong>
                <span>{opt.hint}</span>
              </button>
            ))}
          </div>
        </div>
      ) : result ? (
        <div style={{ marginTop: "2rem" }}>
          <h2>{result.headline}</h2>
          <p style={{ maxWidth: "38rem" }}>{result.summary}</p>
          {result.system ? (
            <p style={{ margin: "1rem 0" }}>
              <Link href={`/shop/${result.system.handle}`} className="btn">
                Start with {result.system.title}
              </Link>
            </p>
          ) : null}
          <ProductGrid products={result.products} />
          <button
            type="button"
            className="btn btn-ghost"
            style={{ marginTop: "1.5rem" }}
            onClick={() => {
              setAnswers(empty);
              setStep(0);
            }}
          >
            Start over
          </button>
        </div>
      ) : null}
    </div>
  );
}
