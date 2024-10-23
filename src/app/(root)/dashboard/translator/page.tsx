import Translator from "@/components/pages/Translator";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
      <div className="flex flex-col">
        <ToolsHeader
          name="AI Language Translator"
          credits={Credits.Translator.toString()}
        />
        <Suspense
          fallback={
            <div className="bg-red-900 h-screen w-full">Loading...</div>
          }
        >
          <Translator />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
