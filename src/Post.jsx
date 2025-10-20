import { useParams, Link } from "react-router-dom";
import posts from "../posts.js";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-slate-700">Post not found.</p>
        <Link to="/blog" className="text-slate-900 underline">Go back</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>{post.title}</h1>
      <p className="text-xs">{new Date(post.date).toLocaleDateString()}</p>
      <p>{post.content}</p>
      <p><Link to="/blog" className="text-slate-900 underline">← Back to all posts</Link></p>
    </main>
  );
}


  
