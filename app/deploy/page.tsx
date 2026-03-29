import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HexBot: Get Up and Running",
};

function CodeBlock({ children }: { children: React.ReactNode }) {
  return <pre className="overflow-x-auto rounded border border-border bg-muted p-3 font-mono leading-relaxed text-foreground">{children}</pre>;
}

const REPL_COMMANDS = [
  { cmd: ".help [cmd]", desc: "List commands or show detail for one" },
  { cmd: ".status", desc: "Connection info, uptime, bind and user counts" },
  { cmd: ".say <target> <msg>", desc: "Send a message to a channel or user" },
  { cmd: ".msg <target> <msg>", desc: "Send a PRIVMSG to any target" },
  { cmd: ".join / .part", desc: "Join or part a channel" },
  { cmd: ".flags [handle] [+flags [#chan]]", desc: "View or set user flags" },
  { cmd: ".adduser / .deluser / .users", desc: "User management" },
  { cmd: ".chanset / .chaninfo", desc: "Per-channel plugin settings" },
  { cmd: ".binds [plugin]", desc: "List active event binds" },
  { cmd: ".plugins / .load / .unload / .reload", desc: "Plugin management" },
];

export default function Deploy() {
  return (
    <div className="w-full max-w-170 space-y-10 py-2">
      <h2 className="text-foreground">Deploy HexBot</h2>
      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Requirements</h3>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">Node.js 24+</strong> (manual install)
          </li>
          <li>
            <strong className="text-foreground">pnpm</strong> (manual install)
          </li>
          <li>
            <strong className="text-foreground">Docker + Compose</strong> (Docker install)
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Quick Start — Docker</h3>
        <p className="leading-relaxed text-muted-foreground">The recommended deployment method. Plugins, config, and data are mounted from the host so you can edit and reload without rebuilding the image.</p>
        <CodeBlock>{`git clone https://github.com/jstnmthw/hexbot
cd hexbot
cp config/bot.example.json config/bot.json
cp config/plugins.example.json config/plugins.json
# edit config/bot.json with your IRC server and credentials
docker compose up -d
docker compose logs -f`}</CodeBlock>
        <p className="text-muted-foreground">
          DCC CHAT ports <strong className="text-neutral-400">49152-49171</strong> are exposed by default.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Manual Install</h3>
        <CodeBlock>{`git clone https://github.com/jstnmthw/hexbot
cd hexbot
pnpm install
cp config/bot.example.json config/bot.json
cp config/plugins.example.json config/plugins.json
# edit config files
pnpm start          # production, no REPL
pnpm dev            # development, with interactive REPL`}</CodeBlock>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Configuration</h3>
        <p className="leading-relaxed text-muted-foreground">Two JSON files control the bot. Both are ignored by git — only the example files are committed.</p>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">config/bot.json</p>
          <p className="text-muted-foreground">IRC server, credentials, owner hostmask, services (NickServ/SASL), queue rate, DCC settings, SOCKS5 proxy, and logging level.</p>
          <CodeBlock>{`{
  "irc": {
    "host": "irc.rizon.net",
    "port": 6697,
    "tls": true,
    "nick": "HexBot",
    "channels": ["#hexbot"]
  },
  "owner": { "handle": "admin", "hostmask": "*!ident@your.host" },
  "services": { "type": "anope", "sasl": true, "sasl_mechanism": "PLAIN" },
  "dcc": { "enabled": false, "port_range": [49152, 49171] },
  "proxy": { "enabled": false, "host": "127.0.0.1", "port": 9050 }
}`}</CodeBlock>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">config/plugins.json</p>
          <p className="text-muted-foreground">Enable/disable plugins, set per-plugin channel scope, and override plugin config defaults.</p>
          <CodeBlock>{`{
  "chanmod": {
    "enabled": true,
    "channels": ["#hexbot"],
    "config": { "auto_op": true, "enforce_modes": false }
  },
  "flood": { "enabled": false, "channels": ["#hexbot"] },
  "greeter": {
    "enabled": true,
    "channels": ["#hexbot"],
    "config": { "message": "Welcome to {channel}, {nick}!" }
  },
  "seen":  { "enabled": true },
  "8ball": { "enabled": true },
  "topic": { "enabled": true },
  "ctcp":  { "enabled": true },
  "help":  { "enabled": true }
}`}</CodeBlock>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">REPL Commands</h3>
        <p className="text-muted-foreground">
          Run with <code className="rounded bg-muted px-1 font-mono text-foreground">pnpm dev</code> to get an interactive REPL with owner-level access — no IRC auth required.
        </p>
        <table className="w-full">
          <tbody>
            {REPL_COMMANDS.map(({ cmd, desc }) => (
              <tr key={cmd} className="border-b border-border/40">
                <td className="py-1 pr-4 font-mono text-foreground whitespace-nowrap">{cmd}</td>
                <td className="py-1 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-2">
        <h3 className="border-b border-border pb-1 text-foreground">Hot-Reloading Plugins</h3>
        <p className="text-muted-foreground">Edit a plugin file, then reload it without restarting the bot:</p>
        <CodeBlock>{`# In IRC (requires +o or higher):
!reload chanmod

# In the REPL:
.reload chanmod`}</CodeBlock>
      </section>
    </div>
  );
}
