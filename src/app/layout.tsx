import type { Metadata } from "next";
import { Hedvig_Letters_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "../components/site-header";
import LocationFooter from "../components/location-footer";

const display = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gateway",
});

// Handwritten face (Shelby) for the written-out surname in the header.
const nameScript = localFont({
  src: "../fonts/shelby.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-name-script",
});

export const metadata: Metadata = {
  title: "Philip Ajibade | Design & Photography",
  description: "Explore Philip Ajibade’s product and service design, art direction, and photography.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${nameScript.variable}`}>
      <body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />{children}<LocationFooter /></body>
    </html>
  );
}
