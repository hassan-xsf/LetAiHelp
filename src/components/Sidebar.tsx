"use client";
import * as React from "react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { navbarItems } from "@/constants/navbarLimits";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <React.Suspense
          fallback={
            <div className="h-screen w-full animate-pulse bg-gray-200 dark:bg-zinc-900"></div>
          }
        >
          <>
            <NavMain items={navbarItems.navMain} />
            <NavSecondary
              items={navbarItems.navSecondary}
              className="mt-auto"
            />
          </>
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
