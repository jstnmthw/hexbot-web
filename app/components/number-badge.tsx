export default function NumberBadge({ n }: { n: number }) {
  return <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-accent-red/30 bg-accent-red-dim font-mono text-[10px] text-accent-red">{n}</span>;
}
