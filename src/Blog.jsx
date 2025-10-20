import { Link } from "react-router-dom";
import posts from "../posts.js";

export default function Blog() {
  return (
    <section className="container py-12">
      <h1 className="h1">Latest insights</h1>
      <div className="mt-6 grid gap-6">
        {posts.map((p) => (
          <Link to={`/blog/${p.slug}`} key={p.slug} className="card hover:bg-slate-50">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-2 text-slate-600">{p.excerpt}</p>
            <span className="mt-3 inline-block text-sm font-medium text-slate-900">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
