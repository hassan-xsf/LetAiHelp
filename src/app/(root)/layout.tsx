import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LetAIHelp - Tools that boosts your productivity",
  description: "LetAIHelp is a collection of tools that boosts your productivity. It includes AI Chat Tools, Translation , Summarizer and many more"
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
          <main className="px-4 min-h-screen bg-gray-50 dark:bg-zinc-950">
            {children}
          </main>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html >
  );
}
