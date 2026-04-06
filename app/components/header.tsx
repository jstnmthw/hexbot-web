import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/plugins", label: "Plugins" },
  { href: "/deploy", label: "Deploy" },
  { href: "/news", label: "News" },
  {
    href: "https://github.com/jstnmthw/hexbot",
    label: "GitHub",
    external: true,
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full rounded-b-lg bg-nav border border-t-0 border-border border-b-border-darker shadow-[0_0_0_1px_#000000] overflow-hidden">
      <div className="flex w-full items-stretch">
        <Link href="/" aria-label="HexBot home" className="flex shrink-0 items-center px-4 text-foreground">
          <Image src="/hexbot.svg" alt="" width={16} height={16} priority />
          <span className="sr-only">HexBot</span>
        </Link>
        <span className="nav-sep" />
        <nav aria-label="Main navigation" className="flex flex-1 items-stretch">
          {NAV_LINKS.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 && <span className="nav-sep" />}
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center px-3 py-2 text-nav-foreground transition-colors hover:text-foreground">
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="flex flex-1 items-center justify-center px-3 py-2 text-nav-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
}
