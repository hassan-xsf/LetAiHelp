import Link from "next/link";
import LinkButton from "@/components/buttons/LinkButton";
import Navbar from "@/components/Navbar";
import ToolsList from "@/components/ToolsList";
import GridSection from "@/components/GridSection";

export default function page() {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col bg-gray-50 tracking-tighter dark:bg-zinc-950">
        <main className="flex-1">
          <GridSection />
          <section className="py-12 md:py-24 lg:py-32">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Our AI Tools
            </h2>
            <ToolsList />
          </section>
          <section className="w-full bg-white py-12 tracking-tighter dark:bg-zinc-950 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
                    Ready to Let AI Help?
                  </h2>
                  <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of users who are already benefiting from our
                    AI-powered tools.
                  </p>
                </div>
                <LinkButton name="Get Started" />
              </div>
            </div>
          </section>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-200 px-4 py-6 dark:border-gray-700 dark:bg-zinc-950 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-white">
            © 2024 LetAIHelp. All rights reserved.
          </p>
          <nav className="flex gap-4 text-gray-500 dark:text-white sm:ml-auto sm:gap-6">
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
