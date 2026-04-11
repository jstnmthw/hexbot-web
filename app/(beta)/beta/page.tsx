import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "HexBot: Modular IRC Bot for Node.js" },
  description: "HexBot is a modular, hot-reloadable IRC bot for Node.js, written in TypeScript. Deploy with Docker, extend with plugins, and run on any IRC network.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="container mx-auto flex-1 border-l border-r border-border">
      <div className="flex flex-col items-center py-12">
        <p className="text-4xl font-bold">404</p>
        <h1 className="text-2xl">Page Not Found</h1>
      </div>
    </div>
  );
}
