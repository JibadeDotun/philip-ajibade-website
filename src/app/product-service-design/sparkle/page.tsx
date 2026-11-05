import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyProgress from "../../../components/case-study-progress";
import sections from "../../../data/sparkle.json";
import { designProjects } from "../../../data/design-projects";
import shared from "../cws-cares/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sparkle Case Study | Philip Ajibade",
  description: "Sparkle (2020): UI/UX Designer for the website of a new Nigerian digital and lifestyle bank. Research, site structure, personal and business home pages, product pages and a connected prototype.",
};
const prototype = "https://www.figma.com/proto/hzQe5yMjwiiOmPClxIzCi3/Sparkle-Website-Redesign--DDNA-?node-id=4-101&starting-point-node-id=4%3A101&scaling=scale-down-width";
const liveSite = "https://www.sparkle.ng";
const progressLabels = ["Overview", "Challenge", "Research", "Structure", "Home pages", "Products", "Company", "States", "Reflection"];
const media = "/project-previews/sparkle/";
type Visual = { file: string; alt: string; caption: string; width: number; height: number };
const visuals: Record<string, Visual | Visual[]> = {
  structure: [
    { file: "features-menu.jpg", alt: "Sparkle home page with the Features menu open, listing products in columns and Sparkle as a Service and the API documentation on the left.", caption: "Features menu · Products in columns, with the partner offers set apart.", width: 1440, height: 540 },
    { file: "footer-sitemap.jpg", alt: "Sparkle footer with the logo and four columns of links: Product, Features, Sparkle and Follow.", caption: "Footer · The whole site map, repeated at the bottom of every page.", width: 1440, height: 663 },
  ],
  homes: { file: "home-pages.jpg", alt: "The upper half of the Sparkle personal and business home pages side by side, each with a dark hero, app store buttons and feature sections with app screens.", caption: "Personal and Business home pages · Same structure, two audiences.", width: 1912, height: 1958 },
  products: [
    { file: "product-heroes.jpg", alt: "Hero sections of six Sparkle product pages: SparklePay, Payments, Breakdown, Smart Invoice and inventory, Split Payment and Tabs, and Loyalty.", caption: "Product heroes · Each product keeps its own colour and illustration.", width: 1908, height: 800 },
    { file: "product-template.jpg", alt: "Three full Sparkle product pages side by side, SparklePay, Invoice and Tabs, showing the same hero and alternating screen-and-copy sections.", caption: "The shared template · SparklePay, Invoice and Tabs, top to bottom.", width: 1916, height: 1570 },
    { file: "indy.jpg", alt: "Meet Indy page: an illustrated character in a green shirt beside the heading Meet Indy.", caption: "Indy · The conversational finance assistant, introduced as a character.", width: 1440, height: 900 },
  ],
  company: { file: "company-pages.jpg", alt: "Hero sections of six Sparkle company pages: About, Careers, Blog, Community, Contact and Merchandise.", caption: "Company pages · About, Careers, Blog, Community, Contact and Merch.", width: 1908, height: 800 },
  prototype: { file: "states.jpg", alt: "Two Sparkle screens: the Get The App page asking laptop visitors for a phone number, and a Coming Soon page with a Back to home button.", caption: "In-between states · Get The App for laptop visitors, and Coming Soon for features not yet live.", width: 1912, height: 588 },
};

const project = designProjects.find(item => item.slug === "sparkle");

export default function Sparkle() {
  if (project?.published === false && process.env.NODE_ENV === "production") notFound();
  return <main id="main-content" tabIndex={-1} className={`${shared.page} ${styles.page}`}>
    <CaseStudyProgress sections={sections.map(({ id }, index) => ({ id, label: progressLabels[index] }))} />
    <article className={shared.article}>
      <Link href="/product-service-design" className={shared.back}>← All design projects</Link>
      <header className={`${shared.intro} ${styles.intro}`}>
        <p className={shared.eyebrow}>Sparkle · Website design · 2020</p>
        <h1>Introducing a new digital bank to Nigeria</h1>
        <p>The launch website for Sparkle, a digital and lifestyle bank for personal and business customers, designed from a blank page.</p>
        <dl className={shared.details}>
          <div><dt>My role</dt><dd>UI/UX Designer</dd></div>
          <div><dt>Client</dt><dd>Sparkle</dd></div>
          <div><dt>Scope</dt><dd>Research, structure, UI & prototyping · 2020</dd></div>
        </dl>
      </header>
      <div className={styles.hero}>
        <Image src={`${media}hero-home-personal.jpg`} alt="Sparkle personal home page: the headline We're not a bank, we're a tribe, app store buttons and a phone and Sparkle card on a dark background." width={1440} height={900} priority sizes="(max-width: 1008px) 90vw, 960px" />
        <div className={styles.heroLinks}>
          <a href={prototype} target="_blank" rel="noopener noreferrer">Explore the interactive prototype <span aria-hidden="true">↗</span></a>
          <a href={liveSite} target="_blank" rel="noopener noreferrer">Visit sparkle.ng <span aria-hidden="true">↗</span></a>
        </div>
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
          {list.map(visual => <figure key={visual.file} className={`${shared.figure} ${styles.figure}`}>
            <a href={`${media}${visual.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${visual.alt}`}>
              <Image src={`${media}${visual.file}`} alt={visual.alt} width={visual.width} height={visual.height} className={shared.artifact} sizes="(max-width: 1008px) 90vw, 960px" />
            </a>
            <figcaption>{visual.caption}<span>Open image for full-size detail ↗</span></figcaption>
          </figure>)}
        </section>;
      })}
      <footer className={`${shared.closing} ${styles.closing}`}>
        <p>Sparkle · Website design, 2020</p>
        <a href={prototype} target="_blank" rel="noopener noreferrer">View the interactive prototype ↗</a>
        <a href={liveSite} target="_blank" rel="noopener noreferrer">Visit the live Sparkle website ↗</a>
        <Link href="/product-service-design">Back to all design projects →</Link>
      </footer>
    </article>
  </main>;
}
