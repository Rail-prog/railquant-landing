import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-3">Checkout canceled</h1>
      <p className="text-slate-600 mb-6">
        No charge was made. You can try again any time.
      </p>
      <Link to="/" className="underline">← Back to homepage</Link>
    </main>
  );
}



