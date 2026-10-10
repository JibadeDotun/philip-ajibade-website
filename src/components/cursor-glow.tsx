"use client";

import { useEffect, useRef } from "react";
import styles from "./cursor-glow.module.css";

export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = glow.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let previousTime = 0;
    let initialized = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    function animate(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      const easing = 1 - Math.exp(-elapsed / 150);
      x += (targetX - x) * easing;
      y += (targetY - y) * easing;
      element!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
        previousTime = 0;
      }
    }

    function move(event: PointerEvent) {
      if (motion.matches || !pointer.matches || event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!initialized) { x = targetX; y = targetY; initialized = true; }
      element!.dataset.active = "true";
      if (!frame) frame = requestAnimationFrame(animate);
    }

    function reset() {
      delete element!.dataset.active;
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      initialized = false;
    }

    function preferencesChanged() {
      reset();
      element!.style.removeProperty("transform");
    }

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    motion.addEventListener("change", preferencesChanged);
    pointer.addEventListener("change", preferencesChanged);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      motion.removeEventListener("change", preferencesChanged);
      pointer.removeEventListener("change", preferencesChanged);
    };
  }, []);

  return <div className={styles.viewport} aria-hidden="true"><div ref={glow} className={styles.glow} /></div>;
}
