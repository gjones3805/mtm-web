"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function EmailSignupForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const firstName = String(formData.get("firstName") ?? "").trim();

    if (!email) {
      setState("error");
      setMessage("Please enter your email address.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Subscription failed.");
      }

      setState("success");
      setMessage("You are in. Check your inbox to confirm your subscription.");
      event.currentTarget.reset();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Subscription failed.";
      setState("error");
      setMessage(msg);
    }
  }

  return (
    <div className="panel" id="email-list">
      <h3 className="heading-section text-2xl md:text-3xl">Join the Email List</h3>
      <p className="mt-3 body-copy text-base md:text-lg">
        Receive practical insights on investing basics, market awareness, and financial direction.
      </p>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          First name (optional)
          <input
            className="rounded-xl border border-line bg-surface px-4 py-3 text-base font-normal text-foreground placeholder:text-muted focus:border-brand focus:outline-none"
            type="text"
            name="firstName"
            placeholder="Alex"
            autoComplete="given-name"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-foreground">
          Email
          <input
            className="rounded-xl border border-line bg-surface px-4 py-3 text-base font-normal text-foreground placeholder:text-muted focus:border-brand focus:outline-none"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <button className="btn-primary md:col-span-2" disabled={state === "loading"} type="submit">
          {state === "loading" ? "Joining..." : "Join the Email List"}
        </button>
      </form>
      <p className="mt-4 text-sm text-muted">
        By subscribing, you agree to receive educational financial insights from mediocre to
        masterful. Unsubscribe anytime.
      </p>
      {message ? (
        <p
          className={`mt-3 text-sm font-semibold ${
            state === "success" ? "text-brand-strong" : "text-red-700"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
