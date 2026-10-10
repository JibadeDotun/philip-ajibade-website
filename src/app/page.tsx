import type { Metadata } from "next";
import DirectionalLink from "../components/directional-link";
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
        <DirectionalLink href="/product-service-design">Product and Service Design</DirectionalLink>
        <DirectionalLink href="/art-direction">Art Direction</DirectionalLink>
        <DirectionalLink href="/photography">Photography</DirectionalLink>
      </nav>
    </main>
  );
}
