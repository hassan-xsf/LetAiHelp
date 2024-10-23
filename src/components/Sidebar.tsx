"use client";
import * as React from "react";
import {
  BookOpen,
  Bot,
  LifeBuoy,
  Send,
  Settings2,
  GraduationCap,
  Home,
} from "lucide-react";

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

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard/",
      icon: Home,
    },
    {
      title: "Chat Tools",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "AI Chatbot",
          url: "/chatbot",
        },
        {
          title: "AI Personal Assistant",
          url: "#",
        },
        {
          title: "AI Explainer",
          url: "#",
        },
        {
          title: "AI Coder",
          url: "#",
        },
      ],
    },
    {
      title: "Image Tools",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Text to Image",
          url: "#",
        },
        {
          title: "Image to Text",
          url: "#",
        },
        {
          title: "Image to Image",
          url: "#",
        },
      ],
    },
    {
      title: "Student Tools",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "AI Writing Assistants",
          url: "#",
        },
        {
          title: "AI Presentation Maker",
          url: "#",
        },
        {
          title: "AI Career Guidance",
          url: "#",
        },
        {
          title: "AI Study Buddy",
          url: "#",
        },
        {
          title: "AI MCQ Quiz",
          url: "#",
        },
        {
          title: "AI Quiz",
          url: "#",
        },
      ],
    },
    {
      title: "Other Tools",
      url: "",
      icon: Settings2,
      items: [
        {
          title: "AI Translation",
          url: "/dashboard/translator",
        },
        {
          title: "AI Summarizer",
          url: "/dashboard/summarizer",
        },
        {
          title: "Object Recognition",
          url: "/dashboard/object-recognition",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

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
            <div className="h-screen w-full bg-gray-200 dark:bg-zinc-900 animate-pulse"></div>
          }
        >
          <>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
