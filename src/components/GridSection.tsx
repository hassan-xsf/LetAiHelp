"use client";

import { useTheme } from "next-themes";
import React from "react";
import LinkButton from "./buttons/LinkButton";

const GridSection = () => {
  const { theme } = useTheme();

  return (
    <section
      key={theme === "dark" ? "1" : "2"}
      className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center space-y-4 text-center ${
        theme === "light" ? "bg-grid-pattern" : "bg-grid-pattern-dark"
      }`}
    >
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl dark:text-white z-50">
        Unleash the Power of AI
      </h1>
      <p className="mx-auto max-w-[700px] text-black dark:text-white md:text-xl z-50">
        LetAIHelp provides you AI tools that helps boost your productivity and
        enhance creativity.
      </p>
      <LinkButton name="Get Started" />
    </section>
  );
};

export default GridSection;
