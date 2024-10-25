import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicText = dynamic(() => import("@/components/pages/Chat"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <div className="flex flex-col">
        <ToolsHeader name="AI CHAT" credits={Credits.Chat.toString()} />
        <Suspense fallback={<LoadingSpinner />}>
          <DynamicText />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
