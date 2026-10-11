"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photograph } from "../data/photography";
import styles from "./photo-gallery.module.css";

export default function PhotoGallery({ photos }: { photos: Photograph[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLAnchorElement | null>(null);
  const [index, setIndex] = useState(0);
  const photo = photos[index];

  function open(event: React.MouseEvent<HTMLAnchorElement>, nextIndex: number) {
    if (typeof dialog.current?.showModal !== "function") return;
    origin.current = event.currentTarget;
    setIndex(nextIndex);
    dialog.current.showModal();
    event.preventDefault();
  }

  function move(offset: number) {
    setIndex(value => Math.max(0, Math.min(photos.length - 1, value + offset)));
  }

  if (!photos.length) return <p className={styles.empty}>The first collection is being curated. Check back soon.</p>;

  return (
    <>
      <div className={styles.grid}>
        {photos.map((item, itemIndex) => (
          <figure key={item.id} className={item.fullWidth ? styles.wide : styles.figure}>
            <a className={styles.imageLink} href={item.src} aria-label={`View ${item.title}`} onClick={event => open(event, itemIndex)}>
              <Image src={item.src} width={item.width} height={item.height} alt={item.alt}
                sizes={item.fullWidth ? "(max-width: 640px) calc(100vw - 48px), (max-width: 1280px) 92vw, 1120px" : "(max-width: 640px) calc(100vw - 48px), (max-width: 1280px) 44vw, 540px"}
                className={styles.image} loading={itemIndex === 0 ? "eager" : "lazy"} />
            </a>
            <figcaption className={styles.caption}><span>{item.title}</span><span>{item.location} · {item.year}</span></figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="photograph-title"
        onClose={() => origin.current?.focus()}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        <div className={styles.viewer}>
          <div className={styles.toolbar}>
            <span className={styles.count} aria-live="polite">{index + 1} / {photos.length}</span>
            <button type="button" autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
          </div>
          <figure className={styles.viewFigure}>
            <div className={styles.stage}>
              <Image key={photo.id} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} sizes="100vw" className={styles.largeImage} />
            </div>
            <figcaption className={styles.viewCaption}>
              <span id="photograph-title">{photo.title}</span>
              <span>{photo.location} · {photo.year}</span>
            </figcaption>
          </figure>
          <div className={styles.controls}>
            <button type="button" disabled={index === 0} onClick={() => move(-1)}>← Previous</button>
            <button type="button" disabled={index === photos.length - 1} onClick={() => move(1)}>Next →</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
