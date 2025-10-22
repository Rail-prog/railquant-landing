import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  useEffect(() => {
    // Optional GA4 event
    if (window.gtag) {
      window.gtag("event", "checkout_cancel", { method: "stripe_checkout" });
    }
  }, []);

  return (
    <main className="min-h-[60vh] grid place-items-center bg-slate-50 px-4">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-amber-100 grid place-items-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Checkout canceled</h1>
        <p className="mt-2 text-slate-600">
          No charge was made. You can try again any time.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to home
          </Link>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            View pricing
          </a>
        </div>
      </div>
    </main>
  );
}

