import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import GradientText from "../../components/gradient-text";
import InlineCode from "../../components/inline-code";

export const metadata: Metadata = {
  title: "Changelog & Latest Updates",
  description: "HexBot release notes and roadmap. A timeline of every release — ai-chat, BOTLINK hardening, audit logging, bot linking, plugin bundling, and the initial framework.",
  alternates: { canonical: "/news" },
};

type SectionKind = "added" | "changed" | "breaking" | "removed" | "fixed" | "included";

type ReleaseItem = { title: string; body: string };

type SectionDisplay = "bullets" | "tiles";

type ReleaseSection = { kind: SectionKind; display?: SectionDisplay; items: ReleaseItem[] };

type Release = {
  version: string;
  date: string;
  display: string;
  title: string;
  summary: string;
  sections: ReleaseSection[];
};

const SECTION_LABELS: Record<SectionKind, string> = {
  added: "Added",
  changed: "Changed",
  breaking: "Breaking",
  removed: "Removed",
  fixed: "Fixed",
  included: "Included",
};

const RELEASES: Release[] = [
  {
    version: "0.5.0",
    date: "2026-04-25",
    display: "April 25, 2026",
    title: "AI Channel Regular, Ollama & BOTLINK v2",
    summary:
      "v0.5.0 reshapes `ai-chat` into a true channel regular — character engine, ambient participation, mood, on-demand games — adds an Ollama provider for self-hosted setups, hardens the BOTLINK handshake against replay, and closes 10 findings from a post-incident stability audit.",
    sections: [
      {
        kind: "added",
        display: "tiles",
        items: [
          { title: "Character engine", body: "9 personality presets (friendly, sarcastic, chaotic, deadpan, gossip, nightowl, oldhead…), per-channel assignment, runtime swap with `!ai character <name>`" },
          { title: "Ambient participation", body: "bot speaks unprompted in quiet channels, answers unanswered questions, reacts to topic and join events; rate-limited per channel and globally" },
          { title: "Thread-based engagement", body: "replaces the old 60s timer with IRC-native floor-holding semantics; two users can be concurrently engaged in the same channel" },
          { title: "Ollama provider", body: "self-hosted, private-by-default alternative to Gemini; flip `provider` between `gemini` and `ollama` with a plugin reload" },
          { title: "On-demand game sessions", body: "drop a `.txt` into `games/` and play it via `!ai play <name>`; ships with 20 Questions and Trivia" },
          { title: "Founder-tier refusal gate", body: "ai-chat refuses to respond when the bot's ChanServ tier is founder, with a per-line gated sender for mid-request tier changes" },
          { title: "Bounded channel-join retry", body: "channels stuck on +b/+i/+k/+r failures retry on a configurable backoff schedule (default 5/15/45 min) instead of waiting for reconnect" },
          { title: "Nick collision detection + GHOST recovery", body: "automatic `NickServ GHOST` + reclaim when the configured nick is taken on connect" },
          { title: "IDENTIFY-before-JOIN gate", body: "bot waits for confirmed identification before joining channels, eliminating the IDENTIFY/ChanServ probe race" },
        ],
      },
      {
        kind: "changed",
        items: [
          { title: "BOTLINK v2 handshake", body: "HMAC challenge-response replaces the replay-able scrypt wire token; every botnet must share a `link_salt` in `bot.json`" },
          { title: "Hub-side BSAY re-check", body: "fanout re-runs the originating user's `+m` permission so a compromised leaf can't bypass it" },
          { title: "System-prompt assembly restructured", body: "explicit Persona / Right now / Rules sections with non-overridable safety clause; defense-in-depth dropper for fantasy-command prefixes" },
        ],
      },
      {
        kind: "breaking",
        items: [
          { title: "`!ai` freeform removed", body: "talk to the bot by nick (`<botnick>: hello`); `!ai` is now a subcommand console with `!ai help`" },
          { title: "ai-chat private messaging removed", body: "the plugin responds only in channels — PMs were a reconnaissance vector for prompt-injection probes" },
          { title: "`triggers.engagement_seconds` removed", body: "replaced by `engagement.soft_timeout_minutes` and `engagement.hard_ceiling_minutes`" },
        ],
      },
      {
        kind: "fixed",
        items: [
          { title: "2026-04-21 stability audit", body: "10 findings closed from the post-incident review of a 12+ hour outage where silent SASL failure left the bot unidentified and op-less" },
          { title: "SASL silent failure", body: "NickServ \"please identify\" notice now triggers a one-shot password fallback and surfaces `bot:identified` on confirmation" },
          { title: "Ambient tick-loop crash recovery", body: "wrapped in try/catch so a transient bug surfaces in the log instead of silently disabling ambient for the process lifetime" },
          { title: "Engagement map leak", body: "eviction TTL with an unconditional 1000-entry cap so stale entries can't pin below the cap indefinitely" },
        ],
      },
    ],
  },
  {
    version: "0.4.1",
    date: "2026-04-16",
    display: "April 16, 2026",
    title: "Shell Injection & ReDoS Fixes",
    summary: "Two security fixes surfaced by audit follow-up: a command injection in the plugin build script and a polynomial ReDoS in the RSS HTML stripper.",
    sections: [
      {
        kind: "fixed",
        items: [
          { title: "Shell command injection in plugin build script", body: "switched from `execSync` with string interpolation to `execFileSync` with an argument array so paths with spaces or shell metacharacters cannot alter the command" },
          { title: "Polynomial ReDoS in RSS HTML tag stripper", body: "replaced the `/<[^>]*>/g` regex (O(n²) on pathological input) with a single-pass O(n) character scanner that buffers after `<` and flushes unclosed tags" },
        ],
      },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-04-16",
    display: "April 16, 2026",
    title: "Plugin Bundling via tsup",
    summary: "Plugins are now compiled to self-contained bundles at build time. Polish around mode-grant safety, DCC error messages, and Docker image hygiene.",
    sections: [
      {
        kind: "changed",
        items: [
          { title: "Plugins bundled via tsup", body: "plugins with a `tsup.config.ts` compile into self-contained `dist/index.js` bundles instead of being loaded as raw TypeScript via `tsx`; the loader resolves `plugins/<name>/dist/index.js` for bundled plugins" },
          { title: "`.binds` output grouped by plugin", body: "section headers for easier scanning" },
          { title: "Topic plugin `protect_topic` renamed to `topic_lock`", body: "consistency with Eggdrop terminology" },
          { title: "DCC CHAT rejection notices collapsed", body: "single generic \"request denied\" message — no longer leaks the specific denial reason to the connecting user" },
        ],
      },
      {
        kind: "fixed",
        items: [
          { title: "Mode-grant commands targeting the bot itself", body: "previously the bot could attempt to op/deop/voice itself, causing confusing no-ops and mode bounces" },
          { title: "Docker build failure with plugin local node_modules", body: "added `plugins/*/node_modules` and `plugins/*/dist` to `.dockerignore`" },
          { title: "ESLint errors on plugin `dist/` bundles", body: "ignore pattern updated to `**/dist/` so plugin build output is excluded" },
        ],
      },
      {
        kind: "removed",
        items: [{ title: "`dcc.nickserv_verify` config field", body: "deprecated in 0.3.0; DCC now uses per-user passwords exclusively" }],
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-04-15",
    display: "April 15, 2026",
    title: "Audit Logging, AI Chat, RSS & Security Hardening",
    summary:
      "A foundation release: full mod_log audit pipeline, the `ai-chat` and `rss` plugins land, DCC gains password authentication, IRCv3 STS / account-tag / away-notify support, and four parallel audits (security, stability, memleak, quality) close ~50+ findings.",
    sections: [
      {
        kind: "added",
        items: [
          { title: "`mod_log` audit pipeline", body: "schema rewrite with `source`/`plugin`/`outcome`/`metadata`; `api.audit.log()` for plugins; `.modlog` operator UI with filter grammar and DCC-only paging; `.audit-tail` REPL stream; retention knob" },
          { title: "`ai-chat` plugin", body: "AI-powered chat via Gemini with provider adapter pattern, layered rate limiting, per-user token budgets, sliding-window context, multiple personality presets, on-demand game sessions, and ChanServ fantasy-command injection defense" },
          { title: "RSS plugin", body: "polls feeds and announces new items, SHA-1 dedup via KV store, first-run silent seeding, admin commands `!rss list/add/remove/check`, SSRF defense in depth (HTTPS-only, RFC1918 blocking, byte cap, DOCTYPE rejection)" },
          { title: "DCC console log sink", body: "per-session `.console` flags filter live log lines (`m`/`o`/`j`/`k`/`p`/`b`/`s`/`d`/`w`); `.who` is now the session-list command" },
          { title: "ISUPPORT parser", body: "typed `ServerCapabilities` snapshot covering `PREFIX`, `CHANMODES`, `MODES`, `CHANTYPES`, `TARGMAX`, `CASEMAPPING`; mode-batching and channel validation now follow what the connected IRCd advertises" },
          { title: "IRCv3 caps expanded", body: "`away-notify` (channel-aware), `account-tag` consumption, `$a:account` permission patterns, and Strict Transport Security (`sts=`) with auto-upgrade" },
          { title: "Configurable command prefix", body: "`command_prefix` field in `bot.json` (default `.`)" },
          { title: "Per-target message queue", body: "round-robin drain so a flooding target can't starve output to quieter channels" },
          { title: "BotLink per-IP brute-force protection", body: "escalating bans (5min → 24h cap), CIDR whitelist, per-IP pending-handshake limit, configurable handshake timeout" },
          { title: "ChanServ-assisted join error recovery", body: "asks ChanServ for help on 471/473/474/475/477 numerics with exponential backoff" },
        ],
      },
      {
        kind: "breaking",
        items: [
          { title: "DCC CHAT requires per-user passwords", body: "scrypt-hashed; existing users have no `password_hash` and are blocked from DCC until an admin runs `.chpass <handle> <newpass>`. Closes a Rizon-style vhost-persistence bypass." },
          { title: "Inline secrets removed from `bot.json`", body: "`services.password`, `botlink.password`, `chanmod.nick_recovery_password`, `proxy.password`, and `+k` keys must be referenced via `<field>_env` keys backed by `.env`" },
          { title: "`chanmod` `channel_modes` legacy format removed", body: "values must start with `+` or `-` (e.g. `\"+nt\"`); unprefixed strings are rejected at parse time" },
          { title: "`MessageQueue.enqueue(fn)` → `enqueue(target, fn)`", body: "core call sites updated; plugin code using `api.say`/`api.notice`/etc. is unaffected" },
        ],
      },
      {
        kind: "changed",
        items: [
          { title: "Reconnect loop rewritten", body: "HexBot owns the loop end-to-end; classifies disconnects into transient / rate-limited / fatal tiers with appropriate backoff. K/G-line and DNSBL blocks no longer cause exits — they expire on their own." },
          { title: "NickServ ACC/STATUS replies suppressed from DCC mirror", body: "internal verification chatter no longer narrates every `!voice` command twice in operator consoles" },
        ],
      },
      {
        kind: "fixed",
        items: [
          { title: "2026-04-14 security audit", body: "every Phase 1 critical, Phase 2 warning, and Phase 3 info finding closed across the full codebase" },
          { title: "2026-04-14 stability audit", body: "10 subsystems hardened against months-of-uptime failure modes — DB error classification, plugin lifecycle fail-loud, services dedup, BotLink jitter, message-queue deadline, DCC eviction, plugin teardown" },
          { title: "2026-04-14 memleak audit", body: "every scheduled finding closed across flood, chanmod, DCC, BotLink, RSS, services, memo, and connection-lifecycle; `createPluginApi` now returns a `dispose` that neutralises every method post-unload" },
          { title: "2026-04-14 quality audit", body: "god-file splits across `src/core/dcc/`, `src/core/botlink/`, RSS, flood, plus cross-cutting dedup of permission and pending-request helpers" },
          { title: "Stalled-reconnect zombie loop", body: "30s registration timeout fires on socket-connected so a TCP-but-no-IRC-greeting hang is classified transient and retried with backoff" },
        ],
      },
    ],
  },
  {
    version: "0.2.3",
    date: "2026-04-04",
    display: "April 4, 2026",
    title: "Startup Retry & Docker over WireGuard",
    summary: "Initial connection failures now back off and retry, ChanServ presence detection is automatic, and a Docker-over-WireGuard hang is fixed.",
    sections: [
      {
        kind: "added",
        items: [
          { title: "Startup retry with exponential backoff", body: "first-connection failures no longer exit the process" },
          { title: "ChanServ auto-detect", body: "`chanserv_op` merged into `chanserv_access`" },
        ],
      },
      {
        kind: "changed",
        items: [
          { title: "Refactored botlink, mode-enforce, and bot.ts", body: "readability cleanup with no behaviour change" },
          { title: "Detailed disconnect reason logging", body: "connection error handling enhanced" },
        ],
      },
      {
        kind: "fixed",
        items: [{ title: "IRC connection failure in Docker over WireGuard", body: "disabled Node's Happy Eyeballs algorithm" }],
      },
    ],
  },
  {
    version: "0.2.2",
    date: "2026-04-03",
    display: "April 3, 2026",
    title: "Single-Stage Dockerfile",
    summary: "Simpler Docker build using `tsx` at runtime; `pnpm start` is now the single entry point.",
    sections: [
      {
        kind: "changed",
        items: [
          { title: "Dockerfile simplified to single-stage build", body: "uses `tsx` at runtime instead of compiling to JS" },
          { title: "`tsx` moved from devDependencies to dependencies", body: "required for runtime execution" },
          { title: "`start:prod` script removed", body: "`pnpm start` is the single entry point" },
        ],
      },
    ],
  },
  {
    version: "0.2.1",
    date: "2026-04-03",
    display: "April 3, 2026",
    title: "Documentation Sync",
    summary: "Getting Started guide lands; README and core docs synced to current behaviour.",
    sections: [
      {
        kind: "added",
        items: [{ title: "Getting Started guide", body: "`docs/GETTING_STARTED.md`" }],
      },
      {
        kind: "changed",
        items: [
          { title: "README overhauled", body: "highlights section, full admin/bot-link/DCC command tables, documentation index" },
          { title: "Comprehensive doc sync", body: "DESIGN.md, PLUGIN_API.md, DCC.md, plugins/README.md updated to match the current codebase" },
          { title: "Healthcheck heartbeat uses `utimesSync`", body: "instead of writing unused file content" },
        ],
      },
      {
        kind: "fixed",
        items: [{ title: "Docker build failure on `husky` prepare", body: "ran during `--prod` install and failed because husky is a devDependency" }],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-04-02",
    display: "April 2, 2026",
    title: "Bot Linking & Channel Takeover Protection",
    summary: "Multi-bot networking inspired by Eggdrop botnet, persistent channel rejoin, ChanServ-backed takeover protection, and a round of security fixes.",
    sections: [
      {
        kind: "added",
        items: [
          { title: "Bot linking protocol", body: "hub-and-leaf networking with state sync, command relay, party line chat, session relay, protection frames, and ban sharing — JSON-framed protocol over TCP with SHA-256 auth and rate limiting; admin commands `.botlink status|disconnect|reconnect`, `.bots`, `.bottree`, `.relay`, `.whom`" },
          { title: "Persistent channel rejoin", body: "periodic check every 30s; handles kick+ban, channel full, invite-only, bad key" },
          { title: "ChanServ-based takeover protection", body: "detects unauthorized mass deop/mode changes and escalates: deop, kickban, akick" },
          { title: "Enforce unauthorized `+k`/`+l` removal", body: "reactive (real-time) and proactive (on join via RPL_CHANNELMODEIS)" },
          { title: "Channel mode tracking", body: "mode string, key, and limit tracked from MODE and `channel info` reply; new `channel:modesReady` event" },
          { title: "Multi-stage Dockerfile + healthcheck", body: "smaller production images; healthcheck for orchestration tools" },
        ],
      },
      {
        kind: "changed",
        items: [
          { title: "`channel_modes` Eggdrop-style format", body: "`\"+nt-s\"` means \"ensure +n and +t, ensure -s, leave everything else alone\"; modes not mentioned are no longer treated as unauthorized" },
          { title: "`enforce_modes` gates both directions", body: "when off, neither additions nor removals run" },
        ],
      },
      {
        kind: "fixed",
        items: [
          { title: "ChanServ OP on Rizon", body: "OP request no longer gated on ChanServ being in the channel" },
          { title: "DCC TOCTOU race", body: "duplicate DCC CHAT requests now rejected when one is already pending" },
          { title: "`!seen` cross-channel info disclosure", body: "queries from a different channel omit channel name and message text" },
          { title: "Bot-link security audit", body: "1 critical + 5 warning findings closed (permission bypass, frame validation, rate limiting)" },
          { title: "Codebase security sweep", body: "8 additional warnings closed from full-codebase audit" },
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-03-29",
    display: "March 29, 2026",
    title: "Initial Release",
    summary: "HexBot v0.1.0 is the first public release. The core bot framework is production-ready with a full plugin API, permission system, and Docker deployment.",
    sections: [
      {
        kind: "included",
        display: "tiles",
        items: [
          { title: "8 bundled plugins", body: "chanmod, flood, greeter, seen, topic, help, ctcp, 8ball" },
          { title: "Bind system", body: "16 event types, pattern-matched handlers" },
          { title: "Flag-based permissions", body: "Owner, master, op, voice, deop; per-channel and global" },
          { title: "Hot-reload", body: "Edit and reload plugins without restarting" },
          { title: "SASL authentication", body: "PLAIN and EXTERNAL (CertFP)" },
          { title: "IRCv3 caps", body: "extended-join, account-notify, chghost" },
          { title: "SOCKS5 proxy", body: "Tor and SSH tunnel support" },
          { title: "DCC CHAT party line", body: "Remote admin sessions" },
          { title: "SQLite persistence", body: "Namespaced per-plugin key/value store" },
          { title: "Docker deployment", body: "Compose file with host-mounted config and plugins" },
        ],
      },
    ],
  },
];

const ROADMAP = [
  { label: "XDCC", detail: "File serving over DCC" },
  { label: "IdleRPG", detail: "Idle-based RPG plugin" },
];

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return <InlineCode key={`${keyPrefix}-${i}`}>{part.slice(1, -1)}</InlineCode>;
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

function BulletSection({ release, section }: { release: Release; section: ReleaseSection }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase">
        <GradientText>{SECTION_LABELS[section.kind]}</GradientText>
      </p>
      <ul className="space-y-1 text-muted-foreground text-xs">
        {section.items.map((item, i) => (
          <li key={i}>
            <strong className="text-foreground">{item.title}</strong> — {renderInline(item.body, `${release.version}-${section.kind}-${i}`)}
          </li>
        ))}
      </ul>
    </>
  );
}

function TilesSection({ release, section }: { release: Release; section: ReleaseSection }) {
  return (
    <>
      <p className="text-[10px] font-semibold uppercase">
        <GradientText>{SECTION_LABELS[section.kind]}</GradientText>
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {section.items.map((item) => (
          <div key={item.title} className="rounded border border-border/50 bg-card/50 px-2.5 py-1.5">
            <span className="text-xs font-semibold text-foreground">{item.title}</span>
            <span className="ml-1.5 text-[10px] text-muted-foreground">{renderInline(item.body, `${release.version}-${section.kind}-${item.title}`)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function News() {
  return (
    <div className="w-full max-w-170 space-y-6 py-2">
      <div>
        <h1 className="text-foreground text-lg">News</h1>
      </div>

      <div className="timeline space-y-8">
        {RELEASES.map((release, idx) => (
          <Fragment key={release.version}>
            <article className="timeline-item space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="pill text-accent-red">v{release.version}</span>
                <time dateTime={release.date} className="text-xs text-muted-foreground">
                  {release.display}
                </time>
              </div>
              <h2 className="text-foreground">{release.title}</h2>
              <p className="leading-relaxed text-muted-foreground">{renderInline(release.summary, `${release.version}-summary`)}</p>

              {release.sections.map((section) =>
                section.display === "tiles" ? (
                  <TilesSection key={section.kind} release={release} section={section} />
                ) : (
                  <BulletSection key={section.kind} release={release} section={section} />
                ),
              )}

              {idx === 0 && (
                <p className="text-muted-foreground">
                  See{" "}
                  <a href="https://github.com/jstnmthw/hexbot/blob/main/CHANGELOG.md" className="text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
                    CHANGELOG.md
                  </a>{" "}
                  for the full list of changes.
                </p>
              )}
              {release.version === "0.1.0" && (
                <p className="text-muted-foreground">
                  See the{" "}
                  <Link href="/deploy" className="text-foreground hover:underline">
                    deploy guide
                  </Link>{" "}
                  to get started, or browse the{" "}
                  <Link href="/plugins" className="text-foreground hover:underline">
                    plugin list
                  </Link>{" "}
                  to see what&rsquo;s included.
                </p>
              )}
            </article>

            <hr className="mx-12 border-border" />
          </Fragment>
        ))}

        <section aria-labelledby="roadmap-heading" className="timeline-item">
          <h2 id="roadmap-heading" className="sr-only">
            Roadmap
          </h2>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="pill">upcoming</span>
            <span className="text-xs text-muted-foreground">Roadmap</span>
          </div>
          <ul className="list-disc space-y-2 pl-4 marker:text-accent-red/40">
            {ROADMAP.map((item) => (
              <li key={item.label}>
                <strong className="text-sm text-foreground">{item.label}</strong>
                <span className="ml-2 text-xs text-muted-foreground">{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
