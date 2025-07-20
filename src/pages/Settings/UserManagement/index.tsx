import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { userApi } from "@/mockApi/userApi";
import type { TUser } from "@/types";
import UserTableActions from "./components/UserTableActions";
import { DialogModal } from "@/components/DialogModal";
import UserForm from "./components/UserForm";

export default function UserManagementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TUser[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<Partial<TUser>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Fetch users when page, limit, or filters change
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const users = await userApi.getUsers({
          page,
          limit,
          search: searchTerm || undefined,
        });
        setData(users.data);
        setTotal(users.total);
      } catch (error) {
        console.error("Error fetching users:", error);
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, searchTerm]);

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "memberName",
      header: "Member Name",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("memberName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      size: 120,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("permissions")}</div>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("lastLogin")}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0">
              <DropdownMenuItem
                onClick={() => {
                  setEditUser(user);
                  setIsEditOpen(true);
                }}
                className="custom-action-button"
              >
                {/* <Edit className="mr-2 h-4 w-4" /> */}
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log("Resend Invite");
                }}
                className="custom-action-button"
              >
                {/* <SendToBack className="mr-2 h-4 w-4" /> */}
                Resend Invite
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUserToDelete(user.id);
                  setIsDeleteOpen(true);
                }}
                className="custom-action-button"
              >
                {/* <Trash className="mr-2 h-4 w-4" /> */}
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSave = (updatedUser: TUser) => {
    // console.log("handleSave called with:", updatedUser);
    // console.log("editUser.id:", editUser.id);

    // If editUser.id exists, we're editing an existing user
    if (editUser.id) {
      setData((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
    } else {
      // If editUser.id doesn't exist, we're adding a new user
      setData((prev) => [...prev, updatedUser]);
      setTotal((prev) => prev + 1);
    }
  };

  const handleFilterChange = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[32px]">User Management</h1>

      <div className="bg-sidebar rounded-2xl py-4">
        <UserTableActions
          searchTerm={searchTerm}
          handleFilterChange={handleFilterChange}
          setIsEditOpen={setIsEditOpen}
          setEditProduct={setEditUser}
        />

        <DataTable
          data={data}
          columns={columns}
          isLoading={isLoading}
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </div>

      {/* Edit Modal with UserForm */}
      <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editUser.id ? "Edit Member" : "Add New Member"}
        className="!w-4xl"
      >
        <UserForm
          user={editUser}
          onSave={handleSave}
          onClose={() => setIsEditOpen(false)}
        />
      </DialogModal>

      {/* Delete Alert Dialog */}
      <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={async () => {
          if (userToDelete) {
            console.log("User To Be Deleted:", userToDelete);
            setData((prev) => prev.filter((user) => user.id !== userToDelete));
            setTotal((prev) => prev - 1);
            setIsDeleteOpen(false);
            setUserToDelete(null);
          }
        }}
      />
    </section>
  );
}
