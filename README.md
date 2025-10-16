# RailQuant AI — Landing Page (Vite + React + Tailwind)

This is a production-ready landing page to collect leads and start selling **today**.

## Quick Start (local)
1. Install Node 18+
2. `npm i`
3. `npm run dev`

## Deploy to Vercel (recommended)
1. Create a repo (GitHub).
2. Push this folder to the repo.
3. Import the repo at https://vercel.com/new
4. Framework Preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

### Custom domain
- In Vercel project settings → Domains → add `railquant.ai` (or your domain) and update DNS accordingly.

## Hook up the Contact Form
This project uses a plain HTML POST to **Formspree**.

1. Create a Formspree project, get an endpoint like: `https://formspree.io/f/abcdwxyz`
2. In `src/App.jsx`, change the form `action` to that URL.
3. Optional: Add Google reCAPTCHA on Formspree for spam protection.

Alternatively, swap to **Resend** or any email function and create a tiny serverless function.

## Optional Enhancements
- Add analytics (Plausible/GA): paste the script in `index.html` head.
- Add a Calendly link for 1-click demo booking.
- Swap pricing, logo, and copy as needed.
- Later: hook into a backend/API as features go live.

## Notes
- Built with React 18, Tailwind, Vite, lucide-react icons, and framer-motion.
- Fully static; perfect for Vercel.
scss
Commit changes to main
