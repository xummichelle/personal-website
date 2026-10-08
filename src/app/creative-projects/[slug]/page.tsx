import type { Metadata } from "next";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { getProject, pagesIn } from "@/data/projects";

export function generateStaticParams() {
  return pagesIn("creative").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/creative-projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: getProject("creative", slug)?.title };
}

export default async function Page(props: PageProps<"/creative-projects/[slug]">) {
  const { slug } = await props.params;
  return <ProjectDetailPage category="creative" slug={slug} />;
}
