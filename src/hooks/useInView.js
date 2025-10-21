// src/hooks/useInView.js
import { useEffect, useRef, useState } from "react";

export default function useInView(options = { threshold: 0.15, rootMargin: "0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect(); // animate once
      }
    }, options);

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

