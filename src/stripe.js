// src/stripe.js
export async function startCheckout({ priceId } = {}) {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(priceId ? { priceId } : {}),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Checkout HTTP error:", res.status, text);
      alert("Something went wrong starting checkout.");
      return;
    }

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("No URL returned from checkout session:", data);
      alert("Something went wrong starting checkout.");
    }
  } catch (err) {
    console.error("startCheckout failed:", err);
    alert("Something went wrong starting checkout.");
  }
}




