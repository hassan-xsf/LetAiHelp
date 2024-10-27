import CreditChart from "@/components/Credits";
import ToolsList from "@/components/ToolsList";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-extrabold tracking-tight text-black dark:text-white">
            Hello
          </span>
          <span className="text-500 text-3xl font-bold dark:text-green-400">
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
