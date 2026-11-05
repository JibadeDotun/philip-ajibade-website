"use client";

import { useEffect, useState } from "react";
import styles from "./name-mark.module.css";

type State = "plain" | "yoruba" | "say";
/** The order the surname moves through, and how long each version stays, in milliseconds. */
const SEQUENCE: { state: State; hold: number }[] = [
  { state: "plain", hold: 5200 },
  { state: "yoruba", hold: 3400 },
  { state: "say", hold: 3400 },
];

/**
 * "Philip Ajibade" over "Designer". Now and then the surname turns into the Yorùbá spelling,
 * Ajíbádé, in a cursive script, then into its pronunciation, before settling back.
 * "Designer" stays put. Hovering or focusing the link shows Ajíbádé at once.
 */
export default function NameMark({ cycle = true }: { cycle?: boolean }) {
  const [state, setState] = useState<State>("plain");

  useEffect(() => {
    if (!cycle) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    let index = 0;
    let timer = 0;
    const advance = () => {
      if (document.visibilityState === "visible") {
        index = (index + 1) % SEQUENCE.length;
        setState(SEQUENCE[index].state);
      }
      timer = window.setTimeout(advance, SEQUENCE[index].hold);
    };
    timer = window.setTimeout(advance, SEQUENCE[0].hold);
    const stop = () => { if (reduced.matches) { window.clearTimeout(timer); setState("plain"); } };
    reduced.addEventListener?.("change", stop);
    return () => { window.clearTimeout(timer); reduced.removeEventListener?.("change", stop); };
  }, [cycle]);

  return <>
    <span className={styles.name} aria-hidden="true">
      Philip{" "}
      <span className={styles.swap} data-state={state}>
        <span className={styles.plain}>Ajibade</span>
        <span className={styles.yoruba} lang="yo">Ajíbádé</span>
        <span className={styles.say}>/ah-jee-BAH-deh/</span>
      </span>
    </span>
    <span className={styles.role} aria-hidden="true">Designer</span>
    <span className={styles.srOnly}>Philip Ajibade, Designer</span>
  </>;
}
