import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const key = import.meta.env.VITE_WEB3FORMS_KEY;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: "New RailQuant lead via website",
          from_name: "RailQuant Landing",
          name: form.name,
          email: form.email,
          message: form.message,
          // Honeypot: leave empty
          botcheck: ""
        })
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Thanks — we’ve received your message. We’ll get back to you shortly."
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data?.message || "Something went wrong. Please try again."
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Network error. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Hidden honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          className="rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <textarea
          className="sm:col-span-2 h-32 rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="What drawings do you work with?"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
        />
      </div>

      {status.type === "success" && (
        <p className="mt-3 text-sm text-green-700">
          {status.message}
        </p>
      )}
      {status.type === "error" && (
        <p className="mt-3 text-sm text-red-600">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !key}
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
        title={!key ? "Missing VITE_WEB3FORMS_KEY" : undefined}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {!key && (
        <p className="mt-2 text-xs text-amber-700">
          Add <code>VITE_WEB3FORMS_KEY</code> in Vercel → Project → Settings → Environment Variables.
        </p>
      )}
    </form>
  );
}

