import React from "react";
import { Link } from "react-router-dom";
import posts from "./posts.js";
import FeatureCard from "./components/FeatureCard.jsx";
import CalendlyEmbed from "./components/CalendlyEmbed.jsx";

export default function App() {
  // latest three posts
  const latest = React.useMemo(
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
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">🔒 NDA available</span>
  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">🇬🇧 UK-only hosting option</span>
  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">📊 Excel-first outputs</span>
</div>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                AI software for rail construction estimating and drawing takeoffs.
              </h1>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Speed up quantities, reduce manual errors, and deliver Excel-ready outputs.
                Built for rail and civils estimators who need accuracy and repeatability.
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

      {/* FEATURES */}
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
            {[
              {
                step: 1,
                title: "Upload drawings",
                desc: "PDF or CAD. We detect layers and scales automatically.",
              },
              {
                step: 2,
                title: "Mark up with AI",
                desc: "Use AI-assisted tools to measure, count, and categorise.",
              },
              {
                step: 3,
                title: "Export to Excel",
                desc: "Configured item names, units, and quantities ready for pricing.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                  {step}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "£0",
                note: "Pilot projects",
                features: ["✓ Limited features", "✓ Email support"],
              },
              {
                name: "Pro",
                price: "£149",
                note: "Per seat / month",
                features: ["✓ AI takeoffs", "✓ Excel exports", "✓ Templates"],
              },
              {
                name: "Team",
                price: "Custom",
                note: "For organisations",
                features: [
                  "✓ SSO & controls",
                  "✓ UK-only hosting option",
                  "✓ Priority support",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-3xl font-bold">{plan.price}</p>
                <p className="text-sm text-slate-500">{plan.note}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST INSIGHTS */}
      <section id="insights" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Latest insights
            </h2>
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
                <Link
                  to={`/post/${p.slug}`}
                  className="text-slate-900 underline text-sm"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (with Calendly) */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Book a discovery call
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Tell us about your estimating workflow. We’ll show how RailQuant
                can help streamline takeoffs and reporting.
              </p>

              <div className="mt-6">
                <CalendlyEmbed />
              </div>
            </div>

            <form
  action="https://api.web3forms.com/submit"
  method="POST"
  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
  onSubmit={() => window.gtag && window.gtag('event','generate_lead',{method:'webform'})}
>

              <input
                type="hidden"
                name="access_key"
                value="01455b6d-f87d-4204-bd9e-f6671858f113"
              />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Name"
                  name="name"
                  required
                />
                <input
                  className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
                <textarea
                  className="sm:col-span-2 h-32 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="What drawings do you work with?"
                  name="message"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
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

