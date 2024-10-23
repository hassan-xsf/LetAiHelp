import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";

const DynamicTextToImage = dynamic(
  () => import("@/components/pages/TextToImage"),
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
          name="AI TEXT TO IMAGE"
          credits={Credits.TextToImage.toString()}
        />
        <DynamicTextToImage />
      </div>
    </div>
  );
};

export default page;
