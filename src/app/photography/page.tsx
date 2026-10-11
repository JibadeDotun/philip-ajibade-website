import type { Metadata } from "next";
import Link from "next/link";
import PhotoGallery from "../../components/photo-gallery";
import { getPublishedPhotographs } from "../../data/photography";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Photography | Philip Ajibade",
  description: "Street photography by Philip Ajibade. People, places, and everyday moments.",
};

export default async function Photography() {
  const photos = await getPublishedPhotographs();
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>Photography</h1>
          <p>People, places, and everyday moments.</p>
        </header>
        <section aria-labelledby="selected-photographs">
          <div className={styles.sectionHeader}>
            <h2 id="selected-photographs">Selected photographs</h2>
            {photos.length > 0 && <span>{photos.length} photographs</span>}
          </div>
          <PhotoGallery photos={photos} />
        </section>
        <div className={styles.closing}>
          <p>Have a story worth capturing?</p>
          <Link href="/contact">Let’s talk <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </main>
  );
}
