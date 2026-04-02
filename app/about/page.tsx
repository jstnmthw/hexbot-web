import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HexBot: What is HexBot?",
};

const FEATURES = [
  { label: "Modular plugins", detail: "Load, unload, and hot-reload without restarting" },
  { label: "Flag-based permissions", detail: "Owner, master, op, voice — per-channel and global" },
  { label: "Bind system", detail: "16 event types, pattern-matched triggers" },
  { label: "SASL authentication", detail: "PLAIN and EXTERNAL (CertFP) support" },
  { label: "IRCv3 caps", detail: "extended-join, account-notify, chghost" },
  { label: "SOCKS5 proxy", detail: "Route through Tor or SSH tunnels" },
  { label: "DCC CHAT party line", detail: "Remote admin sessions without IRC access" },
  { label: "NickServ integration", detail: "Atheme and Anope, optional ACC verification" },
  { label: "IRC CASEMAPPING", detail: "rfc1459, strict-rfc1459, ascii" },
  { label: "SQLite persistence", detail: "Namespaced per-plugin key/value store" },
];

const PERMISSIONS = [
  { flag: "n", level: "Owner", desc: "Full access, implies all others" },
  { flag: "m", level: "Master", desc: "User management" },
  { flag: "o", level: "Op", desc: "Channel commands, bot admin" },
  { flag: "v", level: "Voice", desc: "Reserved for plugin use" },
  { flag: "-", level: "Anyone", desc: "No restriction" },
];

const STACK = ["Node.js 24+", "TypeScript 5", "irc-framework", "better-sqlite3", "Vitest", "GPL-2.0"];

export default function About() {
  return (
    <div className="w-full max-w-170 space-y-8 py-2">
      {/* ── Narrative ─────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-foreground">About HexBot</h2>
        <div className="space-y-4 border-l border-border pl-4">
          <p className="leading-relaxed text-muted-foreground">
            At its peak in the early 2000s, <strong className="text-foreground">Internet Relay Chat</strong> had millions of daily users spread across networks like EFnet, Undernet, DALnet, and Quakenet — a federated mesh of servers that nobody owned, running a protocol that anyone could implement. Hackers, open-source developers, gamers, and underground communities all operated in real time, in plain text, across thousands of channels. It was the internet's town square, engine room, and back alley all at once.
          </p>
          <p className="leading-relaxed text-muted-foreground">Bots were an inevitability. Channels needed protection — flood attacks and takeover attempts were a daily reality on the early net, and human operators couldn't stay awake forever. So people automated them. A bot could hold ops, enforce channel modes, kick spammers, and reconnect after a netsplit without anyone lifting a finger. From there the use cases multiplied: DCC file servers seeding warez and MP3s to anyone who asked, trivia bots keeping quiet channels alive, seen bots tracking who was last online, dice rollers, quote databases, weather fetchers pulling data from early web APIs. Each bot was a tiny daemon with a specific job, running 24/7 on whatever hardware its author could afford to leave powered on.</p>
          <p className="leading-relaxed text-muted-foreground">
            The architecture that emerged from that era was surprisingly elegant. An event table. A permission system built on flags. A way to attach handlers to patterns at runtime and detach them without restarting. These ideas proved so sound that every serious IRC bot written since has reinvented some version of them. <strong className="text-foreground">HexBot</strong> is our version — a modular IRC bot for <strong className="text-foreground">Node.js</strong>, written in TypeScript, that takes those same principles and applies them with the tools available today. Hot-reloadable plugins. Type-safe APIs. Docker-ready deployment. The spirit of those 3am channel guardians, running on infrastructure that Oikarinen could never have imagined.
          </p>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="space-y-3">
        <h3 className="border-b border-border pb-1 text-foreground">Key Features</h3>
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map((f) => (
            <div key={f.label} className="rounded border border-border bg-card p-3">
              <div className="text-sm font-semibold text-foreground">{f.label}</div>
              <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{f.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture ──────────────────────────────────── */}
      <section className="space-y-3">
        <h3 className="border-b border-border pb-1 text-foreground">Architecture</h3>
        <p className="leading-relaxed text-muted-foreground">
          HexBot uses a two-tier module system. <strong className="text-foreground">Core modules</strong> are always loaded and provide the bot's foundational services — the IRC bridge, dispatcher, permission engine, channel state, and database. <strong className="text-foreground">Plugins</strong> are isolated, hot-reloadable units that register event binds against the dispatcher and never depend on each other.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Plugins call <code className="rounded bg-muted px-1 font-mono text-foreground">bind(type, flags, mask, handler)</code> to subscribe to IRC events. The dispatcher matches incoming events against all registered binds, checks permissions, and calls handlers in registration order.
        </p>
      </section>

      {/* ── Permission Flags ──────────────────────────────── */}
      <section className="space-y-3">
        <h3 className="border-b border-border pb-1 text-foreground">Permission Flags</h3>
        <div className="space-y-1">
          {PERMISSIONS.map((p) => (
            <div key={p.flag} className="flex items-center gap-3 rounded border border-border/40 bg-card/50 px-3 py-1.5">
              <span className="w-6 text-center font-mono text-sm font-bold text-accent-red">{p.flag}</span>
              <span className="w-16 text-sm font-semibold text-foreground">{p.level}</span>
              <span className="text-xs text-muted-foreground">{p.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────── */}
      <section className="space-y-3">
        <h3 className="border-b border-border pb-1 text-foreground">Tech Stack</h3>
        <div className="flex flex-wrap gap-1.5">
          {STACK.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
