import { loadStripe } from "@stripe/stripe-js";

// VITE_STRIPE_PUBLISHABLE_KEY must be set in Vercel Project Settings -> Environment Variables
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
