import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function Blog() {
  const ordered = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {ordered.map((p) => (
          <li key={p.slug} className="border rounded-xl p-5 bg-white">
            <h2 className="text-xl font-semibold">
              <Link to={`/post/${p.slug}`} className="underline">
                {p.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {new Date(p.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-slate-700 mt-3">
              {p.content.replace(/\s+/g, " ").slice(0, 160)}…
            </p>
            <div className="mt-3">
              <Link to={`/post/${p.slug}`} className="underline">
                Read more →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

