import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

async function CreditChart({ totalCredit = 1000 }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const getUserCredits = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      credits: true,
    },
  });

  const remainingCredit = getUserCredits?.credits || 0;

  const percentage = (remainingCredit / totalCredit) * 100;

  return (
    <div className="w-44 h-44 relative">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-zinc-600 stroke-current"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-green-400 stroke-current"
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
        <span className="text-sm text-black font-extrabold dark:text-white">
          CREDITS LEFT
        </span>
      </div>
    </div>
  );
}
export default CreditChart;
