// /src/stripe.js
export async function startCheckout({ priceId, quantity = 1 } = {}) {
  const resp = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId, quantity }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.details || "Checkout failed");
  }

  const { url } = await resp.json();
  window.location.href = url; // redirect to Stripe-hosted Checkout
}

