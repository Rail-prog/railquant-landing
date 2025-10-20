// src/App.jsx
import { Link } from "react-router-dom";
import posts from "./posts.js";
import { stripePromise } from "./stripe";

export default function App() {
  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  async function handleProCheckout() {
    const stripe = await stripePromise;
    if (!stripe) {
      alert("Stripe failed to load. Please refresh and try again.");
      return;
    }
    await stripe.redirectToCheckout({
      lineItems: [{ price: import.meta.env.VITE_STRIPE_PRICE_PRO, quantity: 1 }],
      mode: "subscription",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Top Nav */}
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
            <Link to="/blog" className="hover:text-slate-900 text-slate-600">
              Blog
            </Link>
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

      {/* Hero */}
      <main>
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
                  <Link
                    to="/blog"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
                  >
                    Read product updates
                  </Link>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  NDA available • UK-based data hosting option • Excel-first
                  outputs
                </p>
              </div>

              <div className="relative">
                <div className="aspect-video w-full rounded-2xl border border-slate-200 bg-white shadow-sm grid place-items-center text-slate-400">
                  <span className="text-sm">Product preview</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 bg-white border-y border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Built for rail & civils estimating
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Drawing takeoffs",
                  desc:
                    "Extract quantities directly from PDFs/CAD with AI-assisted selection and snapping.",
                },
                {
                  title: "Excel-ready outputs",
                  desc:
                    "Standardised CSV/XLS exports with named items, units, and breakdowns.",
                },
                {
                  title: "Repeatable templates",
                  desc:
                    "Store item libraries and mapping to keep outputs consistent across projects.",
                },
                {
                  title: "Team review",
                  desc:
                    "Track changes, comments, and approvals so QA is fast and visible.",
                },
                {
                  title: "UK data hosting",
                  desc:
                    "Optional UK-only hosting for sensitive projects and compliance needs.",
                },
                {
                  title: "API & integrations",
                  desc:
                    "Sync with SharePoint, OneDrive, or your CDE for faster workflows.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Upload drawings",
                  desc: "PDF or CAD. We detect layers and scales automatically.",
                },
                {
                  step: "2",
                  title: "Mark up with AI",
                  desc: "Use AI-assisted tools to measure, count, and categorise.",
                },
                {
                  step: "3",
                  title: "Export to Excel",
                  desc:
                    "Configured item names, units, and quantities ready for pricing.",
                },
              ].map((s) => (
                <li
                  key={s.step}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-bold">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "£0",
                  note: "Pilot projects",
                  features: ["Up to 2 projects", "Excel export", "Email support"],
                  cta: { type: "anchor", label: "Start trial", href: "#contact" },
                },
                {
                  name: "Pro",
                  price: "£299",
                  note: "Per seat / month",
                  features: [
                    "Unlimited projects",
                    "Templates & libraries",
                    "Priority support",
                  ],
                  cta: { type: "stripe", label: "Subscribe – £299/mo" },
                },
                {
                  name: "Team",
                  price: "Custom",
                  note: "For organisations",
                  features: ["SAML/SSO", "UK-only hosting option", "Onboarding & training"],
                  cta: { type: "anchor", label: "Talk to sales", href: "#contact" },
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col"
                >
                  <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
                  <div className="mt-2 text-3xl font-bold text-slate-900">
                    {p.price}
                  </div>
                  <div className="text-xs text-slate-500">{p.note}</div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {p.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>

                  {p.cta.type === "anchor" ? (
                    <a
                      href={p.cta.href}
                      className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                    >
                      {p.cta.label}
                    </a>
                  ) : (
                    <button
                      onClick={handleProCheckout}
                      className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                    >
                      {p.cta.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest insights */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-900">Latest insights</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold">
                    <Link to={`/post/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="mt-3 text-slate-600 text-sm">
                    {post.content.substring(0, 160)}…
                  </p>
                  <Link
                    to={`/post/${post.slug}`}
                    className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/blog" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Book a discovery call
                </h2>
                <p className="mt-2 text-slate-600 text-sm">
                  Tell us about your estimating workflow. We’ll show how RailQuant
                  can help.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-600">
                  <li>✓ NDA available</li>
                  <li>✓ UK-based data hosting option</li>
                  <li>✓ Excel-first outputs</li>
                </ul>
              </div>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
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
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} RailQuant AI. All rights reserved.
      </footer>
    </div>
  );
}
