import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "HexBot: Modular IRC Bot",
  description: "HexBot — modular IRC bot for Node.js",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background">
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4">
            {/* ── Header: logo + inline nav ─────────────────────── */}
            <header className="w-full rounded-b-lg bg-nav border border-t-0 border-border border-b-border-darker shadow-[0_0_0_1px_#000000] overflow-hidden">
              <div className="flex w-full items-stretch">
                <Link href="/" className="flex shrink-0 items-center px-4 text-foreground">
                  <h1 className="m-0 text-[12px] font-bold leading-none tracking-wide">
                    <img src="/logo_x16.png" alt="HexBot Logo" width="16" height="16" />
                    <span className="sr-only">HexBot</span>
                  </h1>
                </Link>
                <span className="nav-sep" />
                <nav className="flex flex-1 items-stretch">
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

            {/* ── Main content ──────────────────────────────────── */}
            <main className="flex flex-1 flex-col items-center py-4">{children}</main>

            {/* ── Footer ───────────────────────────────────────── */}
            <footer className="w-2xl mx-auto border-t border-border py-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <Link href="/">
                  <img src="/logo_x16.png" alt="HexBot Logo" width="16" height="16" />
                </Link>
                <div>
                  <div className="flex gap-3">
                    <Link href="/privacy" className="transition-colors hover:text-foreground">
                      Privacy
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-foreground">
                      Contact
                    </Link>
                  </div>
                  <div className="mt-1">Copyright &copy; HexBot 2026. All Rights Reserved.</div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
