"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../app/gateway.module.css";

export default function PortfolioLink({ href, title, description, prompt }: {
  href: string;
  title: string;
  description: string;
  prompt: string;
}) {
  const preview = useRef<HTMLSpanElement>(null);
  const anchor = useRef<HTMLAnchorElement>(null);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const element = preview.current;
    const link = anchor.current;
    if (!element || !link) return;
    const measure = () => {
      const height = element.getBoundingClientRect().height;
      link.style.setProperty("--preview-height", `${height}px`);
      const navigation = link.parentElement;
      if (navigation) {
        const heights = Array.from(navigation.querySelectorAll<HTMLElement>("[data-preview]")).map(node => node.getBoundingClientRect().height);
        navigation.style.setProperty("--preview-clearance", `${Math.max(...heights) / 2 + 12}px`);
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <Link ref={anchor} className={styles.link} href={href} data-dismissed={dismissed || undefined}
      onPointerEnter={() => setDismissed(false)} onFocus={() => setDismissed(false)}
      onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); setDismissed(true); } }}
    >
      <span className={styles.linkWindow}>
        <span className={styles.linkTitle}>{title}</span>
        <span ref={preview} data-preview className={styles.linkPreview}>
          <span className={styles.previewDescription}>{description}</span>
          <span className={styles.previewPrompt}>{prompt} <span aria-hidden="true">→</span></span>
        </span>
      </span>
    </Link>
  );
}
