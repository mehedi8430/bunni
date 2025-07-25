import {
  DataTable,
  type DataTableHandle,
} from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { userApi } from "@/mockApi/userApi";
import type { TUser } from "@/types";
import { DialogModal } from "@/components/DialogModal";
import UserForm from "./components/UserForm";
import { DataTableFilter } from "@/components/DataTable/dataTableFilter";

export default function UserManagementPage() {
  const tableRef = useRef<DataTableHandle<TUser> | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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
  ];

  const actions = (row: TUser) => {
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
              setEditUser(row);
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
              setUserToDelete(row?.id);
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
  };

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

  const tableHeaderColumns = [
    { id: "memberName", displayName: "Member Name", canHide: false },
    { id: "email", displayName: "Email" },
    { id: "phone", displayName: "Phone" },
    { id: "permissions", displayName: "Permissions" },
    { id: "lastLogin", displayName: "Last Login" },
  ];

  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[26px]">User Management</h1>

      <div className="bg-sidebar rounded-2xl py-4">
        <div className="flex items-center justify-between pr-3">
          {tableRef.current?.table && (
            <DataTableFilter
              searchTerm={searchTerm}
              handleFilterChange={handleFilterChange}
              table={tableRef.current.table}
              columns={tableHeaderColumns}
              searchPlaceholder="Search by name, email, or company"
              showDatePicker={false}
              showExportButton={false}
              columnVisibility={columnVisibility}
            />
          )}
          <Button
            variant="primary"
            className="text-sm font-normal md:text-base"
            onClick={() => {
              setIsEditOpen(true);
              setEditUser({});
            }}
          >
            <Plus />
            Add Member
          </Button>
        </div>

        <DataTable
          data={data}
          columns={columns}
          isLoading={isLoading}
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onLimitChange={setLimit}
          actions={actions}
          ref={tableRef}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
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
