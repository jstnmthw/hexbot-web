import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "HexBot: Modular IRC Bot for Node.js" },
  description: "HexBot is a modular, hot-reloadable IRC bot for Node.js, written in TypeScript. Deploy with Docker, extend with plugins, and run on any IRC network.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <main>Hello Beta</main>;
}
