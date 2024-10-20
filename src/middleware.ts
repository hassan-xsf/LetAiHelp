import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })

    if(token) {
        if (req.nextUrl.pathname === '/sign-in' ||
            req.nextUrl.pathname === "/sign-up"
        ) {
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }    
    }
    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }
}

export const config = {
    matcher: ['/dashboard'],
}