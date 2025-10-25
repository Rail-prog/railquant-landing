// src/App.jsx
import React from "react";
import { Link } from "react-router-dom";

import posts from "./posts.js";
import FeatureCard from "./components/FeatureCard.jsx";
import CalendlyEmbed from "./components/CalendlyEmbed.jsx";
import { startCheckout } from "./stripe";
import ProductPreview from "./components/ProductPreview.jsx";
import StripGallery from "./components/StripGallery.jsx";

// Public env for one-off price (Vercel: VITE_STRIPE_PRICE_ONE_OFF=price_xxx)
const ONE_OFF_PRICE = import.meta.env.VITE_STRIPE_PRICE_ONE_OFF || "";

export default function App() {
  // latest three posts
  const latest = React.useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    []
  );

  const handleBuyOneOff = () => startCheckout({ priceId: ONE_OFF_PRICE });
  const handleSubscribePro = () => startCheckout(); // server defaults to PRO

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">
              RQ
            </div>
            <span className="font-semibold">RailQuant AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-slate-900 text-slate-600">Features</a>
            <a href="#how" className="hover:text-slate-900 text-slate-600">How it works</a>
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

      {/* QUICK BADGES */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">🔒 NDA available</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">🇬🇧 UK-only hosting option</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">📊 Excel-first outputs</span>
        </div>
      </div>

      {/* HERO with ProductPreview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                AI software for rail construction estimating and drawing takeoffs.
              </h1>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Upload your drawings, let RailQuant AI handle takeoffs automatically, and export clean,
                Excel-ready results for your estimates.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Book a discovery call
                </a>
                <a
                  href="#insights"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
                >
                  Read product updates
                </a>
              </div>

              <div className="mt-6 text-xs text-slate-500 space-x-2">
                <span>NDA available</span>
                <span>• UK-based data hosting option</span>
                <span>• Excel-first outputs</span>
              </div>
            </div>

            <div className="relative">
              <ProductPreview />
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITY PILLS */}
      <section className="py-10 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">What you can do with RailQuant</h2>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[
              { title: "Drawing takeoffs", icon: "🖊️" },
              { title: "AI takeoffs", icon: "🤖" },
              { title: "Excel-ready outputs", icon: "📊" },
              { title: "Repeatable templates", icon: "🗂️" },
            ].map(({ title, icon }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-base">
                  {icon}
                </div>
                <div className="font-medium text-slate-900">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEE HOW RAILQUANT TRANSFORMS WORKFLOW */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            See how RailQuant AI transforms your workflow
          </h2>
          <StripGallery />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">How RailQuant AI Works</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Upload Drawings",
                desc: "Import PDFs or CAD files directly. RailQuant detects layers, scales, and symbols automatically.",
              },
              {
                step: 2,
                title: "AI Take-off",
                desc: "AI identifies and quantifies elements—linear, area, and count measurements—ready for validation.",
              },
              {
                step: 3,
                title: "Excel Output",
                desc: "Export consistent, structured Excel files with item names, units, and breakdowns for pricing.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                  {step}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ... (rest of file remains unchanged — Features, Pricing, Insights, Contact, Footer) */}
    </div>
  );
}
