"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAccount } from "@/lib/account-context";
import { formatMoney } from "@/lib/products-client";

export default function AccountPage() {
  const { account, login, logout, requestPro } = useAccount();
  const [mode, setMode] = useState<"login" | "create">("login");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login(String(data.get("email")), String(data.get("name") || "Grower"));
  }

  if (!account) {
    return (
      <div className="wrap page-hero">
        <h1>{mode === "create" ? "Create account" : "Sign in"}</h1>
        <p style={{ color: "var(--muted)", maxWidth: "32rem" }}>
          Accounts live in this browser until Shopify customer accounts are connected. Guest checkout is always available.
        </p>
        <form className="form" onSubmit={onSubmit} style={{ maxWidth: "24rem", marginTop: "1.5rem" }}>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Name
            <input name="name" required={mode === "create"} />
          </label>
          <label>
            Password
            <input name="password" type="password" required minLength={8} />
          </label>
          <button type="submit" className="btn">
            {mode === "create" ? "Create account" : "Sign in"}
          </button>
        </form>
        <button type="button" className="btn btn-ghost" style={{ marginTop: "1rem" }} onClick={() => setMode(mode === "create" ? "login" : "create")}>
          {mode === "create" ? "I already have an account" : "Create an account"}
        </button>
      </div>
    );
  }

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">{account.isPro ? "Pro account" : "Retail account"}</p>
      <h1>{account.name}</h1>
      <p>{account.email}</p>
      <div className="hero__actions" style={{ margin: "1rem 0" }}>
        {!account.isPro ? (
          <button type="button" className="btn" onClick={requestPro}>
            Enable Pro on this browser
          </button>
        ) : (
          <Link href="/pro" className="btn">
            Pro desk
          </Link>
        )}
        <button type="button" className="btn btn-ghost" onClick={logout}>
          Sign out
        </button>
      </div>
      <h2>Orders</h2>
      {account.orders.length === 0 ? (
        <p>No orders yet. <Link href="/shop">Shop growing.</Link></p>
      ) : (
        account.orders.map((o) => (
          <div key={o.id} className="review">
            <strong>
              {o.id} · {formatMoney(o.total)}
            </strong>
            <p>
              {o.date} · {o.fulfillment}
            </p>
            <ul>
              {o.items.map((i) => (
                <li key={i.handle}>
                  {i.title} × {i.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
