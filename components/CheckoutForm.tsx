"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useAccount } from "@/lib/account-context";
import { useCart } from "@/lib/cart-context";
import { findDiscount, giftCardValue, SHIPPING } from "@/lib/discounts";
import { formatMoney } from "@/lib/products-client";

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const { account, login, addOrder, saveAddress } = useAccount();
  const [code, setCode] = useState("");
  const [gift, setGift] = useState("");
  const [ship, setShip] = useState<"standard" | "expedited" | "pickup">("standard");
  const [guest, setGuest] = useState(true);
  const [placed, setPlaced] = useState<string | null>(null);
  const [pay, setPay] = useState("card");

  const discount = findDiscount(code);
  const giftAmt = giftCardValue(gift);

  const shippingCost = useMemo(() => {
    if (ship === "pickup") return 0;
    if (ship === "expedited") return SHIPPING.expedited;
    if (discount?.freeShipping || subtotal >= SHIPPING.threshold) return 0;
    return SHIPPING.standard;
  }, [ship, discount, subtotal]);

  const discounted = useMemo(() => {
    if (!discount?.percent) return subtotal;
    if (discount.collection) {
      const slice = items
        .filter((i) => i.product.collection === discount.collection)
        .reduce((s, i) => s + i.product.price * i.quantity, 0);
      return subtotal - slice * (discount.percent / 100);
    }
    return subtotal * (1 - discount.percent / 100);
  }, [discount, items, subtotal]);

  const total = Math.max(0, discounted + shippingCost - giftAmt);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const name = String(data.get("name") || "Guest");
    if (!guest || data.get("create")) {
      login(email, name);
    }
    saveAddress({
      name,
      line1: String(data.get("line1") || ""),
      city: String(data.get("city") || ""),
      region: String(data.get("region") || "NY"),
      postal: String(data.get("postal") || ""),
    });
    const id = `SV-${Date.now().toString().slice(-8)}`;
    addOrder({
      id,
      date: new Date().toISOString().slice(0, 10),
      total,
      fulfillment: ship,
      items: items.map((i) => ({
        handle: i.product.handle,
        title: i.product.title,
        quantity: i.quantity,
      })),
    });
    clear();
    setPlaced(id);
  }

  if (!items.length && !placed) {
    return (
      <p>
        Nothing to check out. <Link href="/shop">Return to the floor.</Link>
      </p>
    );
  }

  if (placed) {
    return (
      <div>
        <h2>Order {placed} is in.</h2>
        <p>
          Catalog mode: this is a recorded local order until Shopify payments are connected.{" "}
          Pickup orders go to {SHIPPING.pickupLabel}.
        </p>
        <Link href="/account" className="btn" style={{ marginTop: "1rem" }}>
          View account
        </Link>
      </div>
    );
  }

  return (
    <form className="cart-layout" onSubmit={onSubmit}>
      <div className="form">
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend className="eyebrow">Account</legend>
          <label>
            <input type="checkbox" checked={guest} onChange={(e) => setGuest(e.target.checked)} /> Guest
            checkout
          </label>
          <label>
            Email
            <input name="email" type="email" required defaultValue={account?.email ?? ""} />
          </label>
          <label>
            Name
            <input name="name" required defaultValue={account?.name ?? ""} />
          </label>
          {guest ? (
            <label>
              <input type="checkbox" name="create" /> Create an account after order
            </label>
          ) : null}
        </fieldset>
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend className="eyebrow">Shipping</legend>
          <label>
            Address
            <input name="line1" required={ship !== "pickup"} placeholder="Street" />
          </label>
          <label>
            City
            <input name="city" required={ship !== "pickup"} />
          </label>
          <label>
            State
            <input name="region" defaultValue="NY" />
          </label>
          <label>
            ZIP
            <input name="postal" required={ship !== "pickup"} />
          </label>
          <label>
            Method
            <select value={ship} onChange={(e) => setShip(e.target.value as typeof ship)}>
              <option value="standard">Standard {subtotal >= 75 ? "(free over $75)" : formatMoney(8.95)}</option>
              <option value="expedited">Expedited {formatMoney(18)}</option>
              <option value="pickup">Local pickup · Rhinebeck</option>
            </select>
          </label>
        </fieldset>
        <fieldset style={{ border: 0, padding: 0 }}>
          <legend className="eyebrow">Payment</legend>
          <label>
            Method
            <select value={pay} onChange={(e) => setPay(e.target.value)}>
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
              <option value="shop">Shop Pay</option>
            </select>
          </label>
          {pay === "card" ? (
            <>
              <label>
                Card number
                <input name="card" placeholder="ACCT-000015" required />
              </label>
              <label>
                Expiry / CVC
                <input name="exp" placeholder="12 / 28 · 123" required />
              </label>
            </>
          ) : (
            <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
              {pay} will be available when Shopify checkout is connected. We’ll record the method on this order.
            </p>
          )}
        </fieldset>
      </div>
      <aside className="summary">
        {items.map((i) => (
          <p key={i.product.handle} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {i.product.title} × {i.quantity}
            </span>
            <span>{formatMoney(i.product.price * i.quantity)}</span>
          </p>
        ))}
        <label>
          Discount code
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="GREENER10" />
        </label>
        {discount ? <p className="stock-ok">{discount.label}</p> : code ? <p className="stock-low">Code not found</p> : null}
        <label>
          Gift card
          <input value={gift} onChange={(e) => setGift(e.target.value)} placeholder="HARVEST-GIFT-50" />
        </label>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Shipping</span>
          <span>{shippingCost ? formatMoney(shippingCost) : "Free"}</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
          <span>Total</span>
          <span>{formatMoney(total)}</span>
        </p>
        <button type="submit" className="btn" style={{ width: "100%" }}>
          Place order
        </button>
      </aside>
    </form>
  );
}
