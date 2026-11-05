"use client";

import { useEffect, useState } from "react";
import styles from "./name-mark.module.css";

/** How long each version of the name stays on screen, in milliseconds. */
const PLAIN_FOR = 5200;
const YORUBA_FOR = 3600;

/**
 * "Philip Ajibade" over "Designer", which turns now and then into the Yorùbá spelling,
 * Ajíbádé, set in italic, with the pronunciation in place of "Designer".
 * Hovering or focusing the link shows the Yorùbá version at once.
 */
export default function NameMark({ cycle = true }: { cycle?: boolean }) {
  const [yoruba, setYoruba] = useState(false);

  useEffect(() => {
    if (!cycle) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    let timer = window.setTimeout(function step(next = true) {
      if (document.visibilityState === "visible") setYoruba(next);
      timer = window.setTimeout(() => step(!next), next ? YORUBA_FOR : PLAIN_FOR);
    }, PLAIN_FOR);
    const stop = () => { if (reduced.matches) { window.clearTimeout(timer); setYoruba(false); } };
    reduced.addEventListener?.("change", stop);
    return () => { window.clearTimeout(timer); reduced.removeEventListener?.("change", stop); };
  }, [cycle]);

  const state = yoruba ? "yoruba" : "plain";
  return <>
    <span className={styles.name} aria-hidden="true">
      Philip{" "}
      <span className={styles.swap} data-state={state}>
        <span className={styles.plain}>Ajibade</span>
        <span className={styles.yoruba} lang="yo">Ajíbádé</span>
      </span>
    </span>
    <span className={styles.role} aria-hidden="true">
      <span className={styles.swap} data-state={state}>
        <span className={styles.plain}>Designer</span>
        <span className={styles.say}>/ah-jee-BAH-deh/</span>
      </span>
    </span>
    <span className={styles.srOnly}>Philip Ajibade, Designer</span>
  </>;
}
