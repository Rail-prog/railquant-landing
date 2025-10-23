import React from "react";

/**
 * Displays the main product demo video in the hero section.
 * Put your file at: public/media/product-preview.mp4
 */
export default function ProductPreview() {
  return (
    <div className="relative">
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
        <video
          className="h-full w-full"
          src="/media/product-preview.mp4"
          poster="/media/product-preview.jpg"
          playsInline
          muted
          loop
          autoPlay
          controls
        />
      </div>
      <p className="mt-2 text-center text-xs text-slate-500">
        Demo: Upload drawings → AI take-off → Excel output
      </p>
    </div>
  );
}

