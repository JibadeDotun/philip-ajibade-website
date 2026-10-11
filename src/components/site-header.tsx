"use client";

import Link from "next/link";
import { useRef } from "react";
import styles from "./site-header.module.css";

const items = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];

export default function SiteHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement>(null);

  function openMenu(event: React.MouseEvent<HTMLElement>) {
    if (typeof dialog.current?.showModal !== "function") return;
    dialog.current.showModal();
    event.preventDefault();
  }

  function closeMenu() {
    dialog.current?.close();
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.identity}><span className={styles.name}>Philip Ajibade</span><span className={styles.role}>Designer</span></Link>
        <details className={styles.fallbackMenu}>
          <summary ref={trigger} className={styles.button} aria-label="Open menu" onClick={openMenu}>
            <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
          </summary>
          <nav className={styles.fallbackNavigation} aria-label="Main navigation">
            {/* Native links deliberately work without the Next.js runtime. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className={styles.fallbackIdentity}><span className={styles.name}>Philip Ajibade</span><span className={styles.role}>Designer</span></a>
            {items.map(item => <a key={item.href} href={item.href} className={styles.menuLink}>{item.title}</a>)}
          </nav>
        </details>
      </header>
      <dialog ref={dialog} id="site-menu" className={styles.dialog} aria-label="Site navigation" onClose={() => { trigger.current?.focus(); }}>
        <div className={styles.menuHeader}>
          <Link href="/" className={styles.identity} onClick={closeMenu}><span className={styles.name}>Philip Ajibade</span><span className={styles.role}>Designer</span></Link>
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
