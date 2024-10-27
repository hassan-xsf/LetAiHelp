import { Circle } from "lucide-react";
import React from "react";
import CreditChart from "./Credits";

const ToolsHeader = ({ name, credits }: { name: string; credits: string }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="items-between flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Circle className="mb-2 mt-1 size-7 fill-green-400 text-green-400" />
          <span className="text-3xl font-bold text-green-500 dark:text-green-400">
            {name}
          </span>
        </div>
        <span className="ml-8 text-xl font-bold text-black dark:text-white">
          NOTE: {credits} CREDITS PER USE
        </span>
      </div>
      <CreditChart />
    </div>
  );
};

export default ToolsHeader;
