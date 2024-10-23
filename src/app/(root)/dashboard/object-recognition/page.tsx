import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicObjectRecognition = dynamic(
  () => import("@/components/pages/ObjectRecognition"),
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
          name="AI OBJECT RECOGNITION"
          credits={Credits.ObjectDetection.toString()}
        />
        <Suspense
          fallback={
            <div className="bg-red-900 h-screen w-full">Loading...</div>
          }
        >
          <DynamicObjectRecognition />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
