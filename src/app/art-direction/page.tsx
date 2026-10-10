import type { Metadata } from "next";
import Link from "next/link";
import { Hedvig_Letters_Serif } from "next/font/google";
import styles from "../gateway.module.css";

const display = Hedvig_Letters_Serif({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-gateway" });
export const metadata: Metadata = { title: "Art Direction | Philip Ajibade" };

export default function ArtDirection() {
  return (
    <main className={`${display.variable} ${styles.gateway} ${styles.section}`}>
      <h1 className={styles.title}>Art Direction</h1>
      <p>Selected work is being prepared.</p>
      <Link className={styles.back} href="/">← All sections</Link>
    </main>
  );
}
