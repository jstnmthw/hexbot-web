import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/plugins", label: "Plugins" },
  { href: "/deploy", label: "Deploy" },
  { href: "/news", label: "News" },
  {
    href: "https://github.com/jstnmthw/hexbot",
    label: "GitHub",
    external: true,
  },
];

export function Header() {
  return (
    <header className="container mx-auto px-6 py-5 border border-border border-t-0">
      <h1 className="text-xl font-black tracking-tighter uppercase">
        <Link href="/beta" className="flex items-center">
          <Image src="/hexbot.svg" alt="HexBot logo" className="inline h-8 w-8 mr-2" width={16} height={16} loading="eager" />
          Hex<span className="font-light">bot</span>
        </Link>
      </h1>
    </header>
  );
}
