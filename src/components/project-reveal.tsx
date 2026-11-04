"use client";

import { useEffect, useRef } from "react";

/** Largest tilt, in degrees. Kept small because the project cards are wide. */
const MAX_TILT = 5;

export default function ProjectReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);

  // Entrance: fade and rise once the card scrolls into view.
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

  // Hover: the card tilts towards the pointer. Mouse and trackpad only, and never with reduced motion.
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let latest: PointerEvent | undefined;

    const apply = () => {
      frame = 0;
      if (!latest) return;
      const box = node.getBoundingClientRect();
      const x = Math.min(Math.max((latest.clientX - box.left) / box.width, 0), 1) - 0.5;
      const y = Math.min(Math.max((latest.clientY - box.top) / box.height, 0), 1) - 0.5;
      node.style.setProperty("--tilt-x", `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
      node.style.setProperty("--tilt-y", `${(x * MAX_TILT * 2).toFixed(2)}deg`);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !finePointer.matches || reducedMotion.matches) return;
      latest = event;
      node.dataset.tilting = "true";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      latest = undefined;
      delete node.dataset.tilting;
      node.style.removeProperty("--tilt-x");
      node.style.removeProperty("--tilt-y");
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    reducedMotion.addEventListener?.("change", reset);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      reducedMotion.removeEventListener?.("change", reset);
      reset();
    };
  }, []);

  return <div ref={element} className={className}>{children}</div>;
}
