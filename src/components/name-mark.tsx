"use client";

import { useEffect, useState } from "react";
import styles from "./name-mark.module.css";

type State = "plain" | "say";
/** How long each version of the surname stays on screen, in milliseconds. */
const HOLD: Record<State, number> = { plain: 5200, say: 3400 };

/**
 * "Philip Ajibade" over "Designer". Now and then the surname turns into its pronunciation,
 * /ah-jee-BAH-deh/, then settles back. "Designer" stays put.
 * Hovering or focusing the link shows the pronunciation at once.
 */
export default function NameMark({ cycle = true }: { cycle?: boolean }) {
  const [state, setState] = useState<State>("plain");

  useEffect(() => {
    if (!cycle) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    let current: State = "plain";
    let timer = 0;
    const advance = () => {
      if (document.visibilityState === "visible") {
        current = current === "plain" ? "say" : "plain";
        setState(current);
      }
      timer = window.setTimeout(advance, HOLD[current]);
    };
    timer = window.setTimeout(advance, HOLD.plain);
    const stop = () => { if (reduced.matches) { window.clearTimeout(timer); setState("plain"); } };
    reduced.addEventListener?.("change", stop);
    return () => { window.clearTimeout(timer); reduced.removeEventListener?.("change", stop); };
  }, [cycle]);

  return <>
    <span className={styles.name} aria-hidden="true">
      Philip{" "}
      <span className={styles.swap} data-state={state}>
        <span className={styles.plain}>Ajibade</span>
        <span className={styles.say}>/ah-jee-BAH-deh/</span>
      </span>
    </span>
    <span className={styles.role} aria-hidden="true">Designer</span>
    <span className={styles.srOnly}>Philip Ajibade, Designer</span>
  </>;
}
