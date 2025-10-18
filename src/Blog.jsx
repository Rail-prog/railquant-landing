import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function Blog() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Blog</h1>

      <div className="space-y-6">
        {sorted.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              <Link to={`/post/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-3">
              {new Date(p.date).toLocaleDateString()}
            </p>
            <p className="text-slate-700">
              {p.content.replace(/\s+/g, " ").trim().slice(0, 160)}…
            </p>
            <div className="mt-3">
              <Link to={`/post/${p.slug}`} className="underline text-slate-900">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8">
        <Link to="/" className="underline">
          ← Back to home
        </Link>
      </p>
    </main>
  );
}
