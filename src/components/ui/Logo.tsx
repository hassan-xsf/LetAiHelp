import { SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link className="flex items-center justify-center" href="/">
            <SparklesIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">LetAIHelp</span>
        </Link>

    )
}

export default Logo