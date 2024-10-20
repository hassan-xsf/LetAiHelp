

import ToolsList from '@/components/ToolsList'
import React from 'react'


const Home = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[70vh]">
        <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-black font-extrabold text-4xl tracking-tight dark:text-white">Hello</span>
              <span className="text-black font-bold text-3xl dark:text-green-400">WHICH AI TOOL WOULD YOU LIKE TO TRY TODAY?</span>
            </div>
            <CreditChart />
          </div>
          <ToolsList/>
        </div>
      </div>
    </>
  )
}

function CreditChart({ totalCredit = 100, usedCredit = 30 }) {
  const remainingCredit = totalCredit - usedCredit
  const percentage = (remainingCredit / totalCredit) * 100

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
        <span className="text-4xl font-bold">{remainingCredit}</span>
        <span className="text-sm text-black font-extrabold dark:text-white">CREDITS LEFT</span>
      </div>
    </div>
  )
}
export default Home