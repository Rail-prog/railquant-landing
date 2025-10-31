// src/stripe.js
export async function startCheckout({ priceId } = {}) {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(priceId ? { priceId } : {}),
    });

    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : { error: await res.text() };

    if (!res.ok || !data?.url) {
      throw new Error(data?.error || "Checkout session error");
    }

    window.location.assign(data.url);
  } catch (err) {
    // Show the actual reason instead of a generic alert
    alert(err.message || "Something went wrong starting checkout.");
  }
}





