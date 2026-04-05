import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { SITE_URL } from "./config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HexBot: Modular IRC Bot for Node.js",
    template: "%s | HexBot",
  },
  description:
    "HexBot is a modular, hot-reloadable IRC bot for Node.js, written in TypeScript. Deploy with Docker, extend with plugins, and run on any IRC network.",
  applicationName: "HexBot",
  keywords: ["IRC bot", "IRC", "Node.js", "TypeScript", "Docker", "hot-reload", "plugins", "SASL", "IRCv3"],
  authors: [{ name: "jstnmthw", url: "https://github.com/jstnmthw" }],
  creator: "jstnmthw",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "HexBot",
    title: "HexBot: Modular IRC Bot for Node.js",
    description:
      "A modular, hot-reloadable IRC bot for Node.js, written in TypeScript. Deploy with Docker, extend with plugins.",
    images: [{ url: "/hexbot.svg", width: 512, height: 512, alt: "HexBot logo" }],
  },
  twitter: {
    card: "summary",
    title: "HexBot: Modular IRC Bot for Node.js",
    description: "Modular, hot-reloadable IRC bot written in TypeScript.",
    images: ["/hexbot.svg"],
  },
  icons: { icon: "/hexbot.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HexBot",
  description: "A modular, hot-reloadable IRC bot for Node.js, written in TypeScript.",
  applicationCategory: "CommunicationApplication",
  operatingSystem: "Cross-platform",
  url: SITE_URL,
  downloadUrl: "https://github.com/jstnmthw/hexbot",
  license: "https://www.gnu.org/licenses/gpl-2.0.html",
  programmingLanguage: "TypeScript",
  author: { "@type": "Person", name: "jstnmthw", url: "https://github.com/jstnmthw" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="min-h-screen bg-background">
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4">
            {/* ── Header: logo + inline nav ─────────────────────── */}
            <header className="w-full rounded-b-lg bg-nav border border-t-0 border-border border-b-border-darker shadow-[0_0_0_1px_#000000] overflow-hidden">
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

            {/* ── Main content ──────────────────────────────────── */}
            <main className="flex flex-1 flex-col items-center py-4">{children}</main>

            {/* ── Footer ───────────────────────────────────────── */}
            <footer className="w-2xl mx-auto border-t border-border py-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <Link href="/" aria-label="HexBot home">
                  <Image src="/hexbot.svg" alt="" width={16} height={16} />
                </Link>
                <div>Copyright &copy; HexBot 2026. All Rights Reserved.</div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
