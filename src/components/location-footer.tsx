"use client";

import { useEffect, useState } from "react";
import styles from "./location-footer.module.css";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export default function LocationFooter() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    const initial = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, []);

  const localHour = now ? Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", hour: "2-digit", hourCycle: "h23",
  }).format(now)) : null;
  const daytime = localHour !== null && localHour >= 6 && localHour < 18;

  return (
    <footer className={styles.footer}>
      <span className={styles.location}><span className={styles.label}>Working out of</span><span>Manchester, UK</span></span>
      <span className={styles.timeRow}>
      {now && (daytime ? (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-label="Daytime in Manchester" role="img">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
      ) : (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-label="Nighttime in Manchester" role="img">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
        </svg>
      ))}
      <time className={styles.clock} dateTime={now?.toISOString()} aria-label={now ? `Manchester local time: ${formatter.format(now)}` : "Manchester local time"}>
        {now ? formatter.format(now) : "--:--"}
      </time>
      </span>
    </footer>
  );
}
