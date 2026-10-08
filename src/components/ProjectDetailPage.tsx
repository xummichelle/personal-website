import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_INFO, getProject, type Category } from "@/data/projects";
import { CrayonBacking } from "./Decorations";
import { ArrowLeftIcon, ExternalIcon } from "./icons";

export function ProjectDetailPage({ category, slug }: { category: Category; slug: string }) {
  const project = getProject(category, slug);
  if (!project) notFound();
  const info = CATEGORY_INFO[category];

  return (
    <main className="fade-in page-pad mx-auto w-full max-w-4xl overflow-x-clip px-4 pt-10 sm:px-6 sm:pt-14">
      <Link href={info.path} className="pill">
        <ArrowLeftIcon className="h-4 w-4" /> Back to {info.title.toLowerCase()}
      </Link>

      {/* the write-up, on a big taped scrap of paper with crayon colour underneath */}
      <div className="relative mt-8">
        <CrayonBacking className="translate-x-4 translate-y-5 rotate-[0.6deg] sm:translate-x-6 sm:translate-y-6" />
        <article className="paper-shadow relative rotate-[0.3deg]">
          <span className="scrap-tape" aria-hidden />
          <div className="scrap-paper p-6 pt-10 sm:p-12 sm:pt-14">
            <p className="text-xs font-semibold tracking-[0.08em] text-ink-soft uppercase">{project.date}</p>
            <h1 className="mt-2 font-hand text-4xl leading-tight sm:text-6xl">{project.title}</h1>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li key={t} className="rounded-full border-[1.5px] border-ink px-3 py-1 text-xs font-semibold tracking-wide uppercase" style={{ background: project.color }}>
                  {t}
                </li>
              ))}
            </ul>

            {project.links && project.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pill pill-filled py-2.5!"
                  >
                    {l.label} <ExternalIcon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}

            {project.draft && (
              <p className="mt-6 -rotate-1 rounded-2xl border-[1.5px] border-dashed border-ink bg-butter/50 px-4 py-3 text-lg font-semibold">
                ✏️ This page is still being sketched out. More soon!
              </p>
            )}

            {project.cover && (
              <div className="mt-8 overflow-hidden rounded-[4px]" style={{ background: project.color }}>
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(min-width: 896px) 800px, 100vw"
                  className="mx-auto h-auto max-h-[70vh] w-auto object-contain"
                  loading="eager"
                />
              </div>
            )}

            <div className="mt-8 space-y-8">
              {project.sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="font-hand text-3xl sm:text-4xl">{s.heading}</h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="mt-2 leading-relaxed text-ink-soft sm:text-lg">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-3 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 leading-relaxed text-ink-soft sm:text-lg">
                          <span aria-hidden className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full border-[1.5px] border-ink" style={{ background: project.color }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-12">
          <h2 className="text-center font-hand text-5xl">Gallery</h2>
          <div className="mt-8 grid items-end gap-6 sm:grid-cols-2">
            {project.gallery.map((g) => (
              <figure key={g.src + g.alt}>
                {g.caption && <figcaption className="mb-2 text-lg font-semibold">{g.caption}</figcaption>}
                <div className="overflow-hidden rounded-[20px] bg-card p-2 shadow-[0_14px_30px_-18px_rgba(31,34,53,0.5)]">
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 640px) 440px, 100vw" className="h-auto w-full rounded-[14px]" />
                </div>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
