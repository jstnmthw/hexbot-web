import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HexBot: What is HexBot?",
};

export default function About() {
  return (
    <div className="w-full max-w-170 space-y-6 py-2">
      <section className="space-y-4">
        <h2 className="text-foreground">About HexBot</h2>
        <p className="leading-relaxed text-muted-foreground">
          At its peak in the early 2000s, <strong className="text-foreground">Internet Relay Chat</strong> had millions of daily users spread across networks like EFnet, Undernet, DALnet, and Quakenet — a federated mesh of servers that nobody owned, running a protocol that anyone could implement. Hackers, open-source developers, gamers, and underground communities all operated in real time, in plain text, across thousands of channels. It was the internet's town square, engine room, and back alley all at once.
        </p>
        <p className="leading-relaxed text-muted-foreground">Bots were an inevitability. Channels needed protection — flood attacks and takeover attempts were a daily reality on the early net, and human operators couldn't stay awake forever. So people automated them. A bot could hold ops, enforce channel modes, kick spammers, and reconnect after a netsplit without anyone lifting a finger. From there the use cases multiplied: DCC file servers seeding warez and MP3s to anyone who asked, trivia bots keeping quiet channels alive, seen bots tracking who was last online, dice rollers, quote databases, weather fetchers pulling data from early web APIs. Each bot was a tiny daemon with a specific job, running 24/7 on whatever hardware its author could afford to leave powered on.</p>
        <p className="leading-relaxed text-muted-foreground">
          The architecture that emerged from that era was surprisingly elegant. An event table. A permission system built on flags. A way to attach handlers to patterns at runtime and detach them without restarting. These ideas proved so sound that every serious IRC bot written since has reinvented some version of them. <strong className="text-foreground">HexBot</strong> is our version — a modular IRC bot for <strong className="text-foreground">Node.js</strong>, written in TypeScript, that takes those same principles and applies them with the tools available today. Hot-reloadable plugins. Type-safe APIs. Docker-ready deployment. The spirit of those 3am channel guardians, running on infrastructure that Oikarinen could never have imagined.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Key Features</h3>
        <ul className="space-y-1.5 text-muted-foreground text-sm">
          <li>
            <strong className="text-foreground">Modular plugins</strong> — load, unload, and hot-reload without restarting
          </li>
          <li>
            <strong className="text-foreground">Flag-based permissions</strong> — owner, master, op, voice, per-channel and global
          </li>
          <li>
            <strong className="text-foreground">Bind system</strong> — 16 event types, pattern-matched triggers
          </li>
          <li>
            <strong className="text-foreground">SASL authentication</strong> — PLAIN and EXTERNAL (CertFP) support
          </li>
          <li>
            <strong className="text-foreground">IRCv3 caps</strong> — extended-join, account-notify, chghost
          </li>
          <li>
            <strong className="text-foreground">SOCKS5 proxy</strong> — route through Tor or SSH tunnels
          </li>
          <li>
            <strong className="text-foreground">DCC CHAT party line</strong> — remote admin sessions without IRC access
          </li>
          <li>
            <strong className="text-foreground">NickServ integration</strong> — Atheme and Anope, optional ACC verification
          </li>
          <li>
            <strong className="text-foreground">IRC CASEMAPPING</strong> — rfc1459, strict-rfc1459, ascii
          </li>
          <li>
            <strong className="text-foreground">SQLite persistence</strong> — namespaced per-plugin key/value store
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Architecture</h3>
        <p className="leading-relaxed text-muted-foreground">
          HexBot uses a two-tier module system. <strong className="text-foreground">Core modules</strong> are always loaded and provide the bot&apos;s foundational services — the IRC bridge, dispatcher, permission engine, channel state, and database. <strong className="text-foreground">Plugins</strong> are isolated, hot-reloadable units that register event binds against the dispatcher and never depend on each other.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The bind system is the heart of the bot. Plugins call <code className="rounded bg-muted px-1 font-mono text-foreground">bind(type, flags, mask, handler)</code> to subscribe to IRC events. The dispatcher matches incoming events against all registered binds, checks permissions, and calls handlers in registration order.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Permission Flags</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-foreground">
              <th className="pb-1 pr-6 font-semibold">Flag</th>
              <th className="pb-1 font-semibold">Level</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/40">
              <td className="py-1 pr-6 font-mono text-foreground">n</td>
              <td className="py-1">Owner — full access, implies all others</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-1 pr-6 font-mono text-foreground">m</td>
              <td className="py-1">Master — user management</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-1 pr-6 font-mono text-foreground">o</td>
              <td className="py-1">Op — channel commands, bot admin</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-1 pr-6 font-mono text-foreground">v</td>
              <td className="py-1">Voice — reserved for plugin use</td>
            </tr>
            <tr>
              <td className="py-1 pr-6 font-mono text-foreground">-</td>
              <td className="py-1">Anyone — no restriction</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Tech Stack</h3>
        <ul className="space-y-1.5 text-muted-foreground text-sm">
          <li>
            <strong className="text-foreground">Node.js 24+</strong> — ESM modules, modern runtime
          </li>
          <li>
            <strong className="text-foreground">TypeScript 5</strong> — strict mode, full type coverage
          </li>
          <li>
            <strong className="text-foreground">irc-framework</strong> — IRC protocol transport and parsing
          </li>
          <li>
            <strong className="text-foreground">better-sqlite3</strong> — synchronous SQLite, namespaced per plugin
          </li>
          <li>
            <strong className="text-foreground">Vitest</strong> — unit tests with v8 coverage
          </li>
          <li>
            <strong className="text-foreground">GPL-2.0</strong> — open source license
          </li>
        </ul>
      </section>
    </div>
  );
}
