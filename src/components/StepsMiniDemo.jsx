import React from "react";

export default function StepsMiniDemo() {
  const steps = [
    {
      n: 1,
      title: "Upload drawings",
      text: "PDF or CAD. We detect layers and scales automatically.",
    },
    {
      n: 2,
      title: "Mark up with AI",
      text: "Use AI-assisted tools to measure, count, and categorise.",
    },
    {
      n: 3,
      title: "Export to Excel",
      text: "Configured item names, units and quantities ready for pricing.",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((s, i) => (
        <div
          key={s.n}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md"
          style={{ animation: `fadeInUp 0.5s ease ${i * 0.06}s both` }}
        >
          <div className="h-9 w-9 grid place-items-center rounded-full bg-slate-900 text-white text-sm font-semibold">
            {s.n}
          </div>
          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            {s.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{s.text}</p>
        </div>
      ))}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

