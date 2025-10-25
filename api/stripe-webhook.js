// api/stripe-webhook.js
import Stripe from "stripe";

// Vercel parses body by default; we need raw body for Stripe signature verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

function buffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the events you care about
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // TODO: provision access, send license, email user, etc.
      console.log("✅ Checkout complete:", session.id, session.customer_email);
    }

    if (event.type === "invoice.payment_succeeded") {
      // For subscriptions: renewals come here
      console.log("💸 Payment succeeded:", event.data.object.id);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return res.status(500).json({ error: "Webhook handler failed" });
  }
}

