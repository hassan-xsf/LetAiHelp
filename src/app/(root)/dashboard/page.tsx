import CreditChart from "@/components/Credits";
import ToolsList from "@/components/ToolsList";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">
            Hello
          </span>
          <span className="text-500 text-xl font-bold text-green-400 md:text-3xl">
            WHICH AI TOOL WOULD YOU LIKE TO TRY TODAY?
          </span>
        </div>
        <CreditChart />
      </div>
      <ToolsList />
    </>
  );
};
export default Home;
