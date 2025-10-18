import { useParams, Link } from 'react-router-dom';
import posts from './post.js';

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="max-w-3xl mx-auto py-10 px-4">
        <p className="mb-4">Post not found.</p>
        <Link to="/blog" className="underline">← Back to blog</Link>
      </section>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <p className="text-sm text-slate-500 mb-2">
        <Link to="/blog" className="underline">← Back to blog</Link>
      </p>
      <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
      <p className="text-xs text-slate-500 mt-1 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {/* Your posts use plain `content`. If you later switch to HTML, we can change this to render HTML safely. */}
      <div className="prose max-w-none text-slate-800">
        <p>{post.content}</p>
      </div>
    </article>
  );
}

