"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import {
  buildIrrigationPlan,
  IRRIGATION_STEPS,
  type IrrigationAnswers,
} from "@/lib/irrigation";
import { formatMoney } from "@/lib/products-client";

const empty: IrrigationAnswers = {
  size: "",
  beds: "",
  source: "",
  distance: "",
  automation: "",
};

export default function IrrigationBuilderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IrrigationAnswers>(empty);
  const current = IRRIGATION_STEPS[step];
  const done = step >= IRRIGATION_STEPS.length;
  const plan = useMemo(() => (done ? buildIrrigationPlan(answers) : null), [done, answers]);
  const total = plan?.products.reduce((s, p) => s + p.price, 0) ?? 0;

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Irrigation & water</p>
      <h1>Build your irrigation system</h1>
      <p style={{ maxWidth: "38rem", color: "var(--muted)" }}>
        Size, beds, source, distance, automation. The kit changes when the spigot is seventy feet from the tomatoes — we will not pretend otherwise.
      </p>

      {!done && current ? (
        <div style={{ marginTop: "2rem", maxWidth: "36rem" }}>
          <p style={{ color: "var(--accent)", fontWeight: 650 }}>
            {step + 1} / {IRRIGATION_STEPS.length}
          </p>
          <h2>{current.question}</h2>
          <div className="finder" style={{ marginTop: "1rem" }}>
            {current.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="choice"
                onClick={() => {
                  setAnswers((a) => ({ ...a, [current.key]: opt.value }));
                  setStep((s) => s + 1);
                }}
              >
                <strong>{opt.label}</strong>
              </button>
            ))}
          </div>
        </div>
      ) : plan ? (
        <div style={{ marginTop: "2rem" }}>
          <h2>{plan.title}</h2>
          <p>{plan.summary}</p>
          <p style={{ fontWeight: 650 }}>{formatMoney(total)} estimated kit</p>
          {plan.notes.length ? (
            <ul>
              {plan.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ) : null}
          <div style={{ marginTop: "1.5rem" }}>
            <ProductGrid products={plan.products} />
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ marginTop: "1.5rem" }}
            onClick={() => {
              setAnswers(empty);
              setStep(0);
            }}
          >
            Rebuild
          </button>
        </div>
      ) : null}
    </div>
  );
}
