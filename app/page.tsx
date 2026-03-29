import Link from "next/link";

function ActionButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded border border-border bg-card px-8 py-3 text-center text-foreground transition-colors hover:border-ring hover:bg-accent"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <div>

      {/* Intro */}
      <div className="mx-auto max-w-6xl py-4 text-center leading-relaxed text-foreground">
        HexBot is a modular{" "}
        <strong>Internet Relay Chat</strong> bot for{" "}
        <strong>Node.js</strong>, written in TypeScript. <br />Designed for
        reliability and extensibility, HexBot runs on any IRC network and
        can be deployed in seconds using Docker.
      </div>

      <br />

      {/* Logo + Action buttons */}
      <div className="flex items-center justify-center gap-12 py-4">

        {/* Logo */}
        <div className="text-center">
          <div className="select-none text-[5rem] leading-none text-primary">⬡</div>
          <div className="mt-1 text-xs text-muted-foreground">v0.1.0</div>
        </div>

        {/* Buttons */}
        <div className="flex min-w-40 flex-col gap-3">
          <ActionButton href="/about">About HexBot</ActionButton>
          <ActionButton href="/github">Download HexBot</ActionButton>
          <ActionButton href="/deploy">Deploy with Docker</ActionButton>
        </div>

      </div>

      <br />

      {/* News */}
      <div className="mx-auto max-w-3xl py-4">
        <h2 className="mb-3 border-b border-border pb-1 text-sm font-semibold text-foreground">
          Latest News
        </h2>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          HexBot v0.1.0 has been{" "}
          <Link href="/news" className="text-foreground hover:underline">released</Link>.
        </p>
        <p className="mb-3 leading-relaxed text-muted-foreground">
          New to HexBot? See the{" "}
          <Link href="/docs" className="text-foreground hover:underline">documentation</Link>{" "}
          to get started, or browse the{" "}
          <Link href="/plugins" className="text-foreground hover:underline">plugin library</Link>{" "}
          to extend your bot.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          To discuss HexBot with other users or get help, visit the{" "}
          <Link href="/community" className="text-foreground hover:underline">community forum</Link>.
        </p>
      </div>

    </div>
  );
}
