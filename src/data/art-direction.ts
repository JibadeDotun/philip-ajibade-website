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
  summary: "A hand-drawn 2D animated short about child marriage, produced at Disrupt DNA Studios. Best Animation at the 2022 AFRIFF Globe Awards.",
  year: "2022",
  format: "2D animated short film",
  role: "Art Director & Graphic Designer",
  studio: "Disrupt DNA Studios",
  recognition: [
    "Best Animation, AFRIFF Globe Awards 2022",
    "Nominee, Best Short Film, AMVCA 2023",
  ],
  brief: [
    "The Song Maiden is a traditional frame-by-frame 2D animated short about child marriage and the value of the girl child. In the fictional village of Song, a girl is promised in marriage at birth, marked by a red ribbon on each wrist. She grows up curious and independent, hunting lizards with her friends and climbing the mountain where she feels free, until she is married as a teenager and decides to escape her fate.",
    "Producer and creative director Nkem Nwaturuocha drew the story from a visit to Sukur, the UNESCO World Heritage cultural landscape in Adamawa State, Nigeria. Song is fictional, but it draws a deliberate parallel with that place.",
  ],
  contribution: [
    "I was the art director and graphic designer on the film, working with a team of illustrators, animators and video editors.",
    "With the illustrators, I shaped the characters, starting with the Maiden. Her expressions had to carry defiance and curiosity, and follow her change from an outsider in her own village to someone who fights for her freedom.",
    "I treated the village, the mountains and the woods as part of the story rather than as backdrops. The village holds both the warmth of tradition and the weight of expectation; the mountain is where the Maiden feels free.",
    "With the animators, I worked on movement and on a shift in animation style when the Maiden's world turns dark. With the video editors, I shaped the transitions so that her flight to the mountain reads as an emotional climb as well as a physical one.",
  ],
  credits: [
    { role: "Producer & Creative Director", name: "Nkem Nwaturuocha" },
    { role: "Art Director & Graphic Designer", name: "Philip Ajibade" },
    { role: "Studio", name: "Disrupt DNA Studios" },
    { role: "Images", name: "The Song Maiden art book, Disrupt DNA Studios" },
  ],
  cover: { src: "/art-direction/the-song-maiden/village-of-song.jpg", alt: "Greyscale painting of the village of Song at night, beneath a full moon and three flat-topped mountains, framed by trees and rocks.", width: 2000, height: 855 },
  visuals: [
    { src: "/art-direction/the-song-maiden/maiden-key-art.jpg", alt: "Key art of the Maiden holding a glowing light, with The Song Maiden title and the line freedom or nothing.", caption: "Key art · The Maiden and the film's title mark.", width: 880, height: 855 },
    { src: "/art-direction/the-song-maiden/maiden-on-the-clifftop.jpg", alt: "The Maiden standing on a clifftop with her arms spread wide against a pale sky.", caption: "The mountain · Where the Maiden feels free.", width: 1180, height: 855 },
    { src: "/art-direction/the-song-maiden/expressions-and-title.jpg", alt: "Pencil expression sheet of the Maiden beside the hand-lettered Song Maiden title with a red ribbon.", caption: "Expression studies and title lettering.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/character-lineup.jpg", alt: "Line-up of the film's characters in greyscale, from the Maiden's betrothed to her parents, friends and villagers.", caption: "Character line-up · The people of Song.", width: 1400, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/maiden-hair-and-pov.jpg", alt: "Studies of the Maiden's hair and frames shown from her point of view.", caption: "The Maiden's hair, and the village seen through her eyes.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/colour-keys-and-hut.jpg", alt: "Character colour studies of a villager and the betrothed, alongside paintings of a thatched hut inside and out.", caption: "Character colour and the village interiors.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/storyboards.jpg", alt: "Storyboard strips and rough sketches for the film's opening birth sequence.", caption: "Storyboards and rough sketches.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/red-ribbon-colour-moments.jpg", alt: "Frames where colour breaks into the greyscale world: a red ribbon against blue sky, red ribbons on a wrist and a glowing amber light.", caption: "Colour in a greyscale world · The red ribbon of the betrothal, and an amber light.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/mountain-woods.jpg", alt: "Greyscale painting of tall grass and plants at the foot of a rock face.", caption: "Environment · The woods at the foot of the mountain.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/environments-and-cave.jpg", alt: "Landscape studies of the plains and a great tree, with a cave scene of a woman and two children.", caption: "Landscape studies and a cave scene.", width: 2000, height: 855, wide: true },
    { src: "/art-direction/the-song-maiden/cliffs.jpg", alt: "Studies of steep cliffs and mist, with the Maiden small on a ledge.", caption: "Environment · The cliffs the Maiden climbs.", width: 2000, height: 855, wide: true },
  ],
  published: false,
}];

/** Unpublished projects are previewable in development but hidden in production. */
export const visibleArtProjects = artProjects.filter(project => project.published || process.env.NODE_ENV !== "production");
