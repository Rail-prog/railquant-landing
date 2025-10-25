import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <main className="min-h-[60vh] grid place-items-center bg-slate-50 px-4">
      <div className="max-w-lg w-full rounded-2xl bg-white border border-slate-200 p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-amber-100 grid place-items-center text-amber-700">
          !
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Checkout canceled</h1>
        <p className="mt-3 text-slate-600">
          No charge was made. You can try again any time, or contact us if you need help.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Back to Home
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}


