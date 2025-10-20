import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({
      error:
        "Server misconfiguration: STRIPE_SECRET_KEY is missing. Set it in Vercel → Project → Settings → Environment Variables and redeploy."
    });
  }

  try {
    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

    const { priceId, success_url, cancel_url } = req.body ?? {};
    if (!priceId) return res.status(400).json({ error: "Missing priceId" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: success_url || `${req.headers.origin}/success`,
      cancel_url: cancel_url || `${req.headers.origin}/cancel`,
      allow_promotion_codes: true
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message || "FUNCTION_INVOCATION_FAILED" });
  }
}
