import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20", // or omit to use default
    });

    const { priceId, success_url, cancel_url } = req.body ?? {};

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: success_url || `${req.headers.origin}/?success=true`,
      cancel_url: cancel_url || `${req.headers.origin}/?canceled=true`,
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}

