export default function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="rounded py-px inline-block bg-neutral-800 px-1 font-mono text-foreground">{children}</code>;
}
