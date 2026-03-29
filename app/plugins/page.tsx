function Cmd({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 font-mono text-xs text-foreground">
      {children}
    </code>
  );
}

const PLUGINS = [
  {
    name: "chanmod",
    tagline: "Channel moderation and protection",
    description:
      "Full channel management suite. Auto-grants op/halfop/voice on join, enforces channel modes, manages timed bans, protects ops from being deopped, and optionally takes revenge on kicks.",
    commands: [
      "!op",
      "!deop",
      "!halfop",
      "!dehalfop",
      "!voice",
      "!devoice",
      "!kick",
      "!ban",
      "!unban",
      "!kickban",
      "!bans",
    ],
    notes:
      "37 configurable options including auto_op, enforce_modes, rejoin_on_kick, and ChanServ awareness.",
  },
  {
    name: "flood",
    tagline: "Inbound flood protection",
    description:
      "Tracks message, join, and nick-change rates per user using sliding windows. Escalates enforcement from warn to kick to timed ban. Ops can be exempted.",
    commands: [],
    notes:
      "Automatic — no commands. Configurable thresholds, windows, ban duration, and action sequence.",
  },
  {
    name: "greeter",
    tagline: "Join greetings with custom messages",
    description:
      "Sends a greeting when users join the channel. Registered users can set their own custom greet message. Supports {channel} and {nick} substitution.",
    commands: ["!greet set <message>", "!greet delete"],
    notes:
      "Configurable delivery mode (PRIVMSG or NOTICE), min_flag to set custom greet.",
  },
  {
    name: "seen",
    tagline: "Last-seen tracking",
    description:
      "Records the last time a nick was active in a channel — message content, channel, and timestamp. Reports relative times (e.g. '5m ago', '3h 20m ago').",
    commands: ["!seen <nick>"],
    notes:
      "Persistent via SQLite. Configurable max age (default 365 days). Auto-cleans stale entries hourly.",
  },
  {
    name: "topic",
    tagline: "Color-coded themed topics",
    description:
      "Sets channel topics with IRC color-code themed borders. Includes topic protection — restores the topic if changed by a non-op. 10+ built-in themes.",
    commands: [
      "!topic <theme> <text>",
      "!topic preview <theme> <text>",
      "!topic lock",
      "!topic unlock",
      "!topics",
      "!topics preview",
    ],
    notes:
      "Warns if topic exceeds 390-char server limit. Per-user preview cooldown (60s).",
  },
  {
    name: "help",
    tagline: "Command help index",
    description:
      "Provides !help listing all available bot commands, filtered by the requesting user's permission level. Supports per-command detail and category views.",
    commands: ["!help", "!help <command>", "!help <category>"],
    notes:
      "Configurable reply type (PRIVMSG, NOTICE, channel_notice). Per-user cooldown on full list.",
  },
  {
    name: "ctcp",
    tagline: "CTCP response handler",
    description:
      "Automatically replies to CTCP VERSION, PING, and TIME requests. Reads the version string from package.json.",
    commands: [],
    notes: "Automatic — no user commands.",
  },
  {
    name: "8ball",
    tagline: "Magic 8-ball",
    description:
      "Responds to questions with one of 20 affirmative, 5 non-committal, or 5 negative responses. The classic IRC staple.",
    commands: ["!8ball <question>"],
    notes: "No configuration required.",
  },
];

export default function Plugins() {
  return (
    <div className="w-full max-w-170 space-y-6 py-2">
      <section className="space-y-2">
        <h2 className="text-foreground">Plugins</h2>
        <p className="leading-relaxed text-muted-foreground">
          HexBot ships with {PLUGINS.length} bundled plugins. Plugins are
          hot-reloadable — edit the file and run{" "}
          <code className="rounded bg-muted px-1 font-mono text-foreground">
            .reload &lt;name&gt;
          </code>{" "}
          in IRC or the REPL without restarting the bot.
        </p>
      </section>
      <section>
        <div className="space-y-3">
          {PLUGINS.map((plugin) => (
            <div
              key={plugin.name}
              className="border border-border rounded bg-card p-4"
            >
              <div className="mb-1 flex items-baseline gap-3">
                <h3 className="text-foreground">{plugin.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {plugin.tagline}
                </span>
              </div>
              <p className="mb-2 leading-relaxed text-muted-foreground">
                {plugin.description}
              </p>
              {plugin.commands.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {plugin.commands.map((cmd) => (
                    <Cmd key={cmd}>{cmd}</Cmd>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">{plugin.notes}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
