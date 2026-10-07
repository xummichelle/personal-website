import Image from "next/image";
import Link from "next/link";
import { CATEGORY_INFO, type Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const href = `${CATEGORY_INFO[project.category].path}/${project.slug}`;
  return (
    <Link href={href} className="crayon-card group flex flex-col p-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]" style={{ background: project.color }}>
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="-rotate-3 font-hand text-4xl sm:text-5xl">{project.doodle ?? project.title}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className="text-xs font-semibold tracking-[0.08em] text-ink-soft uppercase">{project.date}</p>
        <h2 className="mt-1 font-hand text-3xl leading-tight">{project.title}</h2>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{project.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border-[1.5px] border-ink px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
