import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { hasProjectAccess } from "../../../lib/project-access";
import ProjectGate from "../../../components/project-gate";
import CaseStudyProgress from "../../../components/case-study-progress";
import sections from "../../../data/goldwise.json";
import styles from "../cws-cares/page.module.css";

export const metadata: Metadata = {
  title: "GoldWise Case Study | Philip Ajibade",
  description: "Research, onboarding and mobile trading flows for a precious metals investment platform.",
  robots: { index: false, follow: false },
};
const media = "/product-service-design/goldwise/media/";
const visuals: Record<string, { file: string; alt: string; caption: string; width: number; height: number }[]> = {
  challenge: [{ file: "overview.png", alt: "GoldWise mobile designs showing the dashboard, metal prices, price chart and product categories.", caption: "High-fidelity mobile designs · An overview of the proposed trading experience.", width: 3337, height: 1876 }],
  research: [{ file: "buying-journey.jpg", alt: "Charles persona buying journey with stages, emotions, concerns and opportunities.", caption: "Research synthesis · A buying journey used to examine the decisions and concerns around purchasing metals.", width: 2048, height: 1266 }],
  onboarding: [
    { file: "onboarding-flow.jpg", alt: "Mapped onboarding journey with connected account setup steps and decision branches.", caption: "User flow · Mapping the route into the product before designing individual screens.", width: 2048, height: 941 },
    { file: "sketches.png", alt: "Early hand-drawn mobile screen concepts and navigation ideas.", caption: "Early sketches · Exploring structure and navigation before high-fidelity design.", width: 1779, height: 2048 },
    { file: "wireframes.png", alt: "Four mobile wireframes exploring market information, metals and account balances.", caption: "Wireframes · Establishing content hierarchy and the structure of key screens.", width: 2048, height: 941 },
  ],
  interface: [
    { file: "onboarding.png", alt: "GoldWise welcome, account access, personal details and country selection screens.", caption: "High-fidelity onboarding · Turning the account setup journey into a consistent mobile interface.", width: 2048, height: 941 },
    { file: "trading.png", alt: "Dark GoldWise screens showing portfolio balance, metal prices, market trends and categories.", caption: "High-fidelity trading screens · Bringing balances, market information and metal categories together.", width: 1170, height: 538 },
  ],
};
export default async function Goldwise() {
  if (!await hasProjectAccess("goldwise")) return <ProjectGate slug="goldwise" title="GoldWise" />;
  return <main id="main-content" tabIndex={-1} className={styles.page}>
    <CaseStudyProgress sections={sections.map(({ id, title }) => ({ id, label: title }))} />
    <article className={styles.article}>
      <Link href="/product-service-design" className={styles.back}>← All design projects</Link>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>GoldWise · Fintech · Mobile product design</p>
        <h1>Making precious metals investing easier to navigate</h1>
        <p>I led the UX for a mobile platform designed to help people explore, buy and invest in precious metals. My focus was on simplifying unfamiliar trading journeys for people with different levels of investment experience.</p>
        <dl className={styles.details}>
          <div><dt>Role</dt><dd>UX lead · Research, design & validation</dd></div>
          <div><dt>Product</dt><dd>Precious metals investment app</dd></div>
          <div><dt>Duration</dt><dd>Four months</dd></div>
        </dl>
      </header>
      <nav className={styles.contents} aria-label="Case study sections">
        <p className={styles.contentsLabel}>In this case study</p>
        <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span><span className={styles.sectionArrow} aria-hidden="true">↗</span></a></li>)}</ol>
      </nav>
      {sections.map(section => <section key={section.id} className={styles.section} aria-labelledby={section.id}>
        <h2 id={section.id}>{section.title}</h2>
        <div className={styles.copy}>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
        {section.id === "validation" && <figure className={styles.figure}>
          <iframe
            title="GoldWise interactive Figma prototype"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FIU9cuxuWuHoVQEbmDnxwf6%2FGoldWise_Private%3Fnode-id%3D816-20143%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D459%253A54096%26starting-point-node-id%3D1144%253A20996%26show-proto-sidebar%3D0"
            loading="lazy"
            allowFullScreen
            style={{ display: "block", width: "100%", height: "min(780px, 85svh)", minHeight: "480px", border: "1px solid var(--secondary)", background: "#fff" }}
          />
          <figcaption>Interactive prototype · Explore the GoldWise onboarding, buying and selling journeys. Use the full-screen control for a larger view. Figma may require sign-in or permission to view this private file.</figcaption>
        </figure>}
        {visuals[section.id]?.map(visual => <figure key={visual.file} className={styles.figure}>
          <a href={`${media}${visual.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${visual.alt}`}>
            <Image src={`${media}${visual.file}`} alt={visual.alt} width={visual.width} height={visual.height} unoptimized className={styles.artifact} />
          </a>
          <figcaption>{visual.caption}<span>Open image for full-size detail ↗</span></figcaption>
        </figure>)}
      </section>)}
      <footer className={styles.closing}><p>Have a complex product to make clearer?</p><Link href="/contact">Let’s talk <span aria-hidden="true">→</span></Link></footer>
    </article>
  </main>;
}
