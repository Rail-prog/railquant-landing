import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function App() {
  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

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
            <a href="#features" className="hover:text-slate-900 text-slate-600">Features</a>
            <a href="#how" className="hover:text-slate-900 text-slate-600">How it works</a>
            <a href="#pricing" className="hover:text-slate-900 text-slate-600">Pricing</a>
            <a href="#contact" className="hover:text-slate-900 text-slate-600">Contact</a>
            <Link to="/blog" className="hover:text-slate-900 text-slate-600">Blog</Link>
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
                  AI software for rail construction estimating and drawing takeoffs.
                </h1>

                <p className="mt-6 text-slate-600 leading-relaxed">
                  Speed up quantities, reduce manual errors, and deliver Excel-ready outputs. Built for rail and
                  civils estimators who need accuracy and repeatability.
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
                  NDA available • UK-based data hosting option • Excel-first outputs
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

        {/* ------------------- */}
        {/* LATEST INSIGHTS     */}
        {/* ------------------- */}
        <section id="insights" className="py-16 bg-white border-t border-slate-200">
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
                    {p.content.replace(/\s+/g, " ").trim().slice(0, 110)}…
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
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} RailQuant AI. All rights reserved.
      </footer>
    </div>
  );
}
