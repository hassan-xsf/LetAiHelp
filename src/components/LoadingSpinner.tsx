import { Loader2 } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-green-400" />
    </div>
  );
};

export default LoadingSpinner;
