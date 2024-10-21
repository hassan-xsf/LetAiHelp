

import CreditChart from '@/components/Credits'
import ToolsList from '@/components/ToolsList'
import React from 'react'


const Home = () => {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-black font-extrabold text-4xl tracking-tight dark:text-white">Hello</span>
          <span className="text-500 font-bold text-3xl dark:text-green-400">WHICH AI TOOL WOULD YOU LIKE TO TRY TODAY?</span>
        </div>
        <CreditChart />
      </div>
      <ToolsList />
    </>
  )
}
export default Home