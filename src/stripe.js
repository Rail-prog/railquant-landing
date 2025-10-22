export async function startCheckout({ priceId, quantity = 1 } = {}) {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, quantity }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("No checkout URL returned:", data);
      alert("Unable to start checkout. Please try again.");
    }
  } catch (e) {
    console.error(e);
    alert("Something went wrong starting checkout.");
  }
}
export async function openBillingPortal({ customerId, returnUrl } = {}) {
  const res = await fetch("/api/create-portal-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, returnUrl }),
  });
  const data = await res.json();
  if (data?.url) window.location.href = data.url;
  else alert("Unable to open billing portal.");
}



