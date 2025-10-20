import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function Blog() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Product updates</h1>
      <ul className="space-y-6">
        {sorted.map(p => (
          <li key={p.slug} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              <Link className="hover:underline" to={`/post/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {new Date(p.date).toLocaleDateString()}
            </p>
            <p className="mt-3 text-sm text-slate-700">
              {p.content.replace(/\s+/g, " ").trim().slice(0, 160)}…
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
