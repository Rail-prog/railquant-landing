import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Initialize Stripe using your secret key (set in Vercel → Environment Variables)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Get the price ID or amount from your frontend
    const { priceId, mode = "subscription" } = req.body;

    // Build the URLs for success & cancel redirects
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const success_url = `${origin}/success`;
    const cancel_url = `${origin}/cancel`;
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

    // Which price to use (defaults to PRO monthly)
    const { priceId = process.env.STRIPE_PRICE_PRO_MONTH, quantity = 1 } =
      req.body ?? {};

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",                 // change to "payment" if one-off
      line_items: [{ price: priceId, quantity }],
      success_url: process.env.STRIPE_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: process.env.STRIPE_CANCEL_URL,
      // Optional: customer email collection & invoice
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe create session error:", err);
    return res.status(500).json({ error: "Stripe error", details: err.message });
  }
}

   

   

