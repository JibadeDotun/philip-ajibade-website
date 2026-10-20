import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { designProjects } from "../../data/design-projects";
import styles from "./portfolio.module.css";

export const metadata: Metadata = { title: "Product and Service Design | Philip Ajibade" };

export default function ProductServiceDesign() {
  return <main id="main-content" tabIndex={-1} className={styles.page}>
    <div className={styles.content}>
      <header className={styles.intro}>
        <h1>Product and Service Design</h1>
        <p>Making complex systems clearer for the people who use them.</p>
      </header>
      <section aria-labelledby="selected-projects">
        <h2 id="selected-projects" className={styles.label}>Selected projects</h2>
        {designProjects.map(project => <Link key={project.slug} href={`/product-service-design/${project.slug}`} className={styles.project}>
          <div className={styles.hero}>
            {project.heroPreview
              ? <Image src={project.heroPreview} alt="" fill sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1088px) 92vw, 960px" className={styles.heroImage} />
              : <div className={styles.placeholder} aria-hidden="true"><span /><span /><span /></div>}
            <span className={styles.previewLabel}>{project.heroPreview ? "Private case study" : "Hero preview to follow"}</span>
          </div>
          <span className={styles.label}>{project.category} · {project.period} · Password protected</span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <span className={styles.action}>Read the case study <span aria-hidden="true">↗</span></span>
        </Link>)}
      </section>
    </div>
  </main>;
}
