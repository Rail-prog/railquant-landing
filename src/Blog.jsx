import React from 'react';

import { Link } from "react-router-dom";
import posts from "./posts.js";

export default function Blog() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">RailQuant Blog</h1>
      <p className="text-slate-600 mb-8">Insights on AI, rail construction estimating, and drawing takeoffs.</p>

      <ul className="space-y-6">
        {sorted.map((p) => (
          <li key={p.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              <Link to={`/post/${p.slug}`} className="hover:underline">{p.title}</Link>
            </h2>
            <p className="text-xs text-slate-500 mt-1">{new Date(p.date).toLocaleDateString()}</p>
            <p className="text-sm text-slate-700 mt-3">{p.content}</p>
            <Link to={`/post/${p.slug}`} className="inline-block mt-3 underline text-slate-900">Read article →</Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm">
        <Link to="/" className="underline">← Back to home</Link>
      </p>
    </main>
  );
}
