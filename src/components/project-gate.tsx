"use client";

import { useActionState } from "react";
import Link from "next/link";
import { unlockProject } from "../app/product-service-design/actions";
import styles from "./project-gate.module.css";

export default function ProjectGate({ slug, title }: { slug: string; title: string }) {
  const [state, action, pending] = useActionState(unlockProject.bind(null, slug), { error: "" });
  return <main id="main-content" tabIndex={-1} className={styles.page}>
    <div className={styles.content}>
      <Link href="/product-service-design" className={styles.link}>← All design projects</Link>
      <p className={styles.label}>Private case study · {title}</p>
      <h1>A closer look.</h1>
      <p>Enter the project password to explore this work.</p>
      <form action={action} className={styles.form}>
        <label htmlFor="project-password">Project password</label>
        <input id="project-password" name="password" type="password" autoComplete="current-password" required maxLength={1024}
          aria-invalid={Boolean(state.error)} aria-describedby={state.error ? "password-error" : undefined} />
        {state.error && <p id="password-error" role="alert">{state.error}</p>}
        <button disabled={pending} type="submit">{pending ? "Unlocking…" : "View case study →"}</button>
      </form>
      <a className={styles.link} href="mailto:hello@philipajibade.com?subject=Case%20study%20access">Request access</a>
    </div>
  </main>;
}
