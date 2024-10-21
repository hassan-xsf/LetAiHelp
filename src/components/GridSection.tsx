"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import LinkButton from "./LinkButton";

const GridSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-200 dark:bg-zinc-900 animate-pulse rounded-md" />
    );
  return (
    <section
      key={mounted ? "1" : "2"}
      className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 ${
        theme === "light" ? "bg-grid-pattern" : "bg-grid-pattern-dark"
      }`}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 z-50">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
              Unleash the Power of AI
            </h1>
            <p className="mx-auto max-w-[700px] text-black dark:text-white md:text-xl">
              LetAIHelp provides you AI tools that helps boost your productivity
              and enhance creativity.
            </p>
          </div>
          <LinkButton name="Get Started" />
        </div>
      </div>
    </section>
  );
};

export default GridSection;
