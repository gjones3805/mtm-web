"use client";

import { useState } from "react";

type CheckoutState = "idle" | "loading" | "error";

export default function RegisterNowCta() {
  const [state, setState] = useState<CheckoutState>("idle");
  const [message, setMessage] = useState("");

  async function startCheckout() {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = (await response.json()) as { message?: string; url?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.message ?? "Could not start checkout.");
      }

      window.location.assign(data.url);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not start checkout.");
      return;
    }

    setState("idle");
  }

  return (
    <div className="flex max-w-md flex-col gap-2">
      <button className="btn-primary" disabled={state === "loading"} onClick={startCheckout} type="button">
        {state === "loading" ? "Opening Checkout..." : "Register Now"}
      </button>
      <p className="text-sm text-muted">
        Secure payment via Stripe. You can enter a promo code at checkout. If you received a
        campaign offer link, use that link to open checkout with your discount pre-applied.
      </p>
      {message ? (
        <p className="text-sm font-semibold text-red-700" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}