import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicTranslator = dynamic(
  () => import("@/components/pages/Translator"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
      <div className="flex flex-col">
        <ToolsHeader
          name="AI Language Translator"
          credits={Credits.Translator.toString()}
        />
        <Suspense>
          <DynamicTranslator />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
