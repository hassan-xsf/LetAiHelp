
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import LogoutBtn from './LogoutBtn'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SparklesIcon } from 'lucide-react'

const Navbar = async () => {
    const data = await getServerSession(authOptions)
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
            <Link className="flex items-center justify-center" href="/">
                <SparklesIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">LetAIHelp</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">Tools</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Chat Tools</DropdownMenuLabel>
                        <DropdownMenuItem>AI Chat Assistant</DropdownMenuItem>
                        <DropdownMenuItem>Language Translation</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Image Tools</DropdownMenuLabel>
                        <DropdownMenuItem>Image to Text</DropdownMenuItem>
                        <DropdownMenuItem>AI Image Enhancement</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Other Tools</DropdownMenuLabel>
                        <DropdownMenuItem>AI Presentation Maker</DropdownMenuItem>
                        <DropdownMenuItem>AI Code Assistant</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="#">
                    Pricing
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="#">
                    About
                </Link>
                {
                    data?.user ? <LogoutBtn /> : <Link href="/sign-in" className="bg-green-600 text-sm text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 py-1 px-3 rounded-md">Sign In</Link>
                }
            </nav>
        </header>
    )
}

export default Navbar


