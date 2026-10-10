import Link from "next/link";
import { Hedvig_Letters_Serif } from "next/font/google";
import styles from "../app/gateway.module.css";

const display = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gateway",
});

export default function SectionFoundation({ title }: { title: string }) {
  return (
    <main className={`${display.variable} ${styles.gateway} ${styles.section}`}>
      <h1 className={styles.title}>{title}</h1>
      <p>Selected work is being prepared.</p>
      <Link className={styles.back} href="/">← All sections</Link>
    </main>
  );
}
