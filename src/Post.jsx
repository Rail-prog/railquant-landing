import React from "react";
import { useParams, Link } from "react-router-dom";
import posts from "./posts.js";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post)
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <Link to="/blog" className="text-slate-700 underline">
            Back to blog
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {post.title}
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          {new Date(post.date).toLocaleDateString()} — {post.author}
        </p>
        <div className="prose prose-slate">
          {post.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <Link to="/blog" className="block mt-10 text-slate-700 underline text-sm">
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
