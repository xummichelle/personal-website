import type { Metadata } from "next";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { getProject, projectsIn } from "@/data/projects";

export function generateStaticParams() {
  return projectsIn("tech").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/tech-projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: getProject("tech", slug)?.title };
}

export default async function Page(props: PageProps<"/tech-projects/[slug]">) {
  const { slug } = await props.params;
  return <ProjectDetailPage category="tech" slug={slug} />;
}
