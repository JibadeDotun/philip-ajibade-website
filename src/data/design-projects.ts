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
  supportingPreviews?: string[];
};

export const designProjects: DesignProject[] = [{
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
  period: "2023",
  summary: "Sole UI Designer for Dawn Health’s sleep app, from user flows and wireframes to a purple-led visual system and guided sleep logging.",
  heroPreview: "/project-previews/sleepmate/dashboard-screens.png",
  heroWidth: 1502,
  heroHeight: 978,
  supportingPreviews: ["/project-previews/sleepmate/logging-screens.png", "/project-previews/sleepmate/wireframe-screens.png"],
}];
