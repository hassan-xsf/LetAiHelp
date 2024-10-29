import React from "react";
import LinkButton from "./buttons/LinkButton";

const GridSection = () => {
  return (
    <div className="relative">
      <section className="bg-grid-pattern dark:bg-grid-pattern-dark flex min-h-[42vh] w-full flex-col items-center space-y-2 py-12 text-center md:py-24 lg:py-32 xl:py-48">
        <h1 className="z-50 text-3xl font-bold tracking-tighter dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Unleash the Power of AI
        </h1>
        <h2 className="sm:text-md z-50 mx-auto max-w-[700px] text-sm text-black dark:text-white">
          LetAIHelp provides you AI tools that helps boost your productivity and
          enhance creativity,
        </h2>
        <LinkButton name="Get Started" />
      </section>
    </div>
  );
};

export default GridSection;
