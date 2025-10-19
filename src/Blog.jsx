import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function Blog() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Blog</h1>

      <div className="space-y-6">
        {sorted.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              <Link
                to={`/post/${p.slug}`}
                className="text-blue-600 hover:underline"
              >
                {p.title}
              </Link>
            </h2>

            <p className="text-sm text-slate-500 mb-2">
              {new Date(p.date).toLocaleDateString()}
            </p>

            <p className="text-slate-700 mb-4">
              {p.content.slice(0, 120)}…
            </p>

            <Link
              to={`/post/${p.slug}`}
              className="text-blue-600 hover:underline text-sm"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

