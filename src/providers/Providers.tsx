"use client"

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}

export default Providers