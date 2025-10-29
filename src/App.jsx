// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";

import posts from "./posts.js";
import FeatureCard from "./components/FeatureCard.jsx";
import CalendlyEmbed from "./components/CalendlyEmbed.jsx";
import { startCheckout } from "./stripe";

// NEW imports
import UploadSection from "./components/UploadSection.jsx"
import FeatureWorkflow from "./components/FeatureWorkflow.jsx";
import ProductPreview from "./components/ProductPreview.jsx";
import IllustratedFeature from "./components/IllustratedFeature.jsx";
import StripGallery from "./components/StripGallery.jsx";

/* --------------------------------------------
   Small inline icons used in feature sections
   -------------------------------------------- */
const IconRuler = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21l18-18M14 7l3 3M11 10l3 3M8 13l3 3M5 16l3 3" />
  </svg>
);

const IconExcel = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" className="opacity-20" />
    <path d="M8 7h8v10H8z" className="opacity-60" />
    <path d="M10 9l4 6m0-6l-4 6" />
  </svg>
);

const IconTemplate = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 10h16M10 4v16" />
  </svg>
);

// One-off price (set this in Vercel Environment Variables)
const ONE_OFF_PRICE = import.meta.env.VITE_STRIPE_PRICE_ONE_OFF || "";

export default function App() {
  // Latest 3 blog posts
  const latest = React.useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    []
  );

  const handleBuyOneOff = () => startCheckout({ priceId: ONE_OFF_PRICE });
  const handleSubscribePro = () => startCheckout();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">RQ</div>
            <span className="font-semibold">RailQuant AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-slate-900 text-slate-600">Features</a>
            <a href="#workflow" className="hover:text-slate-900 text-slate-600">How it works</a>
            <a href="#pricing" className="hover:text-slate-900 text-slate-600">Pricing</a>
            <a href="#contact" className="hover:text-slate-900 text-slate-600">Contact</a>
            <a href="#insights" className="hover:text-slate-900 text-slate-600">Blog</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Book a demo
            </a>
          </div>
        </div>
      </header>

      {/* Quick badges under navbar */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">🔒 NDA available</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">🇬🇧 UK-only hosting option</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">📊 Excel-first outputs</span>
        </div>
      </div>

      {/* HERO Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                AI software for rail construction estimating and drawing takeoffs.
              </h1>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Upload your drawings, let RailQuant AI handle takeoffs automatically, and export clean, Excel-ready results for your estimates.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                  Book a discovery call
                </a>
                <a href="#insights" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white">
                  Read product updates
                </a>
              </div>
            </div>

            <div className="relative">
              <ProductPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 - Workflow Section */}
      <FeatureWorkflow />

      {/* Illustrated Capabilities */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">What you can do with RailQuant</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <IllustratedFeature
              title="Drawing takeoffs"
              description="Extract quantities from PDFs/CAD with snapping and AI-assisted selection. Get counts, lengths and areas with repeatable logic."
              icon={<IconRuler />}
              imageLabel="Mark elements and measure"
            />
            <IllustratedFeature
              title="Excel-ready outputs"
              description="Structured CSV/XLS with named items, units and breakdowns that drop straight into pricing sheets."
              icon={<IconExcel />}
              imageLabel="Clean, tabular output"
            />
            <IllustratedFeature
              title="Repeatable templates"
              description="Templates and item libraries keep outputs consistent across projects and teams."
              icon={<IconTemplate />}
              imageLabel="Configure once, reuse often"
            />
          </div>
        </div>
      </section>

      {/* Thin visual gallery strip */}
      <section className="py-10 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <StripGallery />
        </div>
      </section>

      {/* FEATURES Section */}
      <section id="features" className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">Built for rail &amp; civils estimating</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard title="Drawing takeoffs" desc="Extract quantities directly from PDFs/CAD with AI-assisted selection and snapping." icon="DQ" delay={0} />
            <FeatureCard title="Excel-ready outputs" desc="Standardised CSV/XLS exports with named items, units, and breakdowns." icon="XL" delay={100} />
            <FeatureCard title="Repeatable templates" desc="Store item libraries and mapping to keep outputs consistent across projects." icon="TP" delay={200} />
            <FeatureCard title="Team review" desc="Track changes, comments, and approvals so QA is fast and visible." icon="RV" delay={300} />
            <FeatureCard title="UK data hosting" desc="Optional UK-only hosting for sensitive projects and compliance needs." icon="UK" delay={400} />
            <FeatureCard title="API & integrations" desc="Sync with SharePoint, OneDrive, or your CDE for faster workflows." icon="API" delay={500} />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* ONE-OFF */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">One-off</h3>
              <p className="mt-2 text-3xl font-bold">£99</p>
              <p className="text-sm text-slate-500">Pilot projects</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ Single deliverable</li>
                <li>✓ Email support</li>
              </ul>
              <button
                disabled={!ONE_OFF_PRICE}
                onClick={handleBuyOneOff}
                className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-50"
              >
                Buy one-off
              </button>
            </div>
<section id="takeoff" className="py-16 bg-slate-50">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <UploadSection />
  </div>
</section>
            {/* PRO SUBSCRIPTION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Pro</h3>
              <p className="mt-2 text-3xl font-bold">£299</p>
              <p className="text-sm text-slate-500">Per seat / month</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ AI takeoffs</li>
                <li>✓ Excel exports</li>
                <li>✓ Templates</li>
              </ul>
              <button onClick={handleSubscribePro} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                Subscribe to Pro
              </button>
            </div>

            {/* TEAM PLAN */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Team</h3>
              <p className="mt-2 text-3xl font-bold">Custom</p>
              <p className="text-sm text-slate-500">For organisations</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ SSO & controls</li>
                <li>✓ UK-only hosting option</li>
                <li>✓ Priority support</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
                Talk to sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Book a discovery call</h2>
              <p className="mt-2 text-slate-600 text-sm">
                Tell us about your estimating workflow. We’ll show how RailQuant can help streamline takeoffs and reporting.
              </p>
              <div className="mt-6">
                <CalendlyEmbed />
              </div>
            </div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <input type="hidden" name="access_key" value="01455b6d-f87d-4204-bd9e-f6671858f113" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Name" name="name" required />
                <input className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="Email" type="email" name="email" required />
                <textarea className="sm:col-span-2 h-32 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200" placeholder="What drawings do you work with?" name="message" rows={4} required />
              </div>
              <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-xs text-slate-500">
        <div className="space-x-4 mb-2">
          <a href="/privacy" className="underline">Privacy</a>
          <a href="/terms" className="underline">Terms</a>
        </div>
        © {new Date().getFullYear()} RailQuant AI. All rights reserved.
      </footer>
    </div>
  );
}
