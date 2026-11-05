import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProjectReveal from "../../components/project-reveal";
import { visibleDesignProjects } from "../../data/design-projects";
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
        <div className={styles.projects}>
        {visibleDesignProjects.map((project, index) => <ProjectReveal key={project.slug}>
          <Link href={`/product-service-design/${project.slug}`} className={styles.project}>
            <div className={styles.hero} aria-hidden="true">
              {project.heroPreview && <Image src={project.heroPreview} alt="" width={project.heroWidth} height={project.heroHeight}
                style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
                sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 1408px) 88vw, 1216px"
                loading={index === 0 ? "eager" : "lazy"} className={styles.heroImage} />}
            </div>
            <div className={styles.projectInfo}>
              <div className={styles.projectTitle}>
                <span className={styles.label}>{project.name} · {project.period}</span>
                <h3>{project.title}</h3>
                <span className={styles.access}>{project.category}</span>
              </div>
              <div className={styles.description}>
                <p>{project.summary}</p>

              </div>
            </div>
          </Link>
        </ProjectReveal>)}
        </div>
      </section>
    </div>
  </main>;
}
