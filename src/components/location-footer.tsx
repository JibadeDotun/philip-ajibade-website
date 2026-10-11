"use client";

import { useEffect, useState } from "react";
import styles from "./location-footer.module.css";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

type ManchesterWeather = {
  current: { temperature_2m: number; weather_code: number };
  daily: { sunrise: number[]; sunset: number[] };
};

const dayFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" });

function weatherDescription(code: number) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorms";
  return "Weather";
}

export default function LocationFooter() {
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const [weather, setWeather] = useState<ManchesterWeather | null>(null);
  const [weatherFailed, setWeatherFailed] = useState(false);

  useEffect(() => {
    if (paused) return;
    const update = () => setNow(new Date());
    const initial = window.setTimeout(update, 0);
    const interval = paused ? undefined : window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    let disposed = false;
    let controller: AbortController | null = null;
    async function refresh() {
      controller?.abort();
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 10000);
      try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=53.4808&longitude=-2.2426&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=Europe%2FLondon&timeformat=unixtime&forecast_days=2", { signal: controller.signal });
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json() as ManchesterWeather;
        if (!Number.isFinite(data.current?.temperature_2m) || !Number.isFinite(data.current?.weather_code) || !data.daily?.sunrise?.every(Number.isFinite) || !data.daily?.sunset?.every(Number.isFinite) || !data.daily.sunrise.length || data.daily.sunrise.length !== data.daily.sunset.length) throw new Error("Invalid weather data");
        if (!disposed) { setWeather(data); setWeatherFailed(false); }
      } catch {
        if (!disposed) { setWeather(null); setWeatherFailed(true); }
      } finally { window.clearTimeout(timeout); }
    }
    void refresh();
    const interval = paused ? undefined : window.setInterval(refresh, 10 * 60 * 1000);
    return () => { disposed = true; controller?.abort(); window.clearInterval(interval); };
  }, [paused]);

  const dayIndex = now && weather ? weather.daily.sunrise.findIndex(sunrise => dayFormatter.format(new Date(sunrise * 1000)) === dayFormatter.format(now)) : -1;
  const daytime = now && weather && dayIndex >= 0
    ? now.getTime() >= weather.daily.sunrise[dayIndex] * 1000 && now.getTime() < weather.daily.sunset[dayIndex] * 1000
    : null;

  return (
    <footer className={styles.footer}>
      <span className={styles.location}><span className={styles.label}>Working out of</span><span>Manchester, UK</span></span>
      <span className={styles.timeRow}>
      {daytime !== null && (daytime ? (
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
      <span className={styles.separator} aria-hidden="true" />
      <a className={styles.weather} href="https://open-meteo.com/" target="_blank" rel="noreferrer" aria-label={weather ? `Manchester weather: ${Math.round(weather.current.temperature_2m)} degrees Celsius, ${weatherDescription(weather.current.weather_code)}. Weather by Open-Meteo` : weatherFailed ? "Manchester weather unavailable. Weather by Open-Meteo" : "Loading Manchester weather. Weather by Open-Meteo"}>
        {weather ? `${Math.round(weather.current.temperature_2m)}°C · ${weatherDescription(weather.current.weather_code)}` : weatherFailed ? "Weather unavailable" : "Loading weather…"}
      </a>
      </span>
      <button type="button" className={styles.updates} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? "Resume live updates" : "Pause live updates"}
      </button>
    </footer>
  );
}
