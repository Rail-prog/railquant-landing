// src/stripe.js
// Minimal client helper to start a Stripe Checkout session.
// Works with /api/create-checkout-session that returns { url: session.url }

export async function startCheckout({
  priceId = import.meta.env.VITE_STRIPE_PRICE_PRO,
  successUrl = `${window.location.origin}/?success=true`,
  cancelUrl = `${window.location.origin}/?canceled=true`,
} = {}) {
  if (!priceId) {
    throw new Error(
      "Missing Stripe price id. Set VITE_STRIPE_PRICE_PRO in your environment."
    );
  }

  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      priceId,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  // Handle non-2xx responses
  if (!res.ok) {
    let msg = `Failed to create checkout session (${res.status})`;
    try {
      const err = await res.json();
      if (err?.error) msg = err.error;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(msg);
  }

  // Expecting { url: "https://checkout.stripe.com/..." }
  const data = await res.json();
  if (!data?.url) {
    throw new Error("Checkout session created, but no redirect URL was returned.");
  }

  // Redirect to Stripe Checkout
  window.location.href = data.url;
}

/**
 * Optional convenience helper:
 * Call this from a click handler on your “Buy”/“Start trial” button:
 *
 *   import { startCheckout } from "./stripe";
 *   document.getElementById("buy-btn").addEventListener("click", () => {
 *     startCheckout().catch(err => alert(err.message));
 *   });
 */
export default startCheckout;


