import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const projects = new Set(["cws-cares", "goldwise"]);
export function projectPassword(slug: string) {
  return projects.has(slug) ? process.env.PROJECT_PASSWORD || "" : "";
}
export function cookieName(slug: string) { return `project-access-${slug}`; }
export function passwordsMatch(input: string, expected: string) {
  return Boolean(expected) && timingSafeEqual(createHash("sha256").update(input).digest(), createHash("sha256").update(expected).digest());
}
export function accessToken(slug: string, expires: number, password: string) {
  const signature = createHmac("sha256", password).update(`${slug}:${expires}`).digest("hex");
  return `${expires}.${signature}`;
}
export async function hasProjectAccess(slug: string) {
  const password = projectPassword(slug);
  if (!password) return false;
  const token = (await cookies()).get(cookieName(slug))?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  const expiry = Number(expires);
  if (!signature || !Number.isSafeInteger(expiry) || expiry <= Date.now()) return false;
  return passwordsMatch(token, accessToken(slug, expiry, password));
}
