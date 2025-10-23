import React from "react";

const steps = [
  {
    number: 1,
    title: "Upload Drawings",
    description: "Import PDFs or CAD files directly. RailQuant AI detects layers, scales, and symbols automatically.",
    icon: "📁",
  },
  {
    number: 2,
    title: "AI Take-off",
    description: "AI identifies and quantifies elements—linear, area, and count measurements—ready for validation.",
    icon: "🤖",
  },
  {
    number: 3,
    title: "Excel Output",
    description: "Export consistent, structured Excel files with item names, units, and breakdowns for pricing.",
    icon: "📊",
  },
];

export default function FeatureWorkflow() {
  return (
    <section id="workflow" className="py-20 bg-white border-y border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          How RailQuant AI Works
        </h2>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
              <span className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-bold">
                {step.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

