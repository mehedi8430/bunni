import { icons } from "@/lib/imageProvider";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavUser from "./nav-user";
import { useCurrentUserQuery } from "@/redux/endpoints/userApi";

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
          title: "Integration",
          url: "/dashboard/settings/payment",
          icon: icons.payment_integration,
        },
        {
          title: "Language",
          url: "/dashboard/settings/language",
          icon: icons.language,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userProfileData, isLoading } = useCurrentUserQuery("");
  const user = userProfileData?.data?.user;
  return (
    <Sidebar collapsible="icon" {...props} className="mt-20 border-none">
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {
        !isLoading && user && (
          <SidebarFooter className="mb-22">
            <NavUser user={user} />
          </SidebarFooter>
        )
      }
      <SidebarRail />
    </Sidebar>
  );
}
