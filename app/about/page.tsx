export default function About() {
  return (
    <div className="w-full max-w-170 space-y-6 py-2">
      <section className="space-y-2">
        <h2 className="text-foreground">About HexBot</h2>
        <p className="leading-relaxed text-muted-foreground">
          HexBot is a modular <strong className="text-foreground">Internet Relay Chat</strong> bot for <strong className="text-foreground">Node.js</strong>, written in TypeScript. Inspired by Eggdrop&apos;s decades-proven design patterns, HexBot brings that architecture to a modern stack — hot-reloadable plugins, type-safe APIs, and Docker-ready deployment.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Key Features</h3>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">Modular plugins</strong> — load, unload, and hot-reload without restarting
          </li>
          <li>
            <strong className="text-foreground">Flag-based permissions</strong> — owner, master, op, voice, per-channel and global
          </li>
          <li>
            <strong className="text-foreground">Eggdrop-style bind system</strong> — 16 event types, pattern-matched triggers
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
        <table className="w-full text-sm">
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
        <ul className="space-y-1 text-muted-foreground">
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
