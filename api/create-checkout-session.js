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

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url,
      cancel_url,
      customer_creation: "if_required",
      automatic_tax: { enabled: false },
    });

    // Return the session ID to your frontend
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(400).json({ error: error.message });
  }
}

