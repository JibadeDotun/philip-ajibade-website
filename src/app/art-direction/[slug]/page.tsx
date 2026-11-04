import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtImage, ArtLightbox } from "../../../components/art-lightbox";
import { visibleArtProjects, type ArtVisual } from "../../../data/art-direction";
import shared from "../../product-service-design/cws-cares/page.module.css";
import styles from "../art-direction.module.css";

type Props = { params: Promise<{ slug: string }> };

/** Widest the artwork runs, wider than the text column. Keep in step with --art-width in the CSS. */
const ART_WIDTH = 1360;
/** Tallest a row of images may be, in pixels. Keep in step with --row-height in the CSS. */
const ROW_HEIGHT = 860;

/**
 * Lays images out in rows. A wide image takes a row; other images pair up, and each pair is sized
 * by aspect ratio so both images in a row share one height.
 */
function Gallery({ visuals }: { visuals: ArtVisual[] }) {
  const rows: ArtVisual[][] = [];
  for (const visual of visuals) {
    const last = rows[rows.length - 1];
    if (!visual.wide && last && last.length === 1 && !last[0].wide) last.push(visual);
    else rows.push([visual]);
  }
  return <div className={styles.gallery}>
    {rows.map(row => {
      const total = row.reduce((sum, visual) => sum + visual.width / visual.height, 0);
      // A row never grows taller than ROW_HEIGHT, so tall artwork stays on screen.
      const rowWidth = Math.min(ART_WIDTH, ROW_HEIGHT * total);
      return <div key={row[0].src} className={styles.row}
        style={{ "--row-ratio": total, "--row-gaps": row.length - 1 } as React.CSSProperties}>
        {row.map(visual => {
          const ratio = visual.width / visual.height;
          const width = Math.round(rowWidth * ratio / total);
          const sizes = `(max-width: 640px) 100vw, (max-width: ${ART_WIDTH + 128}px) ${Math.round(width / ART_WIDTH * 100)}vw, ${width}px`;
          return <figure key={visual.src} style={{ "--ratio": ratio } as React.CSSProperties}>
            <ArtImage visual={visual} sizes={sizes} />
            {visual.caption && <figcaption>{visual.caption}</figcaption>}
          </figure>;
        })}
      </div>;
    })}
  </div>;
}

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
  const chapters = project.chapters ?? [];
  const outcome = project.outcome ?? [];
  const allVisuals = [...(project.cover ? [project.cover] : []), ...chapters.flatMap(chapter => chapter.visuals), ...project.visuals];
  return <main id="main-content" tabIndex={-1} className={shared.page}>
    <ArtLightbox visuals={allVisuals}>
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
        ? <div className={styles.hero}><div className={styles.heroFrame} style={{ "--ratio": project.cover.width / project.cover.height } as React.CSSProperties}><ArtImage visual={project.cover} priority sizes={`(max-width: ${ART_WIDTH + 128}px) 100vw, ${ART_WIDTH}px`} /></div></div>
        : <p className={styles.pending}>Key visual to come.</p>}

      {project.film && <figure className={styles.film}>
        <iframe src={project.film.embedUrl} title={project.film.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen />
        <figcaption>The full film. <a href={project.film.watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></figcaption>
      </figure>}

      {chapters.length > 0 && <nav className={shared.contents} aria-label="Case study sections">
        <p className={shared.contentsLabel}>In this case study</p>
        <ol>{[{ id: "brief", title: project.briefTitle ?? "The brief" }, ...(project.contribution.length ? [{ id: "direction", title: project.contributionTitle ?? "The art direction" }] : []), ...chapters, ...(outcome.length ? [{ id: "results", title: "The results" }] : [])].map((item, index) =>
          <li key={item.id}><a href={`#${item.id}`}><span className={shared.sectionNumber}>{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><span className={shared.sectionArrow} aria-hidden="true">↗</span></a></li>)}</ol>
      </nav>}

      <section className={shared.section} aria-labelledby="brief">
        <h2 id="brief">{project.briefTitle ?? "The brief"}</h2>
        <div className={shared.copy}>{project.brief.map(text => <p key={text}>{text}</p>)}</div>
      </section>

      {project.contribution.length > 0 && <section className={shared.section} aria-labelledby="direction">
        <h2 id="direction">{project.contributionTitle ?? "The art direction"}</h2>
        <div className={shared.copy}>{project.contribution.map(text => <p key={text}>{text}</p>)}</div>
      </section>}

      {chapters.map(chapter => <div key={chapter.id}>
        <section className={shared.section} aria-labelledby={chapter.id}>
          <h2 id={chapter.id}>{chapter.title}</h2>
          <div className={shared.copy}>{chapter.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
        </section>
        {chapter.visuals.length > 0 && <Gallery visuals={chapter.visuals} />}
      </div>)}

      {project.visuals.length > 0
        ? <Gallery visuals={project.visuals} />
        : chapters.length === 0 && <p className={styles.pending}>Style frames, character designs and stills to come.</p>}

      {outcome.length > 0 && <section className={shared.section} aria-labelledby="results">
        <h2 id="results">The results</h2>
        <div className={shared.copy}>{outcome.map(text => <p key={text}>{text}</p>)}</div>
      </section>}

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
    </ArtLightbox>
  </main>;
}
