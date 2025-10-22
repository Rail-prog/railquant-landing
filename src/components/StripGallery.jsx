import React from "react";

export default function StripGallery({ images = [] }) {
  if (!images.length) return null;
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-full py-2">
        {images.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            className="h-40 w-auto rounded-lg border border-slate-200 shadow-sm"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

