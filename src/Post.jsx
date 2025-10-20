import { useParams, Link, useNavigate } from "react-router-dom";
import posts from "../posts.js";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    navigate("/blog");
    return null;
  }

  return (
    <article className="container py-12 prose max-w-3xl">
      <Link to="/blog" className="no-underline">← Back to insights</Link>
      <h1>{post.title}</h1>
      <p className="text-slate-500">{post.date}</p>
      <p>{post.body}</p>
    </article>
  );
}
