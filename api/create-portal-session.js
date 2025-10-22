// api/create-portal-session.js
import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
    const { customerId, returnUrl } = req.body;

    if (!customerId) return res.status(400).json({ error: "Missing customerId" });

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || process.env.STRIPE_SUCCESS_URL || "https://railquant.co.uk/",
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Create portal session error:", err);
    return res.status(500).json({ error: "Stripe error" });
  }
}

