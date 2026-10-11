import type { Photograph } from "./photography";

type Row = {
  _id: string; title: string; alt: string; location: string; year: number;
  order: number; fullWidth?: boolean; collection?: string;
  asset: { url: string; width: number; height: number };
};

function validRow(value: unknown, pathPrefix: string): value is Row {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<Row>;
  const asset = row.asset;
  return typeof row._id === "string" && !row._id.startsWith("drafts.") && !row._id.startsWith("versions.")
    && [row.title, row.alt, row.location].every(value => typeof value === "string" && value.trim().length > 0)
    && typeof row.year === "number" && Number.isInteger(row.year)
    && typeof row.order === "number" && Number.isFinite(row.order)
    && !!asset && typeof asset.url === "string" && asset.url.startsWith(pathPrefix)
    && Number.isFinite(asset.width) && asset.width > 0 && Number.isFinite(asset.height) && asset.height > 0;
}

export function mapSanityPhotographs(rows: unknown, projectId: string, dataset: string): Photograph[] {
  if (!Array.isArray(rows)) throw new Error("Invalid photography response");
  const prefix = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;
  return rows.filter(row => validRow(row, prefix)).map(row => ({
    id: row._id, src: row.asset.url, width: row.asset.width, height: row.asset.height,
    title: row.title, alt: row.alt, location: row.location, year: row.year, order: row.order,
    fullWidth: row.fullWidth === true, collection: typeof row.collection === "string" ? row.collection : undefined,
    published: true,
  })).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export async function readSanityPhotographs(projectId: string, dataset: string) {
  if (!/^[a-z0-9]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset)) throw new Error("Invalid Sanity configuration");
  const query = '*[_type == "photograph" && visible == true] | order(order asc, _id asc) {_id, title, alt, location, year, order, fullWidth, collection, "asset": image.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}}';
  const endpoint = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("perspective", "published");
  const response = await fetch(endpoint, { next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Photography request failed: ${response.status}`);
  const body = await response.json() as { result?: unknown };
  return mapSanityPhotographs(body.result, projectId, dataset);
}
