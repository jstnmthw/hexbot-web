import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./config";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HexBot: Modular IRC Bot for Node.js",
    template: "HexBot: %s",
  },
  description: "HexBot is a modular, hot-reloadable IRC bot for Node.js, written in TypeScript. Deploy with Docker, extend with plugins, and run on any IRC network.",
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
    description: "A modular, hot-reloadable IRC bot for Node.js, written in TypeScript. Deploy with Docker, extend with plugins.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="min-h-screen bg-background">
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4">
            <Header />
            <main className="flex flex-1 flex-col items-center py-4">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
