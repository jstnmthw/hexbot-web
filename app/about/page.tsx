import type { Metadata } from "next";
import InlineCode from "../components/inline-code";
import GradientText from "../components/gradient-text";

export const metadata: Metadata = {
  title: "What is HexBot?",
  description: "Learn about HexBot's history, architecture, plugin system, and flag-based permissions. A modular IRC bot for Node.js written in TypeScript.",
  alternates: { canonical: "/about" },
};

const FEATURES = [
  { label: "Modular plugins", detail: "Load, unload, and hot-reload without restarting" },
  { label: "Flag-based permissions", detail: "Owner, master, op, voice, deop — per-channel and global" },
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
  { flag: "d", level: "Deop", desc: "Suppress auto-op/halfop on join; auto-voice if also +v" },
  { flag: "-", level: "Anyone", desc: "No restriction" },
];

const STACK = ["Node.js 24+", "TypeScript 5", "irc-framework", "better-sqlite3", "Vitest", "GPL-2.0"];

export default function About() {
  return (
    <div className="w-full max-w-170 space-y-8 py-2">
      {/* ── Narrative ─────────────────────────────────────── */}
      <section className="space-y-4">
        <h1 className="text-foreground text-lg">About HexBot</h1>
        <div className="space-y-4">
          <p className="leading-relaxed text-muted-foreground">Internet Relay Chat was one of the earliest widely adopted real-time systems on the internet. Networks like EFnet, Undernet, DALnet, and QuakeNet connected large numbers of users through a distributed set of servers, all speaking a simple, open protocol. There was no central authority and very little built-in persistence—channels, users, and permissions existed as long as the network could maintain a consistent view of them.</p>
          <p className="leading-relaxed text-muted-foreground">That model worked, but it came with trade-offs. Networks were prone to instability, and channels required constant oversight. Operators couldn’t realistically provide that 24/7, which is where bots came in. A bot could remain connected indefinitely, maintain operator status, enforce basic rules, and respond immediately to events. Over time, bots expanded beyond moderation into general-purpose utilities—tracking users, serving information, automating repetitive tasks, and integrating external data.</p>
          <p className="leading-relaxed text-muted-foreground">Despite being built in different languages and environments, most IRC bots converged on similar design patterns. They reacted to events, exposed commands, and used some form of permission system to control behavior. Many supported dynamically extending functionality through scripts or modules. These approaches weren’t formalized, but they proved practical and have remained consistent across implementations.</p>
          <p className="leading-relaxed text-muted-foreground">
            <GradientText className="font-bold">HexBot</GradientText> follows the same general model. It’s a modular IRC bot for Node.js, written in <strong className="text-foreground">TypeScript</strong>, with a focus on predictable behavior and maintainability. It uses an event-driven core, supports runtime plugin loading, and provides a structured API for building extensions. The aim is to keep the flexibility that made IRC bots useful, while making them easier to develop, reason about, and operate with modern tooling.
          </p>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="border-b border-border pb-1 text-foreground">Key Features</h2>
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
        <h2 className="border-b border-border pb-1 text-foreground">Architecture</h2>
        <p className="leading-relaxed text-muted-foreground">
          HexBot uses a two-tier module system. <strong className="text-foreground">Core modules</strong> are always loaded and provide the bot’s foundational services — the IRC bridge, dispatcher, permission engine, channel state, and database. <strong className="text-foreground">Plugins</strong> are isolated, hot-reloadable units that register event binds against the dispatcher and never depend on each other.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Plugins call <InlineCode>bind(type, flags, mask, handler)</InlineCode> to subscribe to IRC events. The dispatcher matches incoming events against all registered binds, checks permissions, and calls handlers in registration order.
        </p>
      </section>

      {/* ── Permission Flags ──────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="border-b border-border pb-1 text-foreground">Permission Flags</h2>
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
        <h2 className="border-b border-border pb-1 text-foreground">Tech Stack</h2>
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
