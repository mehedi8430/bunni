import * as React from "react";
import { BookOpen, Bot, Gauge, Settings } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

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
      url: "/dashboard/invoices",
      icon: Bot,
    },
    {
      title: "Customer",
      url: "/dashboard/customer",
      icon: BookOpen,
    },
    {
      title: "Payment",
      url: "/dashboard/payment",
      icon: BookOpen,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile Settings",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Invoice Settings",
          url: "/dashboard/settings/invoice",
        },
        {
          title: "User Management",
          url: "/dashboard/settings/user",
        },
        {
          title: "Subscription",
          url: "/dashboard/settings/subscription",
        },
        {
          title: "Notification",
          url: "/dashboard/settings/notification",
        },
        {
          title: "Payment Integration",
          url: "/dashboard/settings/payment",
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
