"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const [expandedItem, setExpandedItem] = useState<null | string>(null);
  const handleExpand = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-tighter text-black dark:text-white">
        Tools
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            open={expandedItem === item.title}
            onOpenChange={() => handleExpand(item.title)}
          >
            <SidebarMenuItem className="tracking-tighter">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  {item.title === "Home" ? (
                    <a href={item.url} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="text-xs">{item.title}</span>
                    </a>
                  ) : (
                    <div className="flex w-full cursor-pointer items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="text-xs">{item.title}</span>
                      {item.items && item.items.length > 0 && (
                        <ChevronRight
                          className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                            expandedItem === item.title ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </div>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span className="text-[11px]">{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
    // <SidebarGroup>
    //   <SidebarGroupLabel className="tracking-tighter text-black dark:text-white">
    //     Tools
    //   </SidebarGroupLabel>
    //   <SidebarMenu>
    //     {items.map((item) => (
    //       <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
    //         <SidebarMenuItem className="tracking-tighter">
    //           <SidebarMenuButton asChild tooltip={item.title}>
    //             {item.title === "Home" ? (
    //               <a href={item.url}>
    //                 <item.icon />
    //                 <span className="text-xs">{item.title}</span>
    //               </a>
    //             ) : (
    //               <div className="cursor-pointer">
    //                 <item.icon />
    //                 <span className="text-xs">{item.title}</span>
    //               </div>
    //             )}
    //           </SidebarMenuButton>
    //           {item.items?.length ? (
    //             <>
    //               <CollapsibleTrigger asChild>
    //                 <SidebarMenuAction className="data-[state=open]:rotate-90">
    //                   <ChevronRight />
    //                   <span className="sr-only">Toggle</span>
    //                 </SidebarMenuAction>
    //               </CollapsibleTrigger>
    //               <CollapsibleContent>
    //                 <SidebarMenuSub>
    //                   {item.items?.map((subItem) => (
    //                     <SidebarMenuSubItem key={subItem.title}>
    //                       <SidebarMenuSubButton asChild>
    //                         <a href={subItem.url}>
    //                           <span className="text-[11px]">
    //                             {subItem.title}
    //                           </span>
    //                         </a>
    //                       </SidebarMenuSubButton>
    //                     </SidebarMenuSubItem>
    //                   ))}
    //                 </SidebarMenuSub>
    //               </CollapsibleContent>
    //             </>
    //           ) : null}
    //         </SidebarMenuItem>
    //       </Collapsible>
    //     ))}
    //   </SidebarMenu>
    // </SidebarGroup>
  );
}
