export default function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`bg-linear-to-r from-accent-red to-accent-red/60 bg-clip-text text-transparent ${className}`}>{children}</span>;
}
