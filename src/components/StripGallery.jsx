// src/components/StripGallery.jsx
import React from "react";

export default function StripGallery() {
  const steps = [
    {
      img: "/upload-drawing.png",
      title: "1. Upload your drawings",
      desc: "Upload your PDF or CAD files directly — RailQuant detects layers and scales automatically.",
    },
    {
      img: "/ai-takeoff.png",
      title: "2. AI identifies and quantifies",
      desc: "The AI recognises cables, pipes, and structures — and automatically measures lengths, counts, and areas.",
    },
    {
      img: "/excel-export.png",
      title: "3. Export Excel-ready quantities",
      desc: "Instantly download a formatted Excel sheet with all item names, units, and quantities for pricing.",
    },
    {
      img: "/template-setup.png",
      title: "4. Configure reusable templates",
      desc: "Save mappings and item templates for consistent, repeatable takeoffs across future projects.",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
        See how RailQuant AI transforms your workflow
      </h2>

      <div className="flex gap-6 min-w-max">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-72 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-44 object-cover rounded-t-2xl border-b border-slate-200"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 leading-snug">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-4 text-xs text-slate-500">
        Scroll sideways → to preview the AI-assisted takeoff flow
      </p>
    </div>
  );
}
