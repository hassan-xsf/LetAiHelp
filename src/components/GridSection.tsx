import React from "react";
import LinkButton from "./buttons/LinkButton";

const GridSection = () => {
  return (
    <div className="relative">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center text-center space-y-2 h-[42vh] bg-grid-pattern  dark:bg-grid-pattern-dark">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl dark:text-white z-50">
          Unleash the Power of AI
        </h1>
        <h2 className="mx-auto max-w-[700px] text-md text-black dark:text-white  z-50">
          LetAIHelp provides you AI tools that helps boost your productivity and
          enhance creativity,
        </h2>
        <LinkButton name="Get Started" />
      </section>
    </div>
  );
};

export default GridSection;
