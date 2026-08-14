"use client";

import { FormEvent, useState } from "react";
import { useAccount } from "@/lib/account-context";

export default function QuotePage() {
  const { account, requestPro } = useAccount();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    requestPro();
    setSent(true);
  }

  return (
    <div className="wrap page-hero">
      <p className="eyebrow">Pro desk</p>
      <h1>Request a quote</h1>
      {sent ? (
        <p>Received. A grower at HarvestHome Garden House will follow up. Your account is marked Pro on this browser.</p>
      ) : (
        <form className="form" onSubmit={onSubmit} style={{ maxWidth: "28rem", marginTop: "1.5rem" }}>
          <label>
            Business name
            <input name="biz" required defaultValue={account?.name ?? ""} />
          </label>
          <label>
            Email
            <input name="email" type="email" required defaultValue={account?.email ?? ""} />
          </label>
          <label>
            What do you need?
            <select name="need" defaultValue="irrigation">
              <option value="irrigation">Commercial irrigation</option>
              <option value="greenhouse">Greenhouse structure</option>
              <option value="seed">Bulk seed</option>
              <option value="hydro">Hydroponic production</option>
              <option value="mixed">A mixed project</option>
            </select>
          </label>
          <label>
            Notes
            <textarea name="notes" rows={5} placeholder="Site, crop, timeline" />
          </label>
          <button type="submit" className="btn">
            Send quote request
          </button>
        </form>
      )}
    </div>
  );
}
