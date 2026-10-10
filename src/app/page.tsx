import type { Metadata } from "next";
import CursorGlow from "../components/cursor-glow";
import PortfolioLink from "../components/portfolio-link";
import styles from "./gateway.module.css";

export const metadata: Metadata = {
  title: "Philip Ajibade | Design & Photography",
  description: "Explore Philip Ajibade’s product and service design, art direction, and photography.",
};

export default function Home() {
  return (
    <main className={`${styles.gateway} ${styles.home}`}>
      <CursorGlow />
      <h1 className={styles.srOnly}>Philip Ajibade — selected work</h1>
      <nav className={styles.navigation} aria-label="Explore portfolios">
        <PortfolioLink href="/product-service-design" title="Product and Service Design" description="UI/UX design, digital products, and service experiences." prompt="Explore design projects" />
        <PortfolioLink href="/art-direction" title="Art Direction" description="Visual identities, graphic design, and creative direction." prompt="Explore creative work" />
        <PortfolioLink href="/photography" title="Photography" description="Street photography — people, places, and everyday moments." prompt="Explore the photographs" />
      </nav>
    </main>
  );
}
