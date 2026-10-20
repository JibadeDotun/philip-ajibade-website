import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasProjectAccess } from "../../../../../lib/project-access";
export const runtime = "nodejs";
const assets = new Set(["overview.png", "buying-journey.jpg", "onboarding-flow.jpg", "sketches.png", "wireframes.png", "onboarding.png", "trading.png"]);
export async function GET(_request: Request, context: { params: Promise<{ asset: string }> }) {
  if (!await hasProjectAccess("goldwise")) return new Response(null, { status: 401 });
  const { asset } = await context.params;
  if (!assets.has(asset)) return new Response(null, { status: 404 });
  try {
    const data = await readFile(path.join(process.cwd(), "project-assets/goldwise", asset));
    return new Response(new Uint8Array(data), { headers: {
      "Content-Type": asset.endsWith(".jpg") ? "image/jpeg" : "image/png",
      "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
    } });
  } catch { return new Response(null, { status: 404 }); }
}
