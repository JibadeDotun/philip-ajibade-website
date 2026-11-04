import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { visibleArtProjects } from "../../../data/art-direction";
import shared from "../../product-service-design/cws-cares/page.module.css";
import styles from "../art-direction.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return visibleArtProjects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = visibleArtProjects.find(item => item.slug === slug);
  if (!project) return {};
  return { title: `${project.name} | Art Direction | Philip Ajibade`, description: project.summary };
}

export default async function ArtProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = visibleArtProjects.find(item => item.slug === slug);
  if (!project) notFound();
  return <main id="main-content" tabIndex={-1} className={shared.page}>
    <article className={shared.article}>
      <Link href="/art-direction" className={shared.back}>← All art direction</Link>
      <header className={shared.intro}>
        <p className={shared.eyebrow}>{[project.name, project.studio, project.year].filter(Boolean).join(" · ")}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <dl className={shared.details}>
          {project.role && <div><dt>My role</dt><dd>{project.role}</dd></div>}
          {project.studio && <div><dt>{project.studioLabel ?? "Studio"}</dt><dd>{project.studio}</dd></div>}
          <div><dt>Format</dt><dd>{project.format}</dd></div>
        </dl>
        {project.recognition.length > 0 && <ul className={styles.recognition} aria-label="Recognition">
          {project.recognition.map(item => <li key={item}>{item}</li>)}
        </ul>}
      </header>

      {project.cover
        ? <div className={styles.hero}><Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} priority sizes="(max-width: 1008px) 90vw, 960px" /></div>
        : <p className={styles.pending}>Key visual to come.</p>}

      {project.film && <figure className={styles.film}>
        <iframe src={project.film.embedUrl} title={project.film.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen />
        <figcaption>The full film. <a href={project.film.watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></figcaption>
      </figure>}

      <section className={shared.section} aria-labelledby="brief">
        <h2 id="brief">{project.briefTitle ?? "The brief"}</h2>
        <div className={shared.copy}>{project.brief.map(text => <p key={text}>{text}</p>)}</div>
      </section>

      {project.contribution.length > 0 && <section className={shared.section} aria-labelledby="direction">
        <h2 id="direction">{project.contributionTitle ?? "The art direction"}</h2>
        <div className={shared.copy}>{project.contribution.map(text => <p key={text}>{text}</p>)}</div>
      </section>}

      {project.visuals.length > 0
        ? <div className={styles.gallery}>
            {project.visuals.map(visual => <figure key={visual.src} className={visual.wide ? styles.wide : undefined}>
              <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes={visual.wide ? "(max-width: 1008px) 90vw, 960px" : "(max-width: 640px) 90vw, 470px"} />
              {visual.caption && <figcaption>{visual.caption}</figcaption>}
            </figure>)}
          </div>
        : <p className={styles.pending}>Style frames, character designs and stills to come.</p>}

      {project.credits.length > 0 && <section className={shared.section} aria-labelledby="credits">
        <h2 id="credits">Credits</h2>
        <dl className={styles.credits}>
          {project.credits.map(credit => <div key={credit.role + credit.name} style={{ display: "contents" }}><dt>{credit.role}</dt><dd>{credit.name}</dd></div>)}
        </dl>
      </section>}

      <footer className={shared.closing}>
        <Link href="/art-direction">Back to all art direction →</Link>
      </footer>
    </article>
  </main>;
}
