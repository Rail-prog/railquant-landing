import React from "react";
import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-10">Blog</h1>
        <div className="grid gap-6">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/post/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                {new Date(p.date).toLocaleDateString()} — {p.author}
              </p>
              <p className="text-sm text-slate-600 mb-4">
                {p.content.replace(/\s+/g, " ").trim().slice(0, 160)}…
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
    </div>
  );
}

