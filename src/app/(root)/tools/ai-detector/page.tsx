import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicAIDetector = dynamic(
  () => import("@/components/pages/AIDetector"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

const page = () => {
  return (
    <div className="flex min-h-[70vh] flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col">
        <ToolsHeader
          name="AI/GPT DETECTOR"
          credits={Credits.AIDetector.toString()}
        />
        <Suspense>
          <DynamicAIDetector />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
