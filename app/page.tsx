import Link from "next/link";
import GradientText from "./components/gradient-text";

export default function Home() {
  return (
    <div>
      {/* Intro */}
      <div className="mx-auto max-w-6xl py-4 text-center leading-relaxed text-muted-foreground">
        <GradientText className="font-bold">HexBot</GradientText> is a modular <strong className="text-foreground">Internet Relay Chat</strong> bot for Node.js, written in <strong className="text-foreground">TypeScript</strong>. <br />
        Designed for reliability and extensibility, HexBot runs on any IRC network and can be deployed in seconds using <strong className="text-foreground">Docker</strong>.
      </div>

      <br />

      {/* Logo + Action buttons */}
      <div className="flex items-center justify-center gap-12 py-4">
        {/* Logo */}
        <div className="text-center">
          <img src="/hexbot.svg" alt="HexBot Logo" width="128" height="128" />
          <div className="mt-1 text-xs text-muted-foreground">v0.2.3</div>
        </div>

        {/* Buttons */}
        <div className="flex min-w-40 flex-col gap-3">
          <Link href="/about" className="block rounded border border-border bg-card px-8 py-3 text-center text-foreground transition-colors hover:border-ring">
            About HexBot
          </Link>
          <a href="https://github.com/jstnmthw/hexbot/archive/refs/tags/v0.2.3.tar.gz" target="_blank" rel="noopener noreferrer" className="block rounded border border-border bg-card px-8 py-3 text-center text-foreground transition-colors hover:border-accent-red/30">
            Download HexBot
            <span className="block text-xs text-muted-foreground">v0.2.3</span>
          </a>
          <Link href="/deploy" className="block rounded border border-border bg-card px-8 py-3 text-center text-foreground transition-colors hover:border-ring">
            Deploy with Docker
          </Link>
        </div>
      </div>

      <br />

      {/* Features */}
      <div className="mx-auto max-w-3xl py-4">
        <h2 className="mb-3 border-b border-border pb-1 text-sm font-semibold text-foreground">Features</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div>
            <strong className="text-foreground">Modular plugins</strong>
            <span className="text-muted-foreground"> — hot-reload without restarting</span>
          </div>
          <div>
            <strong className="text-foreground">Flag permissions</strong>
            <span className="text-muted-foreground"> — owner, master, op, voice</span>
          </div>
          <div>
            <strong className="text-foreground">Bind system</strong>
            <span className="text-muted-foreground"> — 16 event types, pattern-matched</span>
          </div>
          <div>
            <strong className="text-foreground">SASL + IRCv3</strong>
            <span className="text-muted-foreground"> — PLAIN, EXTERNAL/CertFP</span>
          </div>
          <div>
            <strong className="text-foreground">Bot linking</strong>
            <span className="text-muted-foreground"> — hub-and-leaf multi-bot networking</span>
          </div>
          <div>
            <strong className="text-foreground">SOCKS5 proxy</strong>
            <span className="text-muted-foreground"> — Tor / SSH tunnels</span>
          </div>
          <div>
            <strong className="text-foreground">DCC party line</strong>
            <span className="text-muted-foreground"> — remote admin sessions</span>
          </div>
          <div>
            <strong className="text-foreground">SQLite storage</strong>
            <span className="text-muted-foreground"> — namespaced per-plugin</span>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mx-auto max-w-3xl py-4">
        <h2 className="mb-3 border-b border-border pb-1 text-sm font-semibold text-foreground">Getting Started</h2>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          HexBot v0.2.3 has been{" "}
          <a href="https://github.com/jstnmthw/hexbot/releases" className="decoration-accent-red hover:underline" target="_blank" rel="noopener noreferrer">
            <GradientText>released</GradientText>
          </a>
          .
        </p>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          New to HexBot? See the{" "}
          <a href="https://github.com/jstnmthw/hexbot/blob/main/README.md" className="text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
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
          <a href="https://rizon.net/chat" className="text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
            #hexbot
          </a>{" "}
          on{" "}
          <a href="https://rizon.net/" className="text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
            irc.rizon.net
          </a>
          .
        </p>
      </div>
    </div>
  );
}
