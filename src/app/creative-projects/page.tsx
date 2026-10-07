import type { Metadata } from "next";
import { ProjectGridPage } from "@/components/ProjectGridPage";
import { CATEGORY_INFO } from "@/data/projects";

export const metadata: Metadata = { title: CATEGORY_INFO.creative.title };

export default function Page() {
  return <ProjectGridPage category="creative" />;
}
