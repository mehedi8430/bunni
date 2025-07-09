import * as React from "react";
import { icons } from "@/lib/imageProvider";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: icons.dashboard_icon,
      isActive: true,
    },
    {
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: icons.invoices,
    },
    {
      title: "Customer",
      url: "/dashboard/customer",
      icon: icons.customer,
    },
    {
      title: "Payment",
      url: "/dashboard/payment",
      icon: icons.payment,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: icons.products,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: icons.settings,
      items: [
        {
          title: "Profile Settings",
          url: "/dashboard/settings/profile",
          icon: icons.profile_settings,
        },
        {
          title: "Invoice Settings",
          url: "/dashboard/settings/invoice",
          icon: icons.invoice_settings,
        },
        {
          title: "User Management",
          url: "/dashboard/settings/user",
          icon: icons.user_management,
        },
        {
          title: "Subscription",
          url: "/dashboard/settings/subscription",
          icon: icons.subscription,
        },
        {
          title: "Notification",
          url: "/dashboard/settings/notification",
          icon: icons.notification,
        },
        {
          title: "Payment Integration",
          url: "/dashboard/settings/payment",
          icon: icons.payment_integration,
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
