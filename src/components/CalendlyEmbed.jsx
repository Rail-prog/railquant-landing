// src/components/CalendlyEmbed.jsx
import React from "react";

export default function CalendlyEmbed() {
  return (
    <div className="aspect-[16/9] w-full rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <iframe
        src="https://calendly.com/vasivancea/30min?hide_event_type_details=1&hide_gdpr_banner=1"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Book a Discovery Call"
      ></iframe>
    </div>
  );
}


