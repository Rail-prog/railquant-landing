import React from "react";

export default function IllustratedFeature({ title, desc, icon }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="h-10 w-10 shrink-0 grid place-items-center rounded-full bg-slate-900 text-white font-semibold">
        {icon ?? "★"}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}


