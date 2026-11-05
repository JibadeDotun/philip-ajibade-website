import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CaseStudyProgress from "../../../components/case-study-progress";
import sections from "../../../data/sleepmate.json";
import shared from "../cws-cares/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "SleepMate Case Study | Philip Ajibade",
  description: "SleepMate (2022): UI Designer for Dawn Health’s sleep management mobile app. User flows, wireframes, visual design and guided sleep logging.",
};
const prototype = "https://www.figma.com/proto/mur02lbApfEZ5vNTzy7WQF/SleepMAte?node-id=101-517&page-id=0%3A1&starting-point-node-id=101%3A517";
const prototypeEmbed = "https://embed.figma.com/proto/mur02lbApfEZ5vNTzy7WQF/SleepMAte?node-id=101-517&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=101%3A517&show-proto-sidebar=1&embed-host=share";
const progressLabels = ["Overview", "Challenge", "User flow", "Wireframes", "Visual system", "Dashboard", "Logging", "Features", "Reflection"];
const media = "/project-previews/sleepmate/";
type Visual = { file: string; alt: string; caption: string; width: number; height: number; narrow?: boolean };
const visuals: Record<string, Visual | Visual[]> = {
  features: { file: "better-sleep-screens.png", alt: "Better Sleep screens showing article, podcast and video browsing in the purple SleepMate interface.", caption: "Better Sleep screens · Reading, podcast and video content share one browsing pattern. Sample media thumbnails are blurred; titles are placeholder content from the designs.", width: 1920, height: 902 },
  flow: { file: "user-flow-diagram.png", alt: "SleepMate user flow connecting the dashboard and three logging steps with Better Sleep, Sleep Alarm, Sound and Theme.", caption: "User flow · The end states describe intended behaviour, including proposed sharing and sleep support; they are not validated outcomes.", width: 1616, height: 1218 },
  wireframes: { file: "wireframe-screens.png", alt: "Low-fidelity SleepMate wireframes showing the dashboard, three logging steps, confirmation and Better Sleep screens.", caption: "Low-fidelity wireframes · Navigation, content hierarchy and a repeatable logging layout, before visual styling.", width: 1936, height: 1501 },
  "visual-system": [{ file: "visual-system.png", alt: "Outfit typography specimen and SleepMate purple colour palette.", caption: "Visual system · Outfit in four weights and a four-step purple palette. On the original board the Purple swatch carries the light-purple label; the swatch itself is #5A2F82.", width: 1632, height: 2048 }, { file: "light-theme-screens.png", alt: "Light theme versions of the SleepMate dashboard, waking-time step and Sleep Alarm screens.", caption: "Light theme · The same layouts and components in the light appearance. The album thumbnail is blurred.", width: 1524, height: 1070 }],
  dashboard: { file: "dashboard-screens.png", alt: "Three SleepMate dashboard screens: a recorded night with a semicircular sleep summary, the empty state with an add button, and a second recorded day.", caption: "Dashboard · The same layout supports a first entry and a recorded day.", width: 1502, height: 978 },
  logging: { file: "logging-screens.png", alt: "Sleep logging screens with an hour, minute and AM/PM selector, waking-state options and a confirmation illustration.", caption: "Logging · One question per screen, with a step indicator and visible selection feedback.", width: 933, height: 1374, narrow: true },
};
export default function Sleepmate() {
  return <main id="main-content" tabIndex={-1} className={`${shared.page} ${styles.page}`}>
    <CaseStudyProgress sections={sections.map(({ id }, index) => ({ id, label: progressLabels[index] }))} />
    <article className={shared.article}>
      <Link href="/product-service-design" className={shared.back}>← All design projects</Link>
      <header className={`${shared.intro} ${styles.intro}`}>
        <p className={shared.eyebrow}>SleepMate · Dawn Health · Mobile app design</p>
        <h1>Designing a clearer way to record and review sleep</h1>
        <p>A purple-led mobile interface that brings sleep logging, daily summaries and bedtime tools into one experience.</p>
        <dl className={shared.details}>
          <div><dt>My role</dt><dd>UI Designer</dd></div>
          <div><dt>Client</dt><dd>Dawn Health</dd></div>
          <div><dt>Scope</dt><dd>Flows, wireframes, UI & prototyping · 2022</dd></div>
        </dl>
      </header>
      <div className={styles.hero}>
        <div className={styles.heroTitle}><span>SleepMate</span><span>A considered interface for the everyday sleep diary.</span></div>
        <Image src={`${media}hero-dark-screens.png`} alt="SleepMate dark theme screens: the dashboard with a sleep summary, the waking-time step and the weekly sleep chart." width={1524} height={1070} priority sizes="(max-width: 1008px) 90vw, 960px" />
        <a href={prototype} target="_blank" rel="noopener noreferrer">Explore the interactive prototype <span aria-hidden="true">↗</span></a>
      </div>
      <nav className={shared.contents} aria-label="Case study sections">
        <p className={shared.contentsLabel}>In this case study</p>
        <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span className={shared.sectionNumber}>{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span><span aria-hidden="true">↗</span></a></li>)}</ol>
      </nav>
      {sections.map((section, index) => {
        const entry = visuals[section.id];
        const list = entry ? (Array.isArray(entry) ? entry : [entry]) : [];
        return <section key={section.id} className={shared.section} aria-labelledby={section.id}>
          <h2 id={section.id}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>
          <div className={shared.copy}>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
          {section.id === "logging" && <ol className={styles.steps}>
            <li><span>01 / Sleep</span><h3>When did you fall asleep?</h3><p>Record the time with an hour, minute and AM/PM selector.</p></li>
            <li><span>02 / Wake</span><h3>When did you wake up?</h3><p>Use the same input pattern for the morning’s waking time.</p></li>
            <li><span>03 / State</span><h3>How did you feel?</h3><p>Select Rested, Tired or Sick, then submit the record.</p></li>
          </ol>}
          {list.map(visual => <figure key={visual.file} className={`${shared.figure} ${styles.figure}${visual.narrow ? ` ${styles.narrow}` : ""}`}>
            <a href={`${media}${visual.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${visual.alt}`}>
              <Image src={`${media}${visual.file}`} alt={visual.alt} width={visual.width} height={visual.height} className={shared.artifact} sizes="(max-width: 1008px) 90vw, 960px" />
            </a>
            <figcaption>{visual.caption}<span>Open image for full-size detail ↗</span></figcaption>
          </figure>)}
        </section>;
      })}
      <figure className={`${shared.figure} ${styles.figure}`}>
        <iframe
          title="SleepMate interactive Figma prototype"
          src={prototypeEmbed}
          loading="lazy"
          allowFullScreen
          style={{ display: "block", width: "100%", height: "min(780px, 85svh)", minHeight: "480px", border: "1px solid var(--secondary)", background: "#170724" }}
        />
        <figcaption>Interactive prototype · Explore the SleepMate screens and flows. Use the full-screen control for a larger view.</figcaption>
      </figure>
      <footer className={`${shared.closing} ${styles.closing}`}>
        <p>SleepMate · Interface design for Dawn Health, 2022</p>
        <a href={prototype} target="_blank" rel="noopener noreferrer">View the interactive prototype ↗</a>
        <Link href="/product-service-design">Back to all design projects →</Link>
      </footer>
    </article>
  </main>;
}
