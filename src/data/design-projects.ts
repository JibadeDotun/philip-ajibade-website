export type DesignProject = {
  slug: string;
  title: string;
  name: string;
  category: string;
  period: string;
  summary: string;
  // Sharp public preview images for the project listing.
  heroPreview: string | null;
  heroWidth: number;
  heroHeight: number;
  /** Which part of the preview stays in view when it is cropped to fill the card. */
  heroPosition?: string;
  supportingPreviews?: string[];
  /** Set to false to keep a project off the live site while it is being checked. */
  published?: boolean;
};

export const designProjects: DesignProject[] = [{
  slug: "sparkle",
  name: "Sparkle",
  title: "Introducing a new digital bank to Nigeria",
  category: "Fintech · Sparkle",
  period: "2020",
  summary: "UI/UX Designer for the launch website of a new digital and lifestyle bank, from research and site structure to personal, business and product pages.",
  heroPreview: "/project-previews/sparkle/hero-home-personal.jpg",
  heroWidth: 1440,
  heroHeight: 900,
}, {
  slug: "cws-cares",
  name: "CWS-CARES",
  title: "Designing for RFA approvals and sibling-placement decisions",
  category: "Public services",
  period: "2017–2019",
  summary: "Research synthesis, journey mapping and interactive prototypes for RFA and family-finding workflows.",
  heroPreview: "/project-previews/cws-cares/application.png",
  heroWidth: 2046,
  heroHeight: 1536,
  supportingPreviews: ["/project-previews/cws-cares/service.png", "/project-previews/cws-cares/flow.png"],
}, {
  slug: "goldwise",
  name: "GoldWise",
  title: "Making precious metals investing easier to navigate",
  category: "Fintech · GoldWise",
  period: "2022",
  summary: "Research, onboarding and mobile trading flows for people with different levels of investment experience.",
  heroPreview: "/project-previews/goldwise/overview.png",
  heroWidth: 3337,
  heroHeight: 1876,
  supportingPreviews: ["/project-previews/goldwise/onboarding.png", "/project-previews/goldwise/wireframes.png"],
}, {
  slug: "sleepmate",
  name: "SleepMate",
  title: "Designing a clearer way to record and review sleep",
  category: "Health · Dawn Health",
  period: "2022",
  summary: "UI Designer for Dawn Health’s sleep app, from user flows and wireframes to a purple-led visual system and guided sleep logging.",
  heroPreview: "/project-previews/sleepmate/card-preview.png",
  heroWidth: 2043,
  heroHeight: 1118,
  supportingPreviews: ["/project-previews/sleepmate/logging-screens.png", "/project-previews/sleepmate/wireframe-screens.png"],
}];

/** Projects shown on the listing: unpublished ones appear only in local development. */
export const visibleDesignProjects = designProjects.filter(project => project.published !== false || process.env.NODE_ENV !== "production");
