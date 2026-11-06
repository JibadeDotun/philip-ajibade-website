import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProjectReveal from "../../components/project-reveal";
import SectionFoundation from "../../components/section-foundation";
import { visibleArtProjects } from "../../data/art-direction";
import listing from "../product-service-design/portfolio.module.css";
import styles from "./art-direction.module.css";

export const metadata: Metadata = {
  title: "Art Direction | Philip Ajibade",
  description: "Art direction, visual identities and creative direction by Philip Ajibade.",
};

export default function ArtDirection() {
  if (!visibleArtProjects.length) return <SectionFoundation title="Art Direction" />;
  return <main id="main-content" tabIndex={-1} className={listing.page}>
    <div className={listing.content}>
      <header className={listing.intro}>
        <h1>Art Direction</h1>
        <p>Visual identities, campaigns and films, directed from concept to finished work.</p>
      </header>
      <section aria-labelledby="selected-work">
        <h2 id="selected-work" className={listing.label}>Selected work</h2>
        <div className={listing.projects}>
          {visibleArtProjects.map((project, index) => { const preview = project.card ?? project.cover; return <ProjectReveal key={project.slug}>
            <Link href={`/art-direction/${project.slug}`} className={listing.project}>
              <div className={`${listing.hero} ${styles.cardHero}`} aria-hidden="true">
                {preview
                  ? <Image src={preview.src} alt="" width={preview.width} height={preview.height}
                      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                      sizes="(max-width: 640px) calc(100vw - 72px), (max-width: 1408px) 88vw, 1216px"
                      loading={index === 0 ? "eager" : "lazy"} className={listing.heroImage} />
                  : <span className={styles.cardTitle}>{project.name}</span>}
              </div>
              <div className={listing.projectInfo}>
                <div className={listing.projectTitle}>
                  <span className={listing.label}>{[project.name, project.year].filter(Boolean).join(" · ")}</span>
                  <h3>{project.title}</h3>
                  <span className={listing.access}>{[project.format, project.role].filter(Boolean).join(" · ")}</span>
                </div>
                <div className={listing.description}><p>{project.summary}</p></div>
              </div>
            </Link>
          </ProjectReveal>; })}
        </div>
      </section>
    </div>
  </main>;
}
