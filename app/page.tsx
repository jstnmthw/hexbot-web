import Link from "next/link";

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="block rounded border border-border bg-card px-8 py-3 text-center text-foreground transition-colors hover:border-ring hover:bg-accent">
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <div>
      {/* Intro */}
      <div className="mx-auto max-w-6xl py-4 text-center leading-relaxed text-foreground">
        HexBot is a modular <strong>Internet Relay Chat</strong> bot for <strong>Node.js</strong>, written in TypeScript. <br />
        Designed for reliability and extensibility, HexBot runs on any IRC network and can be deployed in seconds using Docker.
      </div>

      <br />

      {/* Logo + Action buttons */}
      <div className="flex items-center justify-center gap-12 py-4">
        {/* Logo */}
        <div className="text-center">
          <img src="/logo_x64.png" alt="HexBot Logo" width="64" height="64" />
          <div className="mt-1 text-xs text-muted-foreground">v0.1.0</div>
        </div>

        {/* Buttons */}
        <div className="flex min-w-40 flex-col gap-3">
          <ActionButton>About HexBot</ActionButton>
          <ActionButton>Download HexBot</ActionButton>
          <ActionButton>Deploy with Docker</ActionButton>
        </div>
      </div>

      <br />

      {/* News */}
      <div className="mx-auto max-w-3xl py-4">
        <h2 className="mb-3 border-b border-border pb-1 text-sm font-semibold text-foreground">Latest News</h2>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          HexBot v0.1.0 has been{" "}
          <Link href="/news" className="text-foreground hover:underline">
            released
          </Link>
          .
        </p>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          New to HexBot? See the{" "}
          <a href="https://github.com/jstnmthw/hexbot/blob/main/README.md" className="text-foreground hover:underline" target="_blank">
            documentation
          </a>{" "}
          to get started, or browse the{" "}
          <Link href="/plugins" className="text-foreground hover:underline">
            plugin library
          </Link>{" "}
          to extend your bot.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          To discuss HexBot with other users or get help, join{" "}
          <a href="https://rizon.net/chat" className="text-foreground hover:underline">
            #hexbot
          </a>{" "}
          on{" "}
          <a href="https://rizon.net/" className="text-foreground hover:underline">
            irc.rizon.net
          </a>
          .
        </p>
      </div>
    </div>
  );
}
