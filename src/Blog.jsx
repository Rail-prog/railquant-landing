import { Link } from "react-router-dom";
import posts from "../posts.js";

export default function Blog() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Latest insights</h1>
      <div className="mt-8 space-y-8">
        {posts.map(p => (
          <article key={p.slug} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              <Link to={`/post/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-500 mt-1">{new Date(p.date).toLocaleDateString()}</p>
            <p className="text-slate-700 mt-3">{p.content}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

