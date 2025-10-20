// api/create-checkout-session.js
import Stripe from "stripe";

// IMPORTANT: set STRIPE_SECRET_KEY in Vercel → Project → Settings → Environment Variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { priceId } = req.body || {};
    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    // surface a helpful message during setup
    if (String(err?.message || "").includes("You did not provide an API key")) {
      return res.status(500).json({
        error:
          "Server misconfiguration: STRIPE_SECRET_KEY is missing. Set it in Vercel → Project → Settings → Environment Variables and redeploy.",
      });
    }
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
