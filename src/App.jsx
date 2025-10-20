import { Link } from "react-router-dom";
import posts from "./posts.js";
import SubscribeButton from "./components/SubscribeButton.jsx";

export default function App() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      {/* HERO SECTION */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          AI software for rail construction estimating and drawing takeoffs.
        </h1>
        <p className="text-lg text-slate-600 mb-6">
          Speed up quantities, reduce manual errors, and deliver Excel-ready
          outputs. Built for rail and civils estimators who need accuracy and
          repeatability.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/contact"
            className="rounded-lg px-4 py-2 font-medium bg-slate-900 text-white hover:bg-slate-700"
          >
            Book a discovery call
          </Link>

          <Link
            to="/blog"
            className="rounded-lg px-4 py-2 bg-slate-100 hover:bg-slate-200"
          >
            Read product updates
          </Link>

          {/* ✅ PAYMENT BUTTON ADDED HERE */}
          <SubscribeButton label="Start subscription" />
        </div>

        <p className="mt-4 text-sm text-slate-500">
          NDA available • UK-based data hosting option • Excel-first outputs
        </p>
      </section>

      {/* LATEST INSIGHTS / BLOG SECTION */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest insights</h2>

        <div className="space-y-6">
          {sorted.slice(0, 3).map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {p.title}
              </h2>
              <p className="text-sm text-slate-500 mb-2">
                {new Date(p.date).toLocaleDateString()}
              </p>
              <p className="text-slate-600 mb-4">
                {p.content.substring(0, 120)}…
              </p>
              <Link
                to={`/post/${p.slug}`}
                className="text-slate-900 underline hover:no-underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/blog"
            className="text-slate-900 underline hover:no-underline"
          >
            View all
          </Link>
        </div>
      </section>
    </main>
  );
}
