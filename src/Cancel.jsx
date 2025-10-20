import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Checkout canceled</h1>
      <p className="mt-3 text-slate-700">No charge was made.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
        Back to home
      </Link>
    </main>
  );
}





