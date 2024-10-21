import { Circle, Sparkles } from 'lucide-react'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { languageCodes } from '@/constants/allLanguages'
import { Textarea } from '@/components/ui/textarea'
import ToolsHeader from '@/components/ToolsHeader'

const page = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-8 min-h-[70vh]">
            <div className="flex flex-col">
                <ToolsHeader name = "AI Language Translator" credits = "2"/>
                <div className='pt-10 flex items-center gap-5'>
                    <Select>
                        <SelectTrigger className="w-[240px] border-green-400">
                            <SelectValue placeholder="Select source language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Source Language</SelectLabel>
                                {
                                    Object.entries(languageCodes).map(([key, value]) => (
                                        <SelectItem key = {key} value={value}>{key}</SelectItem>

                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[240px] border-green-400">
                            <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Resulting Language</SelectLabel>
                                {
                                    Object.entries(languageCodes).map(([key, value]) => (
                                        <SelectItem key = {key} value={value}>{key}</SelectItem>

                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4 my-10">
                    <div>

                        <Textarea
                            placeholder="Enter text to translate"
                            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
                        />
                    </div>
                    <Textarea
                        placeholder="Translation will appear here"
                        readOnly
                        className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
                    />
                </div>
                <div className="w-1/6 mx-auto">
                    <button className="w-full px-6 py-3 flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg font-semibold text-lg transition-all hover:bg-green-600 shadow-[6px_6px_0_0_#166534] hover:shadow-[2px_2px_0_0_#166534] hover:translate-x-1 hover:translate-y-1">
                        <Sparkles className="size-6 ml-2 text-white fill-green-400" />
                        AI TRANSLATE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page