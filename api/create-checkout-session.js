// /api/create-checkout-session.js
import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    // Allow client to pass a specific priceId; default to your £299 subscription
    const { priceId = process.env.STRIPE_PRICE_PRO, quantity = 1 } = req.body ?? {};

    // If you want to make certain prices one-off, the PRICE object in Stripe controls that.
    // Here we simply create a session with whatever priceId was passed.
    // If the priceId is a recurring price, Stripe renders "subscription".
    // If it's a one-time price, Stripe renders "payment".
    // So we don't need to infer 'mode'; Stripe infers it from the price.
    // But if you want to force mode you can look up the price first.
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity }],
      mode: "payment_or_subscription", // Stripe will resolve based on the price
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe create session error:", err);
    return res.status(500).json({ error: "Stripe error", details: err.message });
  }
}



