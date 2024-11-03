import LoadingSpinner from "@/components/LoadingSpinner";
import ToolsHeader from "@/components/ToolsHeader";
import { Credits } from "@/constants/credits";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicPaidChatBots = dynamic(
  () => import("@/components/pages/PaidChatBots"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  },
);

const PaidChatBots = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-2">
      <div className="flex flex-col">
        <ToolsHeader
          name="PREMIUM CHAT BOTS"
          credits={Credits.Chat.toString()}
        />
        <Suspense fallback={<LoadingSpinner />}>
          <DynamicPaidChatBots />
        </Suspense>
      </div>
    </div>
  );
};

export default PaidChatBots;
