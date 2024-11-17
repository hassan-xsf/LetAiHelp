import { Circle } from "lucide-react";
import React from "react";
import CreditChart from "./Credits";

const ToolsHeader = ({ name, credits }: { name: string; credits: string }) => {
  return (
    <div className="flex items-center justify-between tracking-tighter">
      <div className="items-between flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Circle className="mb-2 mt-1 size-5 fill-green-400 text-green-400 sm:size-7" />
          <span className="text-xl font-bold text-green-500 dark:text-green-400 sm:text-2xl">
            {name}
          </span>
        </div>
        <span className="text-md ml-8 font-bold text-black dark:text-white sm:text-sm">
          NOTE: {credits} CREDITS PER USE
        </span>
      </div>
      <CreditChart />
    </div>
  );
};

export default ToolsHeader;
