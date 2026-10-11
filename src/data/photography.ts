import { readSanityPhotographs } from "./sanity-photography";

export type Photograph = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  location: string;
  year: number;
  collection?: string;
  fullWidth?: boolean;
  order: number;
  published: boolean;
};

// Real photographs will be added here until the content editor is connected.
// Keep original files backed up separately; src points to a web-ready copy.
export const photographs: Photograph[] = [];

export async function getPublishedPhotographs() {
  const local = photographs.filter(photo => photo.published).sort((a, b) => a.order - b.order);
  // Public project identifier; environment settings can override it for other deployments.
  const projectId = process.env.SANITY_PROJECT_ID || "uljstmd1";
  const dataset = process.env.SANITY_DATASET || "production";
  try {
    return await readSanityPhotographs(projectId, dataset);
  } catch {
    console.warn("Photography CMS unavailable; displaying the local selection.");
    return local;
  }
}
