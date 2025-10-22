// api/create-checkout-session.js
import Stripe from "stripe";

export default async function handler(req, res) {
  // Optional: handle CORS preflight if your client might send OPTIONS
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Server-side Stripe SDK (secret key from Vercel env)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    // Accept overrides from the client, but fall back to env defaults
    const {
      priceId,              // optional: if you want to select different prices from the UI
      quantity = 1,         // optional
      mode,                 // optional: "subscription" or "payment"
      customer_email,       // optional: prefill email if you want
    } = req.body ?? {};

    const session = await stripe.checkout.sessions.create({
      mode: mode || "subscription", // change default to "payment" if you sell one-off
      line_items: [
        {
          price: priceId || process.env.STRIPE_PRICE_PRO, // <— env default
          quantity,
        },
      ],
      success_url:
        process.env.STRIPE_SUCCESS_URL +
        "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: process.env.STRIPE_CANCEL_URL,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      ...(customer_email ? { customer_email } : {}),
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe create session error:", err);
    return res
      .status(500)
      .json({ error: "Stripe error", details: err.message });
  }
}


