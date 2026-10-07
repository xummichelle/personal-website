import Image from "next/image";
import { HomePet } from "@/components/HomePet";
import { Paws, Scallop } from "@/components/Decorations";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { SITE } from "@/data/site";

const CONTACTS = [
  { href: `mailto:${SITE.email}`, label: SITE.email, icon: MailIcon },
  { href: SITE.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: SITE.github, label: "GitHub", icon: GitHubIcon },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-14 pb-16 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-20">
        <div className="fade-in">
          <h1 className="font-serif text-6xl leading-[0.95] font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            Michelle Xu
          </h1>
          <p className="mt-3 font-hand text-2xl text-blue sm:text-3xl">programmer · game dev · artist</p>
          <div className="mt-6 max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              I&apos;m a Computer Science + Business double degree student at the University of Waterloo and Wilfrid
              Laurier University. I&apos;ve loved video games, visual arts and programming since I was a kid, so my
              work is a mix of all three!
            </p>
            <p>
              Right now I&apos;m a game developer intern at the Bioadaptive Interface Lab, building VR and exercise
              games for research. Before that I was a software developer intern at RBC four times. I&apos;m also a game
              jam enthusiast, a crocheter and an illustrator.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-6">
            {CONTACTS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-2 text-sm font-semibold"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-paper-deep text-white transition group-hover:-translate-y-1 group-hover:bg-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="underline-offset-4 group-hover:underline">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-in relative mx-auto w-full max-w-sm md:max-w-none" style={{ animationDelay: "0.1s" }}>
          <div className="overflow-hidden rounded-[32px] bg-card p-3 shadow-[0_20px_40px_-20px_rgba(31,34,53,0.45)]">
            <Image
              src="/me.webp"
              alt="Michelle Xu"
              width={383}
              height={383}
              loading="eager"
              className="aspect-square w-full rounded-[24px] object-cover"
            />
          </div>
        </div>

        <Paws className="absolute bottom-0 left-2 h-16 w-24 opacity-90 sm:left-6" />
      </section>

      <Scallop />
      <HomePet />
    </main>
  );
}
