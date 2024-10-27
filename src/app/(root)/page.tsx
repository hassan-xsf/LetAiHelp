import Link from "next/link";
import LinkButton from "@/components/buttons/LinkButton";
import Navbar from "@/components/Navbar";
import ToolsList from "@/components/ToolsList";
import GridSection from "@/components/GridSection";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950">
        <main className="flex-1">
          <GridSection />
          <section className="py-12 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              Our AI Tools
            </h2>
            <ToolsList />
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-950">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                    Ready to Let AI Help?
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Join thousands of users who are already benefiting from our
                    AI-powered tools.
                  </p>
                </div>
                <LinkButton name="Get Started" />
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 dark:bg-zinc-950 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-white">
            © 2024 LetAIHelp. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-gray-500 dark:text-white">
            <Link className="text-xs" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
