export type DesignProject = {
  slug: string;
  title: string;
  category: string;
  period: string;
  summary: string;
  // Sharp public preview images for the project listing.
  heroPreview: string | null;
  heroWidth: number;
  heroHeight: number;
  supportingPreviews?: string[];
};

export const designProjects: DesignProject[] = [{
  slug: "cws-cares",
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
  title: "Making precious metals investing easier to navigate",
  category: "Fintech · GoldWise",
  period: "2022",
  summary: "Research, onboarding and mobile trading flows for people with different levels of investment experience.",
  heroPreview: "/project-previews/goldwise/overview.png",
  heroWidth: 3337,
  heroHeight: 1876,
  supportingPreviews: ["/project-previews/goldwise/onboarding.png", "/project-previews/goldwise/wireframes.png"],
}];
