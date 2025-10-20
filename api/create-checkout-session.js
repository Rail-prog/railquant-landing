import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, mode = "subscription" } = req.body || {};

    if (!process.env.STRIPE_SECRET_KEY) {
      return res
        .status(500)
        .json({ error: "Missing STRIPE_SECRET_KEY" });
    }
    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode, // "subscription" or "payment"
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      allow_promotion_codes: true
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe error", err);
    return res
      .status(500)
      .json({ error: err?.message || "Stripe error" });
  }
}
