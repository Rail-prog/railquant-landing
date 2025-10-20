// src/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Uses your publishable key from Vercel env (VITE_STRIPE_PUBLISHABLE_KEY)
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

