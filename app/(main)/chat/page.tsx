import type { Metadata } from "next";
import { CHAT_URL } from "../../config";

export const metadata: Metadata = {
  title: "Chat",
  description: "Join #hexbot on Rizon directly from your browser. No account required — just pick a nickname.",
  alternates: { canonical: "/chat" },
  robots: { index: false, follow: true },
};

export default function ChatPage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
        <h1 className="text-sm font-semibold text-foreground">#hexbot on Rizon</h1>
        <a href={CHAT_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
          Open in new tab
        </a>
      </div>
      <iframe src={CHAT_URL} title="HexBot IRC Chat" allow="clipboard-write" className="block h-[calc(100dvh-10rem)] min-h-120 w-full rounded border border-border bg-card" />
    </div>
  );
}
