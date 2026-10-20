"use client";

import { useEffect, useState } from "react";
import styles from "./case-study-progress.module.css";

type Section = { id: string; label: string };
export default function CaseStudyProgress({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const elements = sections.map(section => document.getElementById(section.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerWidth <= 640 ? 132 : 112;
      const first = elements[0];
      setVisible(Boolean(first && first.getBoundingClientRect().top <= marker));
      let current = sections[0]?.id || "";
      elements.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= marker + 8) current = sections[index].id;
      });
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [sections]);
  return <nav className={`${styles.bar} ${visible ? styles.visible : ""}`} aria-label="Reading progress" aria-hidden={!visible} inert={!visible}>
    <ol>{sections.map((section, index) => <li key={section.id}>
      <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
        <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
        <span>{section.label}</span>
      </a>
    </li>)}</ol>
  </nav>;
}
