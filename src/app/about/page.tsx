import type { Metadata } from "next";
import SectionFoundation from "../../components/section-foundation";

export const metadata: Metadata = { title: "About | Philip Ajibade" };

export default function Page() {
  return <SectionFoundation title="About" description="A little more about me, coming soon." />;
}
