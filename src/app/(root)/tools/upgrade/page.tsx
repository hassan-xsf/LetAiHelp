import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicUpgrade = dynamic(() => import("@/components/pages/Upgrade"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

const page = () => {
  return (
    <div className="flex min-h-[70vh] flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col">
        <Suspense>
          <DynamicUpgrade />
        </Suspense>
      </div>
    </div>
  );
};

export default page;