import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import AboutGuide from "../../components/about-guide";

export const metadata: Metadata = {
  title: "About | Philip Ajibade",
  description: "Product and service designer, art director, and photographer working out of Manchester, UK.",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <article id="about-story" className={styles.article}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>About me</p>
          <h1>Hi, I’m Philip. I hunt down the moment people give up.</h1>
          <p>You know the one. The form asking for a number you don’t have. The button that does nothing. The app that makes you feel stupid when, really, the app is the stupid one.</p>
          <p>I’ve spent eight years chasing that moment.</p>
        </header>

        <AboutGuide />

        <section className={styles.section} aria-labelledby="what-i-do">
          <h2 id="what-i-do">What I do</h2>
          <div className={styles.copy}>
            <p>I’ve found that moment in a bank account you open by dialling a code on a basic phone. In a telehealth portal where someone just wants to see a doctor. In a precious metals platform that needed to feel like an open door, not a vault.</p>
            <p>But fixing the flow is only half of it. People decide how they feel about something long before they tap a button. So I also build the first impression: the brand, the type, the colour, the logo that has to work on a billboard and a favicon. I started as an art director, and I never really stopped. I still care far too much about kerning.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="how-i-work">
          <h2 id="how-i-work">How I work</h2>
          <div className={styles.copy}>
            <p>I studied maths. Then I found design, which turned out to be maths with feelings.</p>
            <p>I sketch before I polish. I ask “why” more than is polite. I’d rather show you something rough on Tuesday than something perfect next month.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="where-i-work">
          <h2 id="where-i-work">Where I put it into practice</h2>
          <div className={styles.copy}>
            <p>By day, I work at HMRC. Yes, really. Every week I watch people wrestle with systems that were never built with them in mind, and every week I take notes. Best design school I never enrolled in.</p>
            <p>By night (and early mornings, and the odd lunch break), I’m:</p>
            <ul>
              <li>lead designer at <strong>Glyphra</strong></li>
              <li>one half of <strong>Nimé Studios</strong>, photographing and filming for West African families across the UK</li>
              <li>the person my church calls when something needs to look good</li>
              <li>design adviser to <strong>TFN</strong>, a news startup across the Atlantic</li>
              <li>still answering the phone for <strong>DisruptDNA</strong> and the <strong>Nigeria Network of NGOs</strong>, because some collaborations don’t end, they just evolve</li>
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="outside-work">
          <h2 id="outside-work">Outside of work</h2>
          <div className={styles.copy}>
            <p>When nobody’s paying me, I walk around with a camera. Street photography is where I practise seeing: light hitting a wall at the wrong angle, a stranger mid-laugh, a shopfront nobody’s looked at properly in years. Half my design instincts come from those walks.</p>
            <p>When I’m off the clock (and the camera’s off), I’m losing at chess (gracefully), chasing a sub-four marathon (less gracefully), or “just looking” at cars. I am never just looking.</p>
          </div>
        </section>

        <div className={styles.closing}>
          <p>Got a moment where people give up? Or a brand that doesn’t look like itself yet?</p>
          <Link href="/contact">Let’s go find it <span aria-hidden="true">→</span></Link>
        </div>
      </article>
    </main>
  );
}
