import React from "react";

/**
 * Props:
 *  - poster: string  (fallback image in /public)
 *  - src: string     (mp4 in /public)
 *  - caption?: string
 */
export default function ProductPreview({ poster = "/og-image.png", src = "/videos/product-preview.mp4", caption = "2-min product overview" }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Inline player (muted/loop) */}
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <video
          className="h-full w-full object-cover"
          poster={poster}
          muted
          autoPlay
          playsInline
          loop
          controls={false}
          onClick={() => setOpen(true)}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Play overlay */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 grid place-items-center"
          aria-label="Open product video"
        >
          <span className="transition opacity-90 group-hover:opacity-100 inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-white text-sm shadow">
            ▶ Play full video
          </span>
        </button>

        <div className="absolute bottom-3 left-3 text-xs text-slate-600 bg-white/80 backdrop-blur px-2 py-1 rounded">
          {caption}
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="mx-auto mt-10 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <video className="w-full h-full" controls autoPlay playsInline>
                <source src={src} type="video/mp4" />
              </video>
              <button
                className="absolute top-2 right-2 rounded-full bg-white/90 px-3 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

