import type { Metadata } from "next";
import Link from "next/link";
import styles from "./gateway.module.css";

export const metadata: Metadata = {
  title: "Philip Ajibade | Design & Photography",
  description: "Explore Philip Ajibade’s product and service design, art direction, and photography.",
};

export default function Home() {
  return (
    <main className={styles.gateway}>
      <h1 className={styles.srOnly}>Philip Ajibade — selected work</h1>
      <nav className={styles.navigation} aria-label="Explore portfolios">
        <Link className={styles.link} href="/product-service-design">Product and Service Design</Link>
        <Link className={styles.link} href="/art-direction">Art Direction</Link>
        <Link className={styles.link} href="/photography">Photography</Link>
      </nav>
    </main>
  );
}
