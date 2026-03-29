import Link from "next/link";

function Entry({ version, date, children }: { version: string; date: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-baseline gap-3 border-b border-border pb-1">
        <h3 className="text-foreground">{version}</h3>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      {children}
    </div>
  );
}

export default function News() {
  return (
    <div className="w-full max-w-170 space-y-6 py-2">
      <Entry version="v0.1.0 — Initial Release" date="2026">
        <h2 className="text-foreground">News</h2>
        <p className="mb-3 leading-relaxed text-muted-foreground">HexBot v0.1.0 is the first public release. The core bot framework is production-ready with a full plugin API, permission system, and Docker deployment.</p>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Included</p>
        <ul className="mb-3 space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">8 bundled plugins</strong> — chanmod, flood, greeter, seen, topic, help, ctcp, 8ball
          </li>
          <li>
            <strong className="text-foreground">Eggdrop-style bind system</strong> — 16 event types, pattern-matched handlers
          </li>
          <li>
            <strong className="text-foreground">Flag-based permissions</strong> — owner, master, op, voice; per-channel and global
          </li>
          <li>
            <strong className="text-foreground">Hot-reload</strong> — edit and reload plugins without restarting
          </li>
          <li>
            <strong className="text-foreground">SASL authentication</strong> — PLAIN and EXTERNAL (CertFP)
          </li>
          <li>
            <strong className="text-foreground">IRCv3 caps</strong> — extended-join, account-notify, chghost
          </li>
          <li>
            <strong className="text-foreground">SOCKS5 proxy</strong> — Tor and SSH tunnel support
          </li>
          <li>
            <strong className="text-foreground">DCC CHAT party line</strong> — remote admin sessions
          </li>
          <li>
            <strong className="text-foreground">SQLite persistence</strong> — namespaced per-plugin key/value store
          </li>
          <li>
            <strong className="text-foreground">Docker deployment</strong> — compose file with host-mounted config and plugins
          </li>
        </ul>
        <p className="text-muted-foreground">
          See the{" "}
          <Link href="/deploy" className="text-foreground hover:underline">
            deploy guide
          </Link>{" "}
          to get started, or browse the{" "}
          <Link href="/plugins" className="text-foreground hover:underline">
            plugin list
          </Link>{" "}
          to see what&apos;s included.
        </p>
      </Entry>

      <Entry version="Upcoming" date="Roadmap">
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">AI chat module</strong> — Google Gemini integration with cost controls and prompt filtering
          </li>
          <li>
            <strong className="text-foreground">Bot linking</strong> — coordinate multiple HexBot instances across servers
          </li>
          <li>
            <strong className="text-foreground">XDCC</strong> — file serving over DCC
          </li>
          <li>
            <strong className="text-foreground">IdleRPG</strong> — idle-based RPG plugin
          </li>
        </ul>
      </Entry>
    </div>
  );
}
