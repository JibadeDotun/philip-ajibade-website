import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { hasProjectAccess } from "../../../lib/project-access";
import ProjectGate from "../../../components/project-gate";
import CaseStudyProgress from "../../../components/case-study-progress";
import sections from "../../../data/cws-cares.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CWS-CARES Case Study | Philip Ajibade",
  robots: { index: false, follow: false },
  description: "Research synthesis, journey mapping and interactive prototypes for RFA approvals and family-finding workflows.",
};
const sectionLabels: Record<string, string> = { contribution: "My role", challenge: "The challenge", mapping: "Experience mapping", research: "Research to priorities", rfa: "RFA prototyping", "family-finding": "Family finding", reflection: "Contribution & reflection" };
const mediaPath = "/product-service-design/cws-cares/media/";
const visuals: Record<string, { file: string; alt: string; caption: string; width: number; height: number }[]> = {
  challenge: [{ file: "service-overview.png", width: 2632, height: 1914, alt: "Child at the centre of intake, RFA, case management, court and self-service roles.", caption: "Team artifact · A child-centred overview of the roles and digital-service areas surrounding the service." }],
  mapping: [{ file: "worker-journey.png", width: 4756, height: 3408, alt: "April 2017 journey map layering three RFA workers’ experiences with tasks, systems, pain points and requests.", caption: "Team-created map · Three RFA workers, April 2017. My contribution included comparing layered worker experiences to identify patterns." }],
  research: [{ file: "roadmap.png", width: 2162, height: 1682, alt: "RFA epics divided into worker and applicant features across two release plans.", caption: "Team planning artifact · Epics and features connect application workflows to initial and subsequent release plans." }],
  rfa: [
    { file: "rfa-prototype-flow.png", width: 3594, height: 1112, alt: "Connected role-based prototype screens from login through draft application, assessment and approval.", caption: "Collaborative prototype · Connected role-based paths made the RFA flow available for end-to-end review." },
    { file: "rfa-application.png", width: 2046, height: 1536, alt: "RFA application manager grouping activity, calendar, training, forms, supporting documents and status information.", caption: "Collaborative interface design · Grouped application work, dates and status indicators explore clearer process visibility. Demonstration data." },
  ],
};
function formatted(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <Fragment key={index}>{part}</Fragment>);
}
export default async function CwsCares() {
  if (!await hasProjectAccess("cws-cares")) return <ProjectGate slug="cws-cares" title="CWS-CARES" />;
  return <main id="main-content" tabIndex={-1} className={styles.page}>
    <CaseStudyProgress sections={sections.map(section => ({ id: section.id, label: sectionLabels[section.id] }))} />
    <article className={styles.article}>
      <Link className={styles.back} href="/product-service-design">← All design projects</Link>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>CWS-CARES · California · 2017–2019</p>
        <h1>Designing for RFA approvals and sibling-placement decisions</h1>
        <p>I used research synthesis, journey mapping and interactive prototyping to explore two demanding areas of child welfare work: approving resource families and finding potential placements for children. My focus was on making the information, progress and actions within these workflows easier to understand.</p>
        <dl className={styles.details}>
          <div><dt>Role</dt><dd>Interaction Designer & UX Strategist</dd></div>
          <div><dt>Client</dt><dd>Child Welfare Digital Services (CWDS)</dd></div>
          <div><dt>My involvement</dt><dd>2017–2019</dd></div>
        </dl>
      </header>
      <nav className={styles.contents} aria-label="Case study sections">
        <p className={styles.contentsLabel}>In this case study</p>
        <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span><span>{sectionLabels[section.id]}</span><span className={styles.sectionArrow} aria-hidden="true">↗</span></a></li>)}</ol>
      </nav>
      {sections.map(section => <section className={styles.section} key={section.id} aria-labelledby={section.id}>
        <h2 id={section.id}>{section.title}</h2>
        <div className={styles.copy}>{section.blocks.map((block, index) => block.type === "list" ? <ul key={index}>{block.items?.map(item => <li key={item}>{formatted(item)}</li>)}</ul> : <p key={index}>{formatted(block.text || "")}</p>)}</div>
        {visuals[section.id]?.map(visual => <figure className={styles.figure} key={visual.file}>
          <a href={`${mediaPath}${visual.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${visual.alt}`}>
            <Image src={`${mediaPath}${visual.file}`} alt={visual.alt} width={visual.width} height={visual.height} unoptimized className={styles.artifact} />
          </a>
          <figcaption>{visual.caption} <span>Open image for full-size detail ↗</span></figcaption>
        </figure>)}
        {section.id === "family-finding" && <figure className={styles.figure}>
          <video className={styles.video} controls playsInline preload="none" poster={`${mediaPath}family-finding-poster.png`} aria-label="Family-finding interactive prototype walkthrough" aria-describedby="prototype-description">
            <source src={`${mediaPath}family-finding-prototype.mp4`} type="video/mp4" />
            <a href={`${mediaPath}family-finding-prototype.mp4`}>Watch the family-finding prototype recording</a>
          </video>
          <figcaption id="prototype-description">Prototype I created · A 50-second demonstration of child and sibling selection, placement criteria and batch follow-up actions. All profiles use demonstration data.</figcaption>
        </figure>}
      </section>)}
      <footer className={styles.closing}><p>Have a complex service to make clearer?</p><Link href="/contact">Let’s talk <span aria-hidden="true">→</span></Link></footer>
    </article>
  </main>;
}
