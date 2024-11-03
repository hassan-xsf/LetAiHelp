import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (token) {
    if (
      req.nextUrl.pathname === "/sign-in" ||
      req.nextUrl.pathname === "/sign-up"
    ) {
      return NextResponse.redirect(new URL("/tools", req.nextUrl));
    }
  }
  if (!token && req.nextUrl.pathname.startsWith("/tools")) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
}

export const config = {
  matcher: ["/tools/:path*", "/sign-in", "/sign-up"],
};
