import { CATEGORY_INFO, projectsIn, type Category } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { PageHeading } from "./PageHeading";

export function ProjectGridPage({ category }: { category: Category }) {
  const info = CATEGORY_INFO[category];
  return (
    <main className="flex flex-1 flex-col">
      <PageHeading title={info.title} subtitle={info.intro} />
      <div className="page-pad flex-1 bg-sheet">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 pt-10 sm:px-8 md:grid-cols-2">
          {projectsIn(category).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
