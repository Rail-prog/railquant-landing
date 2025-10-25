// api/create-checkout-session.js
import Stripe from "stripe";

export default async function handler(req, res) {
  // Only POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    STRIPE_SECRET_KEY,
    STRIPE_PRICE_PRO,
    STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL,
  } = process.env;

  if (!STRIPE_SECRET_KEY) {
    console.error("❌ Missing STRIPE_SECRET_KEY");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

  try {
    const { priceId } = req.body || {};

    // Build success/cancel URLs. Fallback to origin if env not set.
    const origin =
      STRIPE_SUCCESS_URL && STRIPE_CANCEL_URL
        ? null
        : `${req.headers.origin || "http://localhost:5173"}`;

    const successUrl =
      STRIPE_SUCCESS_URL || `${origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = STRIPE_CANCEL_URL || `${origin}/cancel`;

    // If a priceId is provided -> treat as one-off payment
    // Else -> create a subscription using STRIPE_PRICE_PRO
    const isOneOff = Boolean(priceId);

    if (isOneOff) {
      if (!priceId) {
        return res.status(400).json({ error: "Missing one-off priceId" });
      }
      console.log("➡️ Creating one-off payment session for price", priceId);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        // Optional: collect email
        // customer_email: "optional@example.com",
      });

      return res.status(200).json({ url: session.url });
    } else {
      if (!STRIPE_PRICE_PRO) {
        console.error("❌ Missing STRIPE_PRICE_PRO for subscription checkout");
        return res.status(500).json({ error: "Server misconfigured" });
      }

      console.log("➡️ Creating subscription session for price", STRIPE_PRICE_PRO);

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: STRIPE_PRICE_PRO, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        // Optional: allow promotion codes, etc.
        // allow_promotion_codes: true,
      });

      return res.status(200).json({ url: session.url });
    }
  } catch (err) {
    console.error("❌ Failed to create checkout session:", err);
    // Stripe errors include type and message
    return res.status(500).json({ error: err.message || "Stripe error" });
  }
}



