"use client";

import Link from "next/link";
import { useEffect, useRef, type PointerEvent } from "react";
import styles from "../app/gateway.module.css";

function edgeClip(event: PointerEvent<HTMLAnchorElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const edges = [
    { distance: Math.abs(event.clientX - rect.left), clip: "inset(0 100% 0 0)" },
    { distance: Math.abs(event.clientX - rect.right), clip: "inset(0 0 0 100%)" },
    { distance: Math.abs(event.clientY - rect.top), clip: "inset(0 0 100% 0)" },
    { distance: Math.abs(event.clientY - rect.bottom), clip: "inset(100% 0 0 0)" },
  ];
  return edges.reduce((nearest, edge) => edge.distance < nearest.distance ? edge : nearest).clip;
}

export default function DirectionalLink({ href, children }: { href: string; children: string }) {
  const layer = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);

  useEffect(() => () => animation.current?.cancel(), []);

  function highlight(event: PointerEvent<HTMLAnchorElement>, entering: boolean) {
    if (event.pointerType !== "mouse" || !layer.current) return;
    const element = layer.current;
    const currentClip = getComputedStyle(element).clipPath;
    const interrupted = animation.current?.playState === "running";
    animation.current?.cancel();
    const from = entering && !interrupted ? edgeClip(event) : currentClip;
    const to = entering ? "inset(0 0 0 0)" : edgeClip(event);
    element.style.clipPath = to;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animation.current = element.animate(
      [{ clipPath: from }, { clipPath: to }],
      { duration: 340, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }

  return (
    <Link
      className={styles.link}
      href={href}
      onPointerEnter={event => highlight(event, true)}
      onPointerLeave={event => highlight(event, false)}
    >
      {children}
      <span ref={layer} className={styles.highlight} aria-hidden="true">{children}</span>
    </Link>
  );
}
