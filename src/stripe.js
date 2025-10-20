// src/stripe.js
// Minimal client helper that POSTs to your serverless function,
// then redirects the browser to Stripe Checkout.

export default async function startCheckout({
  priceId,
  successUrl,
  cancelUrl,
} = {}) {
  // Fallback to ENV price if a priceId isn't passed
  const body = {
    priceId: priceId || import.meta.env.VITE_STRIPE_PRICE_PRO,
    success_url: successUrl || window.location.origin + "/?success=true",
    cancel_url: cancelUrl || window.location.origin + "/?canceled=true",
  };

  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Checkout failed: ${res.status} ${text}`);
  }

  const { url } = await res.json();
  if (!url) throw new Error("No checkout URL returned from API.");

  // Redirect to Stripe-hosted Checkout page
  window.location.assign(url);
}
