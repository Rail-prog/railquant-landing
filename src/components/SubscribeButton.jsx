// src/components/SubscribeButton.jsx
import React from "react";
import startCheckout from "../stripe";

/**
 * Simple button that starts Stripe Checkout.
 * You can drop this anywhere on the page.
 *
 * Props:
 * - label: button text
 * - priceId: (optional) override price (falls back to VITE_STRIPE_PRICE_PRO)
 * - className: extra CSS classes (Tailwind, etc.)
 */
export default function SubscribeButton({
  label = "Start subscription",
  priceId,
  className = "",
}) {
  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      await startCheckout({ priceId });
    } catch (e) {
      alert(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={
        "rounded-lg px-4 py-2 font-medium bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-50 " +
        className
      }
    >
      {loading ? "Redirecting…" : label}
    </button>
  );
}

