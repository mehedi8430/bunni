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
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    icon?: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: string;
    }[];
  }[];
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const isActive = (url?: string) => {
    if (!url) return false;

    if (url === "/dashboard") {
      return location.pathname === url;
    }

    return location.pathname === url || location.pathname.startsWith(`${url}/`);
  };

  // Check if any subitem's URL matches the active path
  const isSubItemActive = (subItems?: { url: string }[]) => {
    return (
      subItems?.some((subItem) => subItem.url === location.pathname) || false
    );
  };

  // Handle navigation and close mobile sidebar
  const handleNavigate = (url: string) => {
    navigate(url);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup className="py-8">
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const hasSubItems = !!item.items?.length;
          // Open the collapsible if the item is active or any subitem is active
          const isOpen = item.isActive || isSubItemActive(item.items);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <div>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "hover:bg-primary hover:data-[state=open]:bg-primary cursor-pointer p-5 text-base font-normal hover:text-white hover:data-[state=open]:text-white",
                        {
                          "bg-primary text-white": isActive(item.url),
                        },
                      )}
                      onClick={() => {
                        if (item.items?.length) {
                          // Let CollapsibleTrigger handle toggle; do not navigate
                          // Don't prevent default — it blocks expand!
                        } else if (item.url) {
                          handleNavigate(item.url);
                        }
                      }}
                    >
                      {item.icon && <ReactSVG src={item.icon} />}
                      <span>{t(item.title)}</span>
                      {item.items?.length && (
                        <CircleChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </div>
                </CollapsibleTrigger>

                {hasSubItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="space-y-2">
                      {item?.items &&
                        item?.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              className={cn(
                                "hover:bg-primary mt-1 cursor-pointer p-5 text-base font-normal hover:text-white",
                                {
                                  "bg-primary text-white": isActive(
                                    subItem.url,
                                  ),
                                },
                              )}
                              onClick={() => handleNavigate(subItem.url)}
                            >
                              {subItem.icon && <ReactSVG src={subItem.icon} />}
                              <span>{t(subItem.title)}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
