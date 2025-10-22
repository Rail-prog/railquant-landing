// /api/create-portal-session.js
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

    // The client will send the Checkout Session ID so we can look up the customer.
    const { sessionId } = await req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "Missing sessionId" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    if (!session.customer) {
      return res.status(400).json({ error: "No customer for session" });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: typeof session.customer === "string" ? session.customer : session.customer.id,
      return_url:
        process.env.STRIPE_PORTAL_RETURN_URL ||
        `${req.headers.origin || `https://${req.headers.host}`}/`,
    });

    return res.status(200).json({ url: portal.url });
  } catch (err) {
    console.error("Create portal error:", err);
    return res.status(500).json({ error: "Stripe error", details: err.message });
  }
}

