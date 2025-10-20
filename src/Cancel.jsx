import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <section className="container py-16 text-center">
      <h1 className="h1">Payment canceled</h1>
      <p className="mt-4 text-slate-600">
        No charge was made. You can try again anytime.
      </p>
      <Link className="btn btn-primary mt-8" to="/">Back to site</Link>
    </section>
  );
}


