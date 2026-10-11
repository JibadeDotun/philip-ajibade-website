import Link from "next/link";
import styles from "../app/gateway.module.css";

export default function SectionFoundation({ title, description = "Selected work is being prepared." }: { title: string; description?: string }) {
  return (
    <main id="main-content" tabIndex={-1} className={`${styles.gateway} ${styles.section}`}>
      <h1 className={styles.title}>{title}</h1>
      <p>{description}</p>
      <Link className={styles.back} href="/">← All sections</Link>
    </main>
  );
}
