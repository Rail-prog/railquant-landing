import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <main className="min-h-[60vh] grid place-items-center bg-slate-50 px-4">
      <div className="max-w-lg w-full rounded-2xl bg-white border border-slate-200 p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 grid place-items-center text-green-700">
          ✓
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Payment successful</h1>
        <p className="mt-3 text-slate-600">
          Thanks for your purchase. We’ve emailed you a receipt. You can return to the homepage below.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}



