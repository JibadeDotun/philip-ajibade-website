"use client";

import { useEffect, useState } from "react";
import styles from "./about-guide.module.css";

const sections = [
  { id: "what-i-do", label: "What I do" },
  { id: "how-i-work", label: "How I work" },
  { id: "where-i-work", label: "In practice" },
  { id: "outside-work", label: "Outside work" },
];

export default function AboutGuide() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.getElementById("about-story");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
      let current = "";
      for (const section of sections) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= 160) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    const article = document.getElementById("about-story");
    if (article) observer.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <nav className={styles.guide} aria-label="About page sections">
      <div className={styles.measure}>
        <span>Reading progress</span>
        <span aria-hidden="true" className={styles.value}>{progress.toFixed(2)} / 1</span>
      </div>
      <div className={styles.track} role="progressbar" aria-label="About page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className={styles.points}>
        {sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
            <span className={styles.coordinate} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
