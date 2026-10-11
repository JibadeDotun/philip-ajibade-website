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
        <h1>Let’s go find it.</h1>
        <p className={styles.intro}>Have something in mind? Let’s talk.</p>
        <a className={styles.email} href="mailto:hello@philipajibade.com">
          <span className={styles.connection} aria-hidden="true">
            <span className={styles.connectionLine} />
            <span className={styles.startPoint} />
            <span className={styles.endPoint} />
          </span>
          <span className={styles.address}>hello@philipajibade.com</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  );
}
