import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Chat",
  robots: { index: false, follow: false },
};

export default function ChatPage() {
  notFound();
}
