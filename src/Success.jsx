import { Link } from "react-router-dom";

export default function Success() {
  return (
    <section className="container py-16 text-center">
      <h1 className="h1">🎉 Subscription confirmed</h1>
      <p className="mt-4 text-slate-600">
        Thanks for subscribing. We’ve sent a confirmation email.
      </p>
      <Link className="btn btn-primary mt-8" to="/">Back to site</Link>
    </section>
  );
}

