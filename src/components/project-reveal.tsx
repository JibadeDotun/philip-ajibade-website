"use client";

import { useEffect, useRef } from "react";

export default function ProjectReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || preference.matches || typeof IntersectionObserver === "undefined" || typeof node.animate !== "function") return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      animation = node.animate([
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 700, easing: "cubic-bezier(.22,1,.36,1)" });
      observer.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    const stop = () => { if (preference.matches) { animation?.cancel(); observer.disconnect(); } };
    preference.addEventListener?.("change", stop);
    observer.observe(node);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener?.("change", stop); };
  }, []);
  return <div ref={element} className={className}>{children}</div>;
}
