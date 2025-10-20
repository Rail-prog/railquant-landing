// api/create-checkout-session.js
import Stripe from "stripe";

/**
 * Create a Checkout session for the PRO subscription.
 * Expects env:
 * - STRIPE_SECRET_KEY (server-side secret)
 * - VITE_STRIPE_PRICE_PRO (a Price ID like price_xxx)
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Guard: make missing/empty env obvious
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !secret.startsWith("sk_")) {
    console.error("Missing STRIPE_SECRET_KEY env. Got:", secret);
    return res.status(500).json({
      error:
        "Server misconfiguration: STRIPE_SECRET_KEY is missing. Set it in Vercel → Project → Settings → Environment Variables and redeploy.",
    });
  }

  const priceId = process.env.VITE_STRIPE_PRICE_PRO;
  if (!priceId || !priceId.startsWith("price_")) {
    console.error("Missing or invalid VITE_STRIPE_PRICE_PRO env. Got:", priceId);
    return res.status(500).json({
      error:
        "Server misconfiguration: VITE_STRIPE_PRICE_PRO is missing/invalid. Set it to your Stripe Price ID and redeploy.",
    });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  try {
    const origin = req.headers.origin || "https://www.railquant.co.uk";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res.status(400).json({ error: err.message || "Stripe error" });
  }
}
