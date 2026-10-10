import Link from "next/link";
import styles from "../app/gateway.module.css";

export default function PortfolioLink({ href, title, description, prompt }: {
  href: string;
  title: string;
  description: string;
  prompt: string;
}) {
  return (
    <Link className={styles.link} href={href}>
      <span className={styles.linkWindow}>
        <span className={styles.linkTitle}>{title}</span>
        <span className={styles.linkPreview}>
          <span className={styles.previewDescription}>{description}</span>
          <span className={styles.previewPrompt}>{prompt} <span aria-hidden="true">→</span></span>
        </span>
      </span>
    </Link>
  );
}
