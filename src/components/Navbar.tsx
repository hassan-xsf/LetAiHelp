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
import { navbarItems } from "@/constants/navbarLimits";

const Navbar = async () => {
  const data = await getServerSession(authOptions);
  return (
    <header className="mx-auto flex h-14 max-w-screen-xl items-center bg-gray-50 px-2 tracking-tighter text-gray-600 dark:bg-zinc-950 dark:text-white sm:px-4 lg:px-6">
      <Logo />
      <nav className="ml-auto flex items-center gap-3 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-xs sm:text-sm">
              Tools
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {navbarItems.navMain.map((item) => (
              <>
                {item.items && (
                  <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                )}
                {item.items &&
                  item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.title + subItem.url}>
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </DropdownMenuItem>
                  ))}
                <DropdownMenuSeparator />
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link className="text-xs font-medium sm:text-sm" href="/tools/upgrade">
          Pricing
        </Link>
        {data?.user && (
          <Link className="b text-xs font-medium sm:text-sm" href="/tools">
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
