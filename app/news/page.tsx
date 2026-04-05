import type { Metadata } from "next";
import Link from "next/link";
import GradientText from "../components/gradient-text";
import { HEXBOT_VERSION } from "../config";

export const metadata: Metadata = {
  title: "News",
  description: "HexBot release notes and roadmap. Latest updates on bot linking, channel protection, plugins, security fixes, and upcoming features.",
  alternates: { canonical: "/news" },
};

const ROADMAP = [
  { label: "AI chat module", detail: "Google Gemini integration with cost controls and prompt filtering" },
  { label: "XDCC", detail: "File serving over DCC" },
  { label: "IdleRPG", detail: "Idle-based RPG plugin" },
];

export default function News() {
  return (
    <div className="w-full max-w-170 space-y-6 py-2">
      <div>
        <h1 className="text-foreground text-lg">News</h1>
      </div>

      {/* ── Timeline ──────────────────────────────────────── */}
      <div className="timeline space-y-8">
        {/* Latest release */}
        <article className="timeline-item space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="pill text-accent-red">v{HEXBOT_VERSION}</span>
            <time dateTime="2026-04" className="text-xs text-muted-foreground">
              April 2026
            </time>
          </div>
          <h2 className="text-foreground">Bot Linking, Channel Protection & Hardening</h2>
          <p className="leading-relaxed text-muted-foreground">v{HEXBOT_VERSION} adds multi-bot networking, channel takeover protection, persistent rejoin, and a round of security fixes.</p>

          <p className="text-xs font-semibold uppercase">
            <GradientText>Added</GradientText>
          </p>
          <ul className="space-y-1 text-muted-foreground text-xs">
            <li>
              <strong className="text-foreground">Bot linking protocol</strong> — hub-and-leaf networking with state sync, command relay, and party line chat
            </li>
            <li>
              <strong className="text-foreground">Session relay</strong> —{" "}
              <code className="rounded bg-muted px-1 font-mono text-foreground">
                .relay {"<"}botname{">"}
              </code>{" "}
              proxies a DCC console session to a remote bot
            </li>
            <li>
              <strong className="text-foreground">Protection frames</strong> — cross-network takeover protection and ban sharing between linked bots
            </li>
            <li>
              <strong className="text-foreground">Persistent channel rejoin</strong> — periodic check every 30s, handles kick+ban, invite-only, bad key
            </li>
            <li>
              <strong className="text-foreground">Takeover protection</strong> — ChanServ-backed escalation: deop, kickban, akick on mass deop
            </li>
            <li>
              <strong className="text-foreground">Enforce +k/+l removal</strong> — removes unauthorized key/limit changes reactively and on join
            </li>
            <li>
              <strong className="text-foreground">Channel mode tracking</strong> — mode string, key, and limit tracked from MODE and RPL_CHANNELMODEIS
            </li>
            <li>
              <strong className="text-foreground">Config validation</strong> — unknown or invalid plugin config keys rejected on load with descriptive errors
            </li>
          </ul>

          <p className="text-xs font-semibold uppercase">
            <GradientText>Fixed</GradientText>
          </p>
          <ul className="space-y-1 text-muted-foreground text-xs">
            <li>
              <strong className="text-foreground">ChanServ OP on Rizon</strong> — OP request no longer gated on ChanServ being in the channel
            </li>
            <li>
              <strong className="text-foreground">DCC TOCTOU race</strong> — duplicate DCC CHAT requests now rejected when already pending
            </li>
            <li>
              <strong className="text-foreground">!seen info disclosure</strong> — cross-channel queries now omit channel name and message text
            </li>
            <li>
              <strong className="text-foreground">Zombie on exhausted reconnects</strong> — bot exits cleanly instead of hanging indefinitely
            </li>
            <li>
              <strong className="text-foreground">Bot-link security</strong> — 1 critical + 5 warning findings fixed from security audit
            </li>
            <li>
              <strong className="text-foreground">Codebase audit</strong> — 8 additional warnings fixed from full-codebase sweep
            </li>
          </ul>

          <p className="text-muted-foreground">
            See{" "}
            <a href="https://github.com/jstnmthw/hexbot/blob/main/CHANGELOG.md" className="text-foreground hover:underline" target="_blank" rel="noopener noreferrer">
              CHANGELOG.md
            </a>{" "}
            for the full list of changes.
          </p>
        </article>

        <hr className="mx-12 border-border" />

        {/* v0.1.0 */}
        <article className="timeline-item space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="pill text-accent-red">v0.1.0</span>
            <time dateTime="2026-03" className="text-xs text-muted-foreground">
              March 2026
            </time>
          </div>
          <h2 className="text-foreground">Initial Release</h2>
          <p className="leading-relaxed text-muted-foreground">HexBot v0.1.0 is the first public release. The core bot framework is production-ready with a full plugin API, permission system, and Docker deployment.</p>

          <p className="text-[10px] font-semibold uppercase">
            <GradientText>Included</GradientText>
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ["8 bundled plugins", "chanmod, flood, greeter, seen, topic, help, ctcp, 8ball"],
              ["Bind system", "16 event types, pattern-matched handlers"],
              ["Flag-based permissions", "Owner, master, op, voice, deop; per-channel and global"],
              ["Hot-reload", "Edit and reload plugins without restarting"],
              ["SASL authentication", "PLAIN and EXTERNAL (CertFP)"],
              ["IRCv3 caps", "extended-join, account-notify, chghost"],
              ["SOCKS5 proxy", "Tor and SSH tunnel support"],
              ["DCC CHAT party line", "Remote admin sessions"],
              ["SQLite persistence", "Namespaced per-plugin key/value store"],
              ["Docker deployment", "Compose file with host-mounted config and plugins"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded border border-border/50 bg-card/50 px-2.5 py-1.5">
                <span className="text-xs font-semibold text-foreground">{title}</span>
                <span className="ml-1.5 text-[10px] text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground">
            See the{" "}
            <Link href="/deploy" className="text-foreground hover:underline">
              deploy guide
            </Link>{" "}
            to get started, or browse the{" "}
            <Link href="/plugins" className="text-foreground hover:underline">
              plugin list
            </Link>{" "}
            to see what’s included.
          </p>
        </article>

        <hr className="mx-12 border-border" />

        {/* Upcoming */}
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
