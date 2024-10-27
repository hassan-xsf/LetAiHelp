"use client";

import { useSession } from "next-auth/react";

function CreditChart({ totalCredit = 1000 }) {
  const session = useSession();
  if (!session) {
    return null;
  }
  const remainingCredit = session.data?.user.credits!;

  const percentage = (remainingCredit / totalCredit) * 100;

  return (
    <div className="relative h-44 w-44">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-current text-zinc-600"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="stroke-current text-green-400"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          strokeDasharray={`${percentage * 2.827}, 1000`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold">{remainingCredit}</span>
        <span className="text-sm font-extrabold text-black dark:text-white">
          CREDITS LEFT
        </span>
      </div>
    </div>
  );
}
export default CreditChart;
