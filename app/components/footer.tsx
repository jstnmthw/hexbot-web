import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-2xl mx-auto border-t border-border py-3 text-xs text-muted-foreground">
      <div className="flex items-start gap-2">
        <Link href="/" aria-label="HexBot home">
          <Image src="/hexbot.svg" alt="" width={16} height={16} />
        </Link>
        <div>Copyright &copy; HexBot 2026. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
