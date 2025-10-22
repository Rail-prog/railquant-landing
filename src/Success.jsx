import React from "react";

export default function Success() {
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState("");
  const [summary, setSummary] = React.useState(null);

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  React.useEffect(() => {
    let mounted = true;

    async function fetchSession() {
      try {
        if (!sessionId) {
          setErr("Missing session ID.");
          setLoading(false);
          return;
        }
        // lightweight fetch direct from Stripe public endpoint is not allowed; keep it simple:
        // we’ll infer from query only and let user manage via portal
        setSummary({ sessionId });
      } catch (e) {
        setErr(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchSession();
    return () => (mounted = false);
  }, [sessionId]);

  async function openPortal() {
    try {
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to open portal");
      window.location.href = data.url;
    } catch (e) {
      alert(e.message);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Processing…</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Thank you!</h1>
      {err ? (
        <p className="mt-4 text-sm text-red-600">{err}</p>
      ) : (
        <>
          <p className="mt-4 text-slate-700">
            Your payment was successful. You’ll receive an email receipt from Stripe.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={openPortal}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Manage billing
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              Back to site
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Reference: <span className="font-mono">{summary?.sessionId}</span>
          </p>
        </>
      )}
    </div>
  );
}


