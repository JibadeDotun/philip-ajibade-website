import type { Metadata } from "next";
import Link from "next/link";
import { Hedvig_Letters_Serif } from "next/font/google";
import styles from "./gateway.module.css";

const display = Hedvig_Letters_Serif({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-gateway" });

export const metadata: Metadata = {
  title: "Philip Ajibade | Design & Photography",
  description: "Explore Philip Ajibade’s product and service design, art direction, and photography.",
};

export default function Home() {
  return (
    <main className={`${display.variable} ${styles.gateway}`}>
      <h1 className={styles.srOnly}>Philip Ajibade — selected work</h1>
      <nav className={styles.navigation} aria-label="Explore portfolios">
        <Link className={styles.link} href="/product-service-design">Product and Service Design</Link>
        <Link className={styles.link} href="/art-direction">Art Direction</Link>
        <Link className={styles.link} href="/photography">Photography</Link>
      </nav>
    </main>
  );
}
