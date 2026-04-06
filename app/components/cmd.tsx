export default function Cmd({ children }: { children: React.ReactNode }) {
  return <code className="inline-block rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">{children}</code>;
}
