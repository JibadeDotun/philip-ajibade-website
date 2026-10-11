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

  return (
    <footer className={styles.footer}>
      <span className={styles.location}><span className={styles.label}>Working out of</span><span>Manchester, UK</span></span>
      <time className={styles.clock} dateTime={now?.toISOString()} aria-label={now ? `Manchester local time: ${formatter.format(now)}` : "Manchester local time"}>
        {now ? formatter.format(now) : "--:--"}
      </time>
    </footer>
  );
}
