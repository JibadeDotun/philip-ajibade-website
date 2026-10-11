"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../app/gateway.module.css";

export default function PortfolioLink({ href, title, description, prompt }: {
  href: string;
  title: string;
  description: string;
  prompt: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  return (
    <Link className={styles.link} href={href} data-dismissed={dismissed || undefined}
      onPointerEnter={() => setDismissed(false)} onFocus={() => setDismissed(false)}
      onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); setDismissed(true); } }}
    >
      <span className={styles.linkWindow}>
        <span className={styles.linkTitle}>{title}</span>
        <span className={styles.linkPreview}>
          <span className={styles.previewDescription}>{description}</span>
          <span className={styles.previewPrompt}>{prompt} <span aria-hidden="true">→</span></span>
        </span>
      </span>
    </Link>
  );
}
