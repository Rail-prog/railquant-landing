// src/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// IMPORTANT: set VITE_STRIPE_PUBLISHABLE_KEY in Vercel → Project → Settings → Environment Variables
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
