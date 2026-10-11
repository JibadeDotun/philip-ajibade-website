import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact | Philip Ajibade",
  description: "Get in touch with Philip Ajibade about product and service design, art direction, or photography.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.label}>Contact</p>
        <h1>Let’s go find it.</h1>
        <p className={styles.intro}>A moment where people give up. A brand that doesn’t look like itself yet. A story worth capturing.</p>
        <p className={styles.invitation}>Tell me what you have in mind.</p>
        <a className={styles.email} href="mailto:hello@philipajibade.com">
          <span className={styles.connection} aria-hidden="true">
            <span className={styles.connectionLine} />
            <span className={styles.startPoint} />
            <span className={styles.endPoint} />
          </span>
          <span className={styles.address}>hello@philipajibade.com</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </a>
        <p className={styles.note}>Opens your email app.</p>
      </div>
    </main>
  );
}
