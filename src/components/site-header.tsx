"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./site-header.module.css";

const items = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];

export default function SiteHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialog.current?.close();
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.identity}><span className={styles.name}>Philip Ajibade</span><span className={styles.role}>Designer &amp; Visual Storyteller</span></Link>
        <button ref={trigger} type="button" className={styles.button} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={openMenu}>
          <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
        </button>
      </header>
      <dialog ref={dialog} id="site-menu" className={styles.dialog} aria-label="Site navigation" onClose={() => { setOpen(false); trigger.current?.focus(); }}>
        <div className={styles.menuHeader}>
          <Link href="/" className={styles.identity} onClick={closeMenu}><span className={styles.name}>Philip Ajibade</span><span className={styles.role}>Designer &amp; Visual Storyteller</span></Link>
          <button type="button" className={styles.button} aria-label="Close menu" autoFocus onClick={closeMenu}>
            <span className={styles.closeIcon} aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <nav className={styles.menuNavigation} aria-label="Main navigation">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={styles.menuLink} onClick={closeMenu}>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </dialog>
    </>
  );
}
