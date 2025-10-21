// src/components/FeatureCard.jsx
import useInView from "../hooks/useInView";

export default function FeatureCard({ title, desc, icon = null, delay = 0 }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        "transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft",
        "opacity-0 motion-safe:animate-fadeInUp",
        inView ? "opacity-100" : "opacity-0"
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-slate-900 text-white text-sm font-semibold">
            {icon}
          </div>
        ) : null}
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

