// api/create-checkout-session.js
import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10",
    });

    // Determine which price we're creating a session for.
    // If client sent priceId, we use it; otherwise default to PRO subscription.
    const { priceId } = req.body || {};

    // Success/cancel URLs (fallback to same-origin if not provided)
    const origin =
      req.headers.origin ||
      `https://${req.headers.host || "localhost:5173"}`;

    const successUrl = process.env.STRIPE_SUCCESS_URL || `${origin}/?checkout=success`;
    const cancelUrl  = process.env.STRIPE_CANCEL_URL  || `${origin}/?checkout=cancelled`;

    const isOneOff = !!priceId; // when client sends priceId (one-off)
    const priceForSession = priceId || process.env.STRIPE_PRICE_PRO;

    if (!priceForSession) {
      return res.status(400).json({ error: "Missing price id configuration." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: isOneOff ? "payment" : "subscription",
      line_items: [
        {
          price: priceForSession,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Optional: allow promotion codes, etc.
      allow_promotion_codes: true,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res
      .status(500)
      .json({ error: err?.message || "Stripe session failed" });
  }
}




