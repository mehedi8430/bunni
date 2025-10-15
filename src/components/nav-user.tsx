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
  useLogoutUserMutation,
} from "@/redux/endpoints/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router";

interface NavUserProps {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_owner: boolean;
  owner_email: string | null;
  image: string;
}

export default function NavUser({ user }: { user: NavUserProps }) {
  const navigate = useNavigate();
  const {image, email, first_name, last_name } = user;
  console.log(first_name, last_name);
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const { refresh_token } = useSelector(authSelector);

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const response = await logoutUser({ refresh: refresh_token }).unwrap();

      if (response.status_code === 200) {
        toast.success(response?.message || "Logout successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.detail || "Failed to logout");
    }
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={image} alt={`${first_name} ${last_name}`} />
                  <AvatarFallback className="rounded-lg text-lg font-bold bg-primary text-white">
                    {first_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {first_name}{" "}{last_name}
                  </span>
                  <span className="truncate font-medium">
                    {email}
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
                    <AvatarImage src={image} alt={`${first_name} ${last_name}`} />
                    <AvatarFallback className="rounded-lg">
                      {first_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {first_name} {last_name}
                    </span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setIsLogoutOpen(true);
                }}
                className="cursor-pointer"
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
