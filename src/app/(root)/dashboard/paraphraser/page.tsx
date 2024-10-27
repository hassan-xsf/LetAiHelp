import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicParaphraser = dynamic(
  () => import("@/components/pages/Paraphraser"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

const page = () => {
  return (
    <div className="flex min-h-[70vh] flex-1 flex-col gap-4 p-8">
      <div className="flex flex-col">
        <ToolsHeader
          name="PARAPHRASER TOOL"
          credits={Credits.Paraphraser.toString()}
        />
        <Suspense>
          <DynamicParaphraser />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
