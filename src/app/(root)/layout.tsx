import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LetAIHelp - Tools that boosts your productivity",
  description:
    "LetAIHelp is a collection of tools that boosts your productivity. It includes Paid GPT , Claude , AI Detector and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color="#4ade80" height={4} />
          <main className="min-h-screen bg-gray-50 px-4 dark:bg-zinc-950">
            {children}
          </main>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
