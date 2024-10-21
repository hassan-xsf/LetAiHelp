import { Circle } from 'lucide-react'
import React from 'react'
import CreditChart from './Credits'

const ToolsHeader = ({name , credits} : {name: string , credits: string}) => {
    return (
        <div className="flex items-center gap-2 justify-between">
            <div className="flex flex-col items-between gap-2">
                <div className="flex items-center gap-2">
                    <Circle className="size-7 mt-1 text-green-400 fill-green-400 mb-2" />
                    <span className="text-green-500 font-bold text-3xl dark:text-green-400">{name}</span>
                </div>
                <span className="text-black font-bold text-xl dark:text-white ml-8">NOTE: {credits} CREDITS PER TRANSLATION</span>
            </div>
            <CreditChart />
        </div>
    )
}

export default ToolsHeader