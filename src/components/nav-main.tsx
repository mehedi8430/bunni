"use client";

import { CircleChevronRight } from "lucide-react";
import { ReactSVG } from "react-svg";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: string;
    }[];
  }[];
}) {
  const navigate = useNavigate();
  const activePath = useLocation().pathname;

  const isActive = (url: string) => {
    return url === activePath;
  };

  return (
    <SidebarGroup className="py-8">
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "hover:bg-primary hover:data-[state=open]:bg-primary p-5 text-lg font-normal hover:text-white hover:data-[state=open]:text-white",
                    {
                      "bg-primary text-white": isActive(item.url),
                    },
                  )}
                  onClick={() => navigate(item.url)}
                >
                  {item.icon && <ReactSVG src={item.icon} />}
                  {/* {item.icon && <item.icon className="w-6 h-6 mr-1" />} */}
                  <span>{item.title}</span>
                  {item?.items?.length && (
                    <CircleChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item?.items?.length && (
                <CollapsibleContent>
                  <SidebarMenuSub className="space-y-2">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          className={cn(
                            "hover:bg-primary mt-1 p-5 text-lg font-normal hover:text-white",
                            {
                              "bg-primary text-white": isActive(subItem.url),
                            },
                          )}
                          onClick={() => navigate(subItem?.url)}
                        >
                          {subItem.icon && <ReactSVG src={subItem.icon} />}
                          <span>{subItem.title}</span>
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
  );
}
