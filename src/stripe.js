import { loadStripe } from "@stripe/stripe-js";

// Set VITE_STRIPE_PUBLISHABLE_KEY in your Vercel Project → Settings → Environment Variables
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
