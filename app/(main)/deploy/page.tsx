import type { Metadata } from "next";
import Terminal from "../../components/terminal";
import NumberBadge from "../../components/number-badge";
import InlineCode from "../../components/inline-code";

export const metadata: Metadata = {
  title: "Get Up and Running",
  description: "Deploy HexBot with Docker or a manual install. Includes configuration examples, REPL commands, hot-reload guide, and DCC port setup.",
  alternates: { canonical: "/deploy" },
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-3">
        <NumberBadge n={n} />
        <h2 className="border-b border-border pb-1 flex-1 text-foreground">{title}</h2>
      </div>
      <div className="pl-8">{children}</div>
    </section>
  );
}

const REPL_COMMANDS = [
  { cmd: ".help [cmd]", desc: "List commands or show detail for one" },
  { cmd: ".status", desc: "Connection info, uptime, bind and user counts" },
  { cmd: ".uptime", desc: "One-line uptime report" },
  { cmd: ".say <target> <msg>", desc: "Send a message to a channel or user" },
  { cmd: ".msg <target> <msg>", desc: "Send a PRIVMSG to any target" },
  { cmd: ".join / .part", desc: "Join or part a channel" },
  { cmd: ".flags [handle] [+flags [#chan]]", desc: "View or set user flags" },
  { cmd: ".adduser / .deluser / .users", desc: "User management" },
  { cmd: ".chpass <handle> <newpass>", desc: "Set or rotate a user's DCC password (REPL/DCC only)" },
  { cmd: ".chanset / .chaninfo", desc: "Per-channel plugin settings" },
  { cmd: ".binds [plugin]", desc: "List active event binds" },
  { cmd: ".plugins / .load / .unload / .reload", desc: "Plugin management" },
  { cmd: ".modlog [filter...]", desc: "Query the moderation audit log (DCC/REPL only)" },
  { cmd: ".audit-tail [filter...]", desc: "Stream audit:log events live (REPL only)" },
];

export default function Deploy() {
  return (
    <div className="w-full max-w-170 space-y-8 py-2">
      <div>
        <h1 className="text-foreground text-lg">Deploy HexBot</h1>
      </div>

      <Step n={1} title="Requirements">
        <div className="flex flex-wrap gap-1.5">
          <span className="pill">Node.js 24+</span>
          <span className="pill">pnpm</span>
          <span className="pill">Docker + Compose</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Node.js and pnpm for manual install. Docker + Compose for containerized deployment.</p>
      </Step>

      <Step n={2} title="Quick Start — Docker">
        <p className="mb-2 leading-relaxed text-muted-foreground">The recommended deployment method. Plugins, config, and data are mounted from the host so you can edit and reload without rebuilding the image.</p>
        <Terminal title="bash">{`git clone https://github.com/jstnmthw/hexbot
cd hexbot
cp config/bot.example.json config/bot.json
cp config/plugins.example.json config/plugins.json
# edit config/bot.json with your IRC server and credentials
docker compose up -d
docker compose logs -f`}</Terminal>
        <p className="mt-2 text-xs text-muted-foreground">
          DCC CHAT ports <strong className="text-neutral-400">49152-49171</strong> are exposed by default.
        </p>
      </Step>

      <Step n={3} title="Manual Install">
        <Terminal title="bash">{`git clone https://github.com/jstnmthw/hexbot
cd hexbot
pnpm install
cp config/bot.example.json config/bot.json
cp config/plugins.example.json config/plugins.json
# edit config files
pnpm start          # production, no REPL
pnpm dev            # development, with interactive REPL`}</Terminal>
      </Step>

      <Step n={4} title="Configuration">
        <p className="mb-3 leading-relaxed text-muted-foreground">Two JSON files control the bot. Both are ignored by git — only the example files are committed.</p>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-foreground">config/bot.json</p>
            <p className="mb-2 text-muted-foreground">IRC server, credentials, owner hostmask, services (NickServ/SASL), queue rate, DCC settings, SOCKS5 proxy, and logging level.</p>
            <Terminal title="config/bot.json">{`{
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
}`}</Terminal>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold text-foreground">config/plugins.json</p>
            <p className="mb-2 text-muted-foreground">
              Plugins are auto-discovered from <InlineCode>plugins/</InlineCode> — this file is only needed to override config, restrict channels, or disable specific plugins.
            </p>
            <Terminal title="config/plugins.json">{`{
  "chanmod": {
    "channels": ["#hexbot"],
    "config": { "auto_op": true, "enforce_modes": false }
  },
  "greeter": {
    "channels": ["#hexbot"],
    "config": { "message": "Welcome to {channel}, {nick}!" }
  },
  "flood": { "enabled": false }
}`}</Terminal>
          </div>
        </div>
      </Step>

      <Step n={5} title="REPL Commands">
        <p className="mb-2 text-muted-foreground">
          Run with <InlineCode>pnpm dev</InlineCode> to get an interactive REPL with owner-level access — no IRC auth required.
        </p>
        <div className="terminal">
          <div className="terminal-bar">repl</div>
          <div className="terminal-body">
            <table className="w-full">
              <tbody>
                {REPL_COMMANDS.map(({ cmd, desc }) => (
                  <tr key={cmd} className="border-b border-border/20 last:border-0">
                    <td className="py-1 pr-4 text-foreground whitespace-nowrap">{cmd}</td>
                    <td className="py-1 text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Step>

      <Step n={6} title="Hot-Reloading Plugins">
        <p className="mb-2 text-muted-foreground">Edit a plugin file, then reload it without restarting the bot:</p>
        <Terminal title="reload">{`# In IRC (requires +o or higher):
!reload chanmod

# In the REPL:
.reload chanmod`}</Terminal>
      </Step>
    </div>
  );
}
