"use client";

<<<<<<< HEAD
import { ChevronsUpDown, LogOut, Palette, Sparkles } from "lucide-react";
=======
import {
  ChevronsUpDown,
  LogOut,
  Palette,
  Sparkles,
} from "lucide-react"
>>>>>>> a9ff8a59d2a07d0bedc83f66c208b69026f06355

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
<<<<<<< HEAD
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
=======
} from "@/components/ui/sidebar"
import { signOut, useSession } from "next-auth/react"
import ThemeBtn from "../ThemeBtn"
import { useTheme } from "next-themes"
>>>>>>> a9ff8a59d2a07d0bedc83f66c208b69026f06355

export function NavUser() {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  if (!session?.user) return null;
  const { user } = session;
  const { theme , setTheme } = useTheme()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    user?.image ||
                    `https://api.dicebear.com/9.x/micah/svg?seed=${user?.name![0].toLowerCase()}`
                  }
                  alt={user?.name!}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      user?.image ||
                      `https://api.dicebear.com/9.x/micah/svg?seed=${user?.name![0].toLowerCase()}`
                    }
                    alt={user?.name!}
                  />
                  <AvatarFallback className="rounded-lg">TM</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <div
                className="cursor-pointer"
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/sign-in`,
                  })
                }
              >
                Sign Out
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
<<<<<<< HEAD
              <Palette />
              <div
                className="cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"}
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
=======
              <Palette/>
              <div className="cursor-pointer" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}</div>
              

            </DropdownMenuItem>
            <DropdownMenuSeparator />

>>>>>>> a9ff8a59d2a07d0bedc83f66c208b69026f06355
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
