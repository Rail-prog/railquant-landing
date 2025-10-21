import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import posts from "./posts.js";
import FeatureCard from "./components/FeatureCard.jsx";
import ContactForm from "./components/ContactForm.jsx";

export default function App() {
  // latest three posts
  const latest = useMemo(
    () =>
      [...posts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">
              RQ
            </div>
            <span className="font-semibold">RailQuant AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-slate-900 text-slate-600">
              Features
            </a>
            <a href="#how" className="hover:text-slate-900 text-slate-600">
              How it works
            </a>
            <a href="#pricing" className="hover:text-slate-900 text-slate-600">
              Pricing
            </a>
            <a href="#contact" className="hover:text-slate-900 text-slate-600">
              Contact
            </a>
            <a href="#insights" className="hover:text-slate-900 text-slate-600">
              Blog
            </a>
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

      {/* HERO */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                AI software for rail construction estimating and drawing
                takeoffs.
              </h1>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Speed up quantities, reduce manual errors, and deliver
                Excel-ready outputs. Built for rail and civils estimators who
                need accuracy and repeatability.
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
              <div className="aspect-video w-full rounded-2xl border border-slate-200 bg-white shadow-sm grid place-items-center text-slate-400">
                <span className="text-sm">Product preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES – animated cards */}
      <section id="features" className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Built for rail &amp; civils estimating
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Drawing takeoffs"
              desc="Extract quantities directly from PDFs/CAD with AI-assisted selection and snapping."
              icon="DQ"
              delay={0}
            />
            <FeatureCard
              title="Excel-ready outputs"
              desc="Standardised CSV/XLS exports with named items, units, and breakdowns."
              icon="XL"
              delay={100}
            />
            <FeatureCard
              title="Repeatable templates"
              desc="Store item libraries and mapping to keep outputs consistent across projects."
              icon="TP"
              delay={200}
            />
            <FeatureCard
              title="Team review"
              desc="Track changes, comments, and approvals so QA is fast and visible."
              icon="RV"
              delay={300}
            />
            <FeatureCard
              title="UK data hosting"
              desc="Optional UK-only hosting for sensitive projects and compliance needs."
              icon="UK"
              delay={400}
            />
            <FeatureCard
              title="API & integrations"
              desc="Sync with SharePoint, OneDrive, or your CDE for faster workflows."
              icon="API"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                1
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Upload drawings
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                PDF or CAD. We detect layers and scales automatically.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                2
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Mark up with AI
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Use AI-assisted tools to measure, count, and categorise.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                3
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Export to Excel
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Configured item names, units, and quantities ready for pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Starter</h3>
              <p className="mt-2 text-3xl font-bold">£0</p>
              <p className="text-sm text-slate-500">Pilot projects</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ Limited features</li>
                <li>✓ Email support</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Pro</h3>
              <p className="mt-2 text-3xl font-bold">£149</p>
              <p className="text-sm text-slate-500">Per seat / month</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ AI takeoffs</li>
                <li>✓ Excel exports</li>
                <li>✓ Templates</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Team</h3>
              <p className="mt-2 text-3xl font-bold">Custom</p>
              <p className="text-sm text-slate-500">For organisations</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>✓ SSO &amp; controls</li>
                <li>✓ UK-only hosting option</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST INSIGHTS */}
      <section id="insights" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Latest insights</h2>
            <Link to="/blog" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <article
                key={p.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">
                  <Link to={`/post/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  {new Date(p.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  {p.content.replace(/\s+/g, " ").trim().slice(0, 120)}…
                </p>
                <Link to={`/post/${p.slug}`} className="text-slate-900 underline text-sm">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Book a discovery call
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Tell us about your estimating workflow. We’ll show how RailQuant can help.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li>✓ NDA available</li>
                <li>✓ UK-based data hosting option</li>
                <li>✓ Excel-first outputs</li>
              </ul>
            </div>

            {/* Drop-in form component (uses Web3Forms + env var) */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} RailQuant AI. All rights reserved.
      </footer>
    </div>
  );
}
