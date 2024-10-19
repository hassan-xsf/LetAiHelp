
import React from 'react'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import LogoutBtn from './LogoutBtn'

const Navbar = async () => {
    const data = await getServerSession(authOptions)
    return (
        <div className="flex justify-between h-[5vh] rounded-md mt-2">
            <Link href="/" className="text-4xl">SAMPLE</Link>
            {
                data?.user ? <LogoutBtn /> : <Link href="/sign-in" className={buttonVariants({ variant: "secondary" })}>Sign In</Link>
            }
        </div>
    )
}

export default Navbar


