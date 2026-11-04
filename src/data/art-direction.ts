export type ArtVisual = { src: string; alt: string; caption?: string; width: number; height: number; wide?: boolean };

export type ArtProject = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  year: string;
  format: string;
  role: string;
  studio: string;
  recognition: string[];
  brief: string[];
  contribution: string[];
  credits: { role: string; name: string }[];
  film?: { title: string; embedUrl: string };
  cover?: ArtVisual;
  visuals: ArtVisual[];
  /** Keep false until real visuals and Philip's own account of his role are in place. */
  published: boolean;
};

export const artProjects: ArtProject[] = [{
  slug: "the-song-maiden",
  name: "The Song Maiden",
  title: "Art direction for an award-winning animated short",
  summary: "An animated short film about child marriage, produced at Disrupt DNA Studios. Best Animation at the 2022 AFRIFF Globe Awards.",
  year: "2022",
  format: "Animated short film",
  role: "Art Director",
  studio: "Disrupt DNA Studios",
  recognition: [
    "Best Animation, AFRIFF Globe Awards 2022",
    "Nominee, Best Short Film, AMVCA 2023",
  ],
  brief: [
    "The Song Maiden is an animated short film that addresses child marriage. It was produced at Disrupt DNA Studios, where I worked as Senior Art Director.",
  ],
  // To be written from Philip's own account: what the art direction covered and how the look was developed.
  contribution: [],
  credits: [
    { role: "Art Director", name: "Philip Ajibade" },
    { role: "Studio", name: "Disrupt DNA Studios" },
  ],
  visuals: [],
  published: false,
}];

/** Unpublished projects are previewable in development but hidden in production. */
export const visibleArtProjects = artProjects.filter(project => project.published || process.env.NODE_ENV !== "production");
