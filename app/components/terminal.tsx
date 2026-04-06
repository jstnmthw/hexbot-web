export default function Terminal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="terminal m-0">
      <figcaption className="terminal-bar">{title}</figcaption>
      <pre className="terminal-body m-0 whitespace-pre-wrap leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
    </figure>
  );
}
