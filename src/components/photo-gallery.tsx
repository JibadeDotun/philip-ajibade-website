"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photograph } from "../data/photography";
import styles from "./photo-gallery.module.css";

export default function PhotoGallery({ photos }: { photos: Photograph[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLAnchorElement | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const photo = photos[index];
  const rowCount = Math.min(3, Math.max(1, Math.floor(photos.length / 3)));
  const rows = Array.from({ length: rowCount }, (_, row) =>
    photos.map((item, itemIndex) => ({ item, itemIndex })).filter(({ itemIndex }) => itemIndex % rowCount === row));

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
      {photos.length > 1 && <div className={styles.motionControl}>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? "Resume movement" : "Pause movement"}
        </button>
      </div>}
      <div className={styles.reel} data-paused={paused}>
        {rows.map((row, rowIndex) => <PhotoRow key={rowIndex} rowIndex={rowIndex} paused={paused} moving={photos.length > 1}>
          <div className={styles.track}>
          {(photos.length > 1 ? [false, true] : [false]).map(copy => <div key={String(copy)} className={styles.group} aria-hidden={copy || undefined}>
          {row.map(({ item, itemIndex }) => (
          <figure key={item.id} className={styles.figure}>
            <a className={styles.imageLink} href={item.src} tabIndex={copy ? -1 : undefined} aria-label={`View ${item.title}`} onClick={event => open(event, itemIndex)}>
              <Image src={item.src} width={item.width} height={item.height} alt={copy ? "" : item.alt}
                sizes="(max-width: 640px) 80vw, 480px"
                className={styles.image} loading={itemIndex === 0 ? "eager" : "lazy"} />
            </a>
            <figcaption className={styles.caption}><span>{item.title}</span><span>{item.location} · {item.year}</span></figcaption>
          </figure>
          ))}
          </div>)}
          </div>
        </PhotoRow>)}
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

function PhotoRow({ children, rowIndex, paused, moving }: {
  children: React.ReactNode; rowIndex: number; paused: boolean; moving: boolean;
}) {
  const row = useRef<HTMLDivElement>(null);
  const speed = useRef(1);
  const manualUntil = useRef(0);
  const touching = useRef(false);
  const keyboardInteraction = useRef(true);

  useEffect(() => {
    const keyboard = () => { keyboardInteraction.current = true; };
    const pointer = () => { keyboardInteraction.current = false; };
    window.addEventListener("keydown", keyboard);
    window.addEventListener("pointerdown", pointer);
    return () => {
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("pointerdown", pointer);
    };
  }, []);

  useEffect(() => {
    const element = row.current;
    if (!element || !moving) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let position = element.scrollLeft;
    function tick(time: number) {
      if (!element) return;
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      const group = element.firstElementChild?.firstElementChild as HTMLElement | undefined;
      const loopWidth = group?.offsetWidth || 0;
      const manual = touching.current || Date.now() < manualUntil.current;
      const keyboardFocused = keyboardInteraction.current && element.contains(document.activeElement);
      if (paused || reduced.matches || manual || keyboardFocused) {
        position = element.scrollLeft;
      } else if (loopWidth > element.clientWidth) {
        position += elapsed * loopWidth / 65000 * speed.current * (rowIndex % 2 ? -1 : 1);
        position = ((position % loopWidth) + loopWidth) % loopWidth;
        element.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [moving, paused, rowIndex]);

  return <div ref={row} className={styles.row} tabIndex={0}
    role="region" aria-label={`Photograph row ${rowIndex + 1}, scroll sideways to browse`}
    onPointerEnter={event => { if (event.pointerType === "mouse") speed.current = 0.25; }}
    onPointerLeave={() => { speed.current = 1; manualUntil.current = 0; }}
    onWheel={() => { keyboardInteraction.current = false; manualUntil.current = Date.now() + 2000; }}
    onTouchStart={() => { keyboardInteraction.current = false; touching.current = true; }}
    onTouchEnd={() => { touching.current = false; manualUntil.current = Date.now() + 2000; }}
    onTouchCancel={() => { touching.current = false; }}>
    {children}
  </div>;
}
