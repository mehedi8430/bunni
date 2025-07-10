import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <section>
      <Header />

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="fixed z-50 -mt-12 ml-4 md:mt-2 md:-ml-4">
            <SidebarTrigger />
          </div>
          <main className="px-4 py-8 md:px-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
