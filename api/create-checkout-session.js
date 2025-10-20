import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { priceId, success_url, cancel_url } = req.body ?? {};
    if (!priceId) {
      res.status(400).json({ error: "Missing priceId" });
      return;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: success_url || `${req.headers.origin}/?success=true`,
      cancel_url: cancel_url || `${req.headers.origin}/?canceled=true`,
      allow_promotion_codes: true,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

