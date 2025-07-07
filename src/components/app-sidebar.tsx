import * as React from "react";
import { BookOpen, Bot, Gauge, Settings } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
      isActive: true,
    },
    {
      title: "Invoices",
      url: "#",
      icon: Bot,
    },
    {
      title: "Customer",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Payment",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Products",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile Settings",
          url: "#",
        },
        {
          title: "Invoice Settings",
          url: "#",
        },
        {
          title: "User Management",
          url: "#",
        },
        {
          title: "Subscription",
          url: "#",
        },
        {
          title: "Notification",
          url: "#",
        },
        {
          title: "Payment Integration",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="mt-20 border-none">
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
