import { loadStripe } from "@stripe/stripe-js";

// Set this in Vercel Project Settings → Environment Variables (client-side):
// VITE_STRIPE_PUBLISHABLE_KEY = pk_test_...
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
