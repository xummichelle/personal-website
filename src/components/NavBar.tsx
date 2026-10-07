"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { usePet, type ActionType } from "@/pet/PetProvider";
import { WalkingPet } from "./WalkingPet";
import {
  BathIcon,
  BrushIcon,
  ChickenWingIcon,
  CodeIcon,
  GitHubIcon,
  HomeIcon,
  LinkedInIcon,
  PooIcon,
  ResumeIcon,
} from "./icons";
import { SITE } from "@/data/site";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
};

const LEFT: NavItem[] = [
  { href: "/", label: "About me", icon: HomeIcon },
  { href: "/tech-projects", label: "Tech projects", icon: CodeIcon },
  { href: "/creative-projects", label: "Creative projects", icon: BrushIcon },
];

const RIGHT: NavItem[] = [
  { href: "/resume", label: "Resume", icon: ResumeIcon },
  { href: SITE.linkedin, label: "LinkedIn", icon: LinkedInIcon, external: true },
  { href: SITE.github, label: "GitHub", icon: GitHubIcon, external: true },
];

const CARE: { action: ActionType; label: string; icon: NavItem["icon"] }[] = [
  { action: "feed", label: "Feed", icon: ChickenWingIcon },
  { action: "poo", label: "Poo", icon: PooIcon },
  { action: "bathe", label: "Bathe", icon: BathIcon },
];

/**
 * The solid white bar pinned to the bottom of every page. Outside the home
 * page, the pet lives on top of it.
 */
export function NavBar() {
  const pathname = usePathname();
  const { trigger } = usePet();
  const onHome = pathname === "/";

  const celebrate = () => trigger(Math.random() < 0.5 ? "jump" : "spin");

  const renderLink = (item: NavItem) => {
    const active = !item.external && (item.href === "/" ? onHome : pathname.startsWith(item.href));
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
        className="pill px-2! py-2! sm:px-3! xl:px-4! xl:py-1.5!"
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

        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-1 px-2 sm:px-6">
          <div className="flex items-center gap-0.5 sm:gap-2">{LEFT.map(renderLink)}</div>

          <div className="flex items-center gap-1 sm:gap-3" role="group" aria-label="Look after your pet">
            {CARE.map(({ action, label, icon: Icon }) => (
              <button
                key={action}
                type="button"
                onClick={() => trigger(action)}
                title={label}
                aria-label={label}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-paper transition hover:-translate-y-0.5 hover:bg-paper-deep active:scale-90 sm:h-12 sm:w-12"
              >
                <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-0.5 sm:gap-2">{RIGHT.map(renderLink)}</div>
        </div>
      </nav>
    </div>
  );
}
