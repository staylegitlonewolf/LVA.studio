import type { Metadata } from "next";
import { Sora, Newsreader } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LVA B2B Portal (Beta)",
  description: "LVA Studio beta portal for owner and member workspaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)] antialiased selection:bg-[var(--color-accent)]/30">
        {children}
      </body>
    </html>
  );
}
