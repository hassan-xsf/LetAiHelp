import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutBtn from "./buttons/LogoutButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import ThemeBtn from "./buttons/ThemeButton";

const Navbar = async () => {
  const data = await getServerSession(authOptions);
  return (
    <header className="mx-auto flex h-14 max-w-screen-2xl items-center bg-gray-50 px-2 text-gray-600 dark:bg-zinc-950 dark:text-white sm:px-4 lg:px-6">
      <Logo />
      <nav className="ml-auto flex items-center gap-3 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-xs sm:text-sm">
              Tools
            </Button>
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
        <Link
          className="text-xs font-medium sm:text-sm"
          href="/dashboard/upgrade"
        >
          Pricing
        </Link>
        {data?.user && (
          <Link className="text-xs font-medium sm:text-sm" href="/dashboard">
            Dashboard
          </Link>
        )}
        {data?.user ? (
          <LogoutBtn />
        ) : (
          <Link
            href="/sign-in"
            className="rounded-md bg-green-600 px-3 py-1 text-xs font-bold text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:text-sm"
          >
            Sign In
          </Link>
        )}
        <ThemeBtn />
      </nav>
    </header>
  );
};

export default Navbar;
