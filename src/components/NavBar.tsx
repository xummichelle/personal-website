"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { usePet, type ActionType } from "@/pet/PetProvider";
import { WalkingPet } from "./WalkingPet";
import {
  BathIcon,
  BowlIcon,
  BrushIcon,
  CodeIcon,
  GitHubIcon,
  LinkedInIcon,
  ResumeIcon,
  ToiletIcon,
  UserIcon,
} from "./icons";
import { SITE } from "@/data/site";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
};

const LEFT: NavItem[] = [
  { href: "/about", label: "About me", icon: UserIcon },
  { href: "/tech-projects", label: "Tech projects", icon: CodeIcon },
  { href: "/creative-projects", label: "Creative projects", icon: BrushIcon },
];

const RIGHT: NavItem[] = [
  { href: "/resume", label: "Resume", icon: ResumeIcon },
  { href: SITE.linkedin, label: "LinkedIn", icon: LinkedInIcon, external: true },
  { href: SITE.github, label: "GitHub", icon: GitHubIcon, external: true },
];

const CARE: { action: ActionType; label: string; icon: NavItem["icon"] }[] = [
  { action: "feed", label: "Feed", icon: BowlIcon },
  { action: "clean", label: "Clean up", icon: ToiletIcon },
  { action: "bathe", label: "Bathe", icon: BathIcon },
];

/**
 * The solid white bar pinned to the bottom of every page: pages on the left,
 * pet care in the middle, links on the right. Outside the home page, the pet
 * lives on top of it.
 */
export function NavBar() {
  const pathname = usePathname();
  const { trigger } = usePet();
  const onHome = pathname === "/";

  const celebrate = () => trigger(Math.random() < 0.5 ? "jump" : "spin");

  const renderLink = (item: NavItem) => {
    const active = !item.external && pathname.startsWith(item.href);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={celebrate}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        aria-current={active ? "page" : undefined}
        title={item.label}
        className="pill px-1.5! py-1.5! sm:px-3! sm:py-2! xl:py-1.5!"
      >
        <Icon className="h-4 w-4 shrink-0 xl:hidden" />
        <span className="hidden xl:inline">{item.label}</span>
        <span className="sr-only xl:hidden">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
      <nav
        aria-label="Main"
        className="pointer-events-auto relative border-t-2 border-ink bg-white"
        style={{ height: "var(--nav-height)" }}
      >
        {!onHome && <WalkingPet />}

        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-1 px-2 sm:gap-3 sm:px-4">
          <div className="flex items-center justify-start gap-0.5 sm:gap-1.5">
            <Link
              href="/"
              onClick={celebrate}
              aria-current={onHome ? "page" : undefined}
              className="mr-1 font-hand text-xl leading-none whitespace-nowrap transition-colors hover:text-blue sm:mr-2 sm:text-2xl"
            >
              <span className="md:hidden" aria-hidden>
                MX
              </span>
              <span className="max-md:sr-only">{SITE.name}</span>
            </Link>
            {LEFT.map(renderLink)}
          </div>

          <div className="flex items-center gap-1 sm:gap-3" role="group" aria-label="Look after your pet">
            {CARE.map(({ action, label, icon: Icon }) => (
              <button
                key={action}
                type="button"
                onClick={() => trigger(action)}
                title={label}
                aria-label={label}
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-paper transition hover:-translate-y-0.5 hover:bg-paper-deep active:scale-90 sm:h-12 sm:w-12"
              >
                <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-0.5 sm:gap-2">{RIGHT.map(renderLink)}</div>
        </div>
      </nav>
    </div>
  );
}
