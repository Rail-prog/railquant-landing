import React from "react";

/**
 * ProductPreview
 * - Shows an HTML5 <video> with poster, sources, captions, and simple controls.
 * - Autoplay is muted (required by browsers). User can unmute.
 */
export default function ProductPreview() {
  const videoRef = React.useRef(null);
  const [isMuted, setMuted] = React.useState(true);
  const [isPlaying, setPlaying] = React.useState(false);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
        setPlaying(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="aspect-video w-full rounded-2xl border border-slate-200 bg-white shadow-sm"
        controls={false}
        autoPlay
        muted
        playsInline
        poster="/media/preview-poster.png"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {/* Primary MP4 (H.264 + AAC) */}
        <source src="/media/preview-video.mp4" type="video/mp4" />
        {/* Optional WebM fallback */}
        <source src="/media/preview-video.webm" type="video/webm" />
        {/* Captions */}
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="/media/workflow-captions.vtt"
          default
        />
        Your browser does not support the video tag.
      </video>

      {/* Simple controls overlay */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={togglePlay}
          className="rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold shadow hover:bg-white"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={toggleMute}
          className="rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold shadow hover:bg-white"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}
