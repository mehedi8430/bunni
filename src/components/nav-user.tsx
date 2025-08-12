import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { AlertDialogModal } from "./AlertDialogModal";
import {
  // useGetUserProfileQuery,
  useUserLoggedOutMutation,
} from "@/redux/endpoints/authApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { authSelector } from "@/redux/slices/authSlice";

export default function NavUser() {
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const refreshToken = useAppSelector(authSelector)?.refresh_token;

  const [userLoggedOut] = useUserLoggedOutMutation();
  // const { data } = useGetUserProfileQuery();

  const handleLogout = async () => {
    try {
      const response = await userLoggedOut(refreshToken).unwrap();

      if (response.status_code === 200) {
        toast.success(response?.message || "Logout successful!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.detail || "Failed to logout");
    }
  };

  const userData = {
    img: "https://github.com/eduardo-camargo.png",
    fullName: "Eduardo Camargo",
    email: "8B2b3@example.com",
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={userData?.img} alt={userData?.fullName} />
                  <AvatarFallback className="rounded-lg">
                    {userData?.fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userData?.fullName}
                  </span>
                  <span className="truncate font-medium">
                    {userData?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-[180px] rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData?.img} alt={userData?.fullName} />
                    <AvatarFallback className="rounded-lg">
                      {userData?.fullName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userData?.fullName}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setIsLogoutOpen(true);
                }}
              >
                <LogOut />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <AlertDialogModal
        isOpen={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        onConfirm={handleLogout}
      />
    </>
  );
}
