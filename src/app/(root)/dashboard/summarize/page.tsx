
import { Circle, Sparkles } from 'lucide-react'
import React from 'react'

import { Textarea } from '@/components/ui/textarea'
import CreditChart from '@/components/Credits'
import { Slider } from '@/components/ui/slider'

const page = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex flex-col items-between gap-2">
                        <div className="flex items-center gap-2">
                            <Circle className="size-7 mt-1 text-green-400 fill-green-400 mb-2" />
                            <span className="text-green-500 font-bold text-3xl dark:text-green-400">AI SUMMARIZER</span>
                        </div>
                        <span className="text-black font-bold text-xl dark:text-white ml-8">NOTE: 5 CREDITS PER SUMMARIZATION</span>
                    </div>
                    <CreditChart />
                </div>
                <div className='pt-10 flex flex-col gap-5 max-w-sm'>
                    <Slider defaultValue={[15]} max={100} step={1} />
                    <span>Maximum Words: 15</span>
                </div>
                <div className="grid grid-cols-2 gap-4 my-10">
                    <div>
                        <Textarea
                            placeholder="Enter text to summarize"
                            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
                        />
                    </div>
                    <Textarea
                        placeholder="Summarized text will appear here"
                        readOnly
                        className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
                    />
                </div>
                <div className="w-1/6 mx-auto">
                    <button className="w-full px-6 py-3 flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg font-semibold text-lg transition-all hover:bg-green-600 shadow-[6px_6px_0_0_#166534] hover:shadow-[2px_2px_0_0_#166534] hover:translate-x-1 hover:translate-y-1">
                        <Sparkles className="size-6 ml-2 text-white fill-green-400" />
                        SUMMARIZE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page