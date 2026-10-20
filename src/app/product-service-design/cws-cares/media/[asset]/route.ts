import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasProjectAccess } from "../../../../../lib/project-access";

export const runtime = "nodejs";
const assets = new Set([
  "service-overview.png", "worker-journey.png", "emergency-placement.png",
  "roadmap.png", "rfa-prototype-flow.png", "rfa-application.png",
  "family-finding-poster.png", "family-finding-prototype.mp4",
]);

export async function GET(request: Request, context: { params: Promise<{ asset: string }> }) {
  if (!await hasProjectAccess("cws-cares")) return new Response(null, { status: 401 });
  const { asset } = await context.params;
  if (!assets.has(asset)) return new Response(null, { status: 404 });
  let data: Buffer;
  try { data = await readFile(path.join(process.cwd(), "project-assets/cws-cares", asset)); }
  catch { return new Response(null, { status: 404 }); }
  const headers = new Headers({
    "Content-Type": asset.endsWith(".mp4") ? "video/mp4" : "image/png",
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Accept-Ranges": "bytes",
  });
  const range = request.headers.get("range");
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    let start = 0, end = data.length - 1;
    if (match && (match[1] || match[2])) {
      if (!match[1]) start = Math.max(0, data.length - Number(match[2]));
      else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
    } else start = data.length;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= data.length) {
      headers.set("Content-Range", `bytes */${data.length}`);
      return new Response(null, { status: 416, headers });
    }
    headers.set("Content-Range", `bytes ${start}-${end}/${data.length}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(new Uint8Array(data.subarray(start, end + 1)), { status: 206, headers });
  }
  headers.set("Content-Length", String(data.length));
  return new Response(new Uint8Array(data), { headers });
}
