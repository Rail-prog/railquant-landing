import React from "react";

/**
 * StripGallery
 * -----------------------------------------
 * A horizontal, scrollable strip of feature images
 * showing how RailQuant AI processes drawings and
 * exports takeoffs to Excel.
 *
 * You can drop your real screenshots in /public/gallery/
 *   e.g.  drawing-ai.jpg, excel-output.jpg, template.jpg
 * -----------------------------------------
 */

const galleryItems = [
  {
    src: "/gallery/upload-drawing.jpg",
    caption: "1. Upload your rail or civils drawings",
  },
  {
    src: "/gallery/ai-takeoff.jpg",
    caption: "2. AI identifies and quantifies elements",
  },
  {
    src: "/gallery/excel-output.jpg",
    caption: "3. Export Excel-ready quantities instantly",
  },
  {
    src: "/gallery/template-setup.jpg",
    caption: "4. Configure reusable templates",
  },
];

export default function StripGallery() {
  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold text-slate-900 mb-8 text-center">
        See how RailQuant AI transforms your workflow
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 snap-x snap-mandatory px-2">
          {galleryItems.map((item, idx) => (
            <figure
              key={idx}
              className="snap-center shrink-0 w-80 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="aspect-video bg-slate-100 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-4 text-sm text-slate-700 text-center">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        Scroll sideways → to preview the AI-assisted takeoff flow
      </p>
    </div>
  );
}

