import Image from "next/image";
import Link from "next/link";
import GradientText from "../gradient-text";

const NAV_LINKS = [
  { href: "/Guide", label: "Guide" },
  { href: "/plugins", label: "Plugins" },
  { href: "/config", label: "Config" },
  { href: "/news", label: "News" },
];

export function Header() {
  return (
    <>
      <header className="container mx-auto px-6 py-5 border border-border border-t-0 flex flex-col justify-between md:flex-row md:items-center">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-bold tracking-tight uppercase">
            <Link href="/beta" className="flex items-center">
              <Image src="/hexbot.svg" alt="HexBot logo" className="inline h-8 w-8 mr-2" width={16} height={16} loading="eager" />
              Hex
              <span className="font-light text-muted">bot</span>
            </Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-medium text-white hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <div className="container mx-auto divider-cross"></div>
    </>
  );
}
