import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Thanks! 🎉</h1>
      <p className="mt-3 text-slate-700">Your subscription is set up.</p>
      {sessionId && (
        <p className="mt-2 text-xs text-slate-500">
          Session ID: <code>{sessionId}</code>
        </p>
      )}
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
        Back to home
      </Link>
    </main>
  );
}




