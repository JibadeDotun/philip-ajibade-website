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

export function getPublishedPhotographs() {
  return photographs.filter(photo => photo.published).sort((a, b) => a.order - b.order);
}
