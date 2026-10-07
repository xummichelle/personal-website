import Image from "next/image";
import type { Metadata } from "next";
import { CrayonBacking } from "@/components/Decorations";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { SITE } from "@/data/site";

const CONTACTS = [
  { href: `mailto:${SITE.email}`, label: SITE.email, icon: MailIcon },
  { href: SITE.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: SITE.github, label: "GitHub", icon: GitHubIcon },
];

export const metadata: Metadata = { title: "About me" };

export default function AboutPage() {
  return (
    <main className="page-pad flex flex-1 flex-col">
      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-14 pb-16 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-20">
        <div className="fade-in">
          <h1 className="font-hand text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Michelle Xu
          </h1>
          <p className="mt-3 text-xl font-semibold text-blue sm:text-2xl">programmer · game dev · artist</p>
          <div className="mt-6 max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              I&apos;m a Computer Science + Business double degree student at the University of Waterloo and Wilfrid
              Laurier University. I&apos;ve loved video games, visual arts and programming since I was a kid, so my
              work is a mix of all three!
            </p>
            <p>
              Right now I&apos;m a software developer intern at Clio. I just completed an internship at the Bioadaptive
              Interface Lab, building VR and exercise games for research, and before that I was a software developer
              intern at RBC four times. I&apos;m also a game jam enthusiast, a crocheter and an illustrator.
            </p>
          </div>
          <ul className="mt-8 flex items-center gap-4">
            {CONTACTS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-12 w-12 place-items-center rounded-full bg-paper-deep text-white transition hover:-translate-y-1 hover:bg-blue"
                >
                  <Icon className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-in relative mx-auto w-full max-w-sm md:max-w-none" style={{ animationDelay: "0.1s" }}>
          {/* photo with an offset layer of crayon colour underneath, like mimi's misprinted fill */}
          <div className="relative">
            <CrayonBacking className="translate-x-4 translate-y-4 -rotate-2 sm:translate-x-6 sm:translate-y-5" />
            <Image
              src="/me.webp"
              alt="Michelle Xu"
              width={383}
              height={383}
              loading="eager"
              className="relative aspect-square w-full rounded-[28px] border-[2.5px] border-ink object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
