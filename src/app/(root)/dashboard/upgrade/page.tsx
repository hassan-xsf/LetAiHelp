import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicUpgrade = dynamic(() => import("@/components/pages/Upgrade"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
      <div className="flex flex-col">
        <Suspense>
          <DynamicUpgrade />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
