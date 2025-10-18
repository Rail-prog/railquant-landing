import { useParams, Link } from "react-router-dom";
import posts from "./posts";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-slate-500 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="prose prose-slate max-w-none whitespace-pre-line">
        {post.content}
      </div>
      <Link
        to="/blog"
        className="text-blue-600 hover:underline mt-8 inline-block"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}

