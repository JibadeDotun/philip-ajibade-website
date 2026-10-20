export type DesignProject = {
  slug: string;
  title: string;
  category: string;
  period: string;
  summary: string;
  // Use a separately exported, already-blurred public preview, never a confidential original.
  heroPreview: string | null;
};

export const designProjects: DesignProject[] = [{
  slug: "cws-cares",
  title: "Designing for RFA approvals and sibling-placement decisions",
  category: "Public services",
  period: "2017–2019",
  summary: "Research synthesis, journey mapping and interactive prototypes for RFA and family-finding workflows.",
  heroPreview: null,
}, {
  slug: "goldwise",
  title: "Making precious metals investing easier to navigate",
  category: "Fintech · GoldWise",
  period: "Four-month project",
  summary: "Research, onboarding and mobile trading flows for people with different levels of investment experience.",
  heroPreview: null,
}];
