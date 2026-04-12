import "./beta.css";
import type { Metadata } from "next";
import { Header } from "@/app/components/beta/header";
import { Footer } from "@/app/components/beta/footer";
import { Archivo, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <div className="min-h-screen bg-background">
          <div className="mx-auto flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 flex-col">
              <div className="container mx-auto flex-1 border-l border-r border-border">
                <div className="flex flex-col items-center py-12">
                  <p className="text-4xl font-bold">404</p>
                  <h1 className="text-2xl">Page Not Found</h1>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
