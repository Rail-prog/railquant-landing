import { useParams, Link } from "react-router-dom";
import posts from "./posts.js";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto py-10 px-4">
        <p className="mb-4">Post not found.</p>
        <Link className="underline" to="/blog">← Back to blog</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <p className="text-sm text-slate-500 mb-2">
        <Link className="underline" to="/blog">← Back to blog</Link>
      </p>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </main>
  );
}
