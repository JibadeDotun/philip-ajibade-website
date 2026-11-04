"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ArtVisual } from "../data/art-direction";
import styles from "./photo-gallery.module.css";
import own from "./art-lightbox.module.css";

type Opener = (src: string, trigger: HTMLElement) => void;
const LightboxContext = createContext<Opener | null>(null);

/** One full-screen viewer per project page, so Previous and Next move through every image on the page. */
export function ArtLightbox({ visuals, children }: { visuals: ArtVisual[]; children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const visual = visuals[index];

  const open = useCallback<Opener>((src, trigger) => {
    const next = visuals.findIndex(item => item.src === src);
    if (next < 0 || typeof dialog.current?.showModal !== "function") return;
    origin.current = trigger;
    setIndex(next);
    dialog.current.showModal();
  }, [visuals]);

  const move = (offset: number) => setIndex(value => Math.max(0, Math.min(visuals.length - 1, value + offset)));
  const value = useMemo(() => open, [open]);

  return <LightboxContext.Provider value={value}>
    {children}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="art-image-title"
      onClose={() => origin.current?.focus()}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
      {visual && <div className={styles.viewer}>
        <div className={styles.toolbar}>
          <span className={styles.count} aria-live="polite">{index + 1} / {visuals.length}</span>
          <button type="button" autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
        </div>
        <figure className={styles.viewFigure}>
          <div className={styles.stage}>
            <Image key={visual.src} src={visual.src} width={visual.width} height={visual.height} alt={visual.alt}
              sizes="100vw" quality={85} className={`${styles.largeImage} ${own.large}`} />
          </div>
          <figcaption className={styles.viewCaption}>
            <span id="art-image-title">{visual.caption ?? visual.alt}</span>
          </figcaption>
        </figure>
        <div className={styles.controls}>
          <button type="button" disabled={index === 0} onClick={() => move(-1)}>← Previous</button>
          <button type="button" disabled={index === visuals.length - 1} onClick={() => move(1)}>Next →</button>
        </div>
      </div>}
    </dialog>
  </LightboxContext.Provider>;
}

/** An image that opens in the viewer. Falls back to a plain image outside a lightbox. */
export function ArtImage({ visual, sizes, priority }: { visual: ArtVisual; sizes: string; priority?: boolean }) {
  const open = useContext(LightboxContext);
  const image = <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height}
    sizes={sizes} quality={85} priority={priority} className={own.image} />;
  if (!open) return image;
  return <button type="button" className={own.trigger} aria-label={`View larger: ${visual.alt}`}
    onClick={event => open(visual.src, event.currentTarget)}>
    {image}
  </button>;
}
