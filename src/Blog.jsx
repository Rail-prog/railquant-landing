import { Link } from "react-router-dom";
import posts from "./Post.js";


export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">RailQuant Blog</h1>
      <p className="text-slate-600 mb-8">
        Insights on AI, rail construction estimating, and drawing takeoffs.
      </p>

      <ul className="space-y-6">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className="border-b border-slate-200 pb-6 last:border-none"
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link
                to={`/post/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-slate-500 text-sm mb-2">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-slate-700">
              {post.content.substring(0, 130)}...
            </p>
            <Link
              to={`/post/${post.slug}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read more →
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

