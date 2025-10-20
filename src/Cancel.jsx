// src/Cancel.jsx
export default function Cancel() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-slate-900">Checkout canceled</h1>
      <p className="mt-4 text-slate-600">
        No charge was made. You can try again any time.
      </p>
      <a href="/" className="mt-6 inline-block underline">Back to home</a>
    </main>
  );
}

