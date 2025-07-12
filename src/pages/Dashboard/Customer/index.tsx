import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Plus, Trash } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customerApi, type Customer } from "@/mockApi/customerApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CustomerPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Partial<Customer>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  // Fetch customers when page or limit changes
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const customers = await customerApi.getCustomers();
        setData(customers);
        setTotal(customers.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [page, limit]);

  // Define columns
  const columns: ColumnDef<Customer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-border"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-border"
        />
      ),
      size: 50,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: () => <div className="text-start">Customer Name</div>,
      size: 220,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "truncated_tokens",
      header: "Truncated Token",
      size: 220,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("truncated_tokens")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 220,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 200,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      size: 200,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("company")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCustomer(customer);
                  setIsViewOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditCustomer(customer);
                  setIsEditOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCustomerToDelete(customer.id);
                  setIsDeleteOpen(true);
                }}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Handle Edit Form Submission
  const handleEditSubmit = async () => {
    if (editCustomer.id) {
      const updatedCustomer = await customerApi.updateCustomer(
        editCustomer.id,
        editCustomer,
      );
      setData((prev) =>
        prev.map((cust) =>
          cust.id === updatedCustomer.id ? updatedCustomer : cust,
        ),
      );
      setIsEditOpen(false);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (customerToDelete) {
      await customerApi.updateCustomer(customerToDelete, { isDeleted: true }); // Mock deletion
      setData((prev) => prev.filter((cust) => cust.id !== customerToDelete));
      setTotal((prev) => prev - 1);
      setIsDeleteOpen(false);
      setCustomerToDelete(null);
    }
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-semibold">Customers</h1>
        <Button
          variant={"primary"}
          size={"lg"}
          className="text-lg font-normal"
          onClick={() => {
            setEditCustomer({});
            setIsEditOpen(true);
          }}
        >
          <Plus />
          New Customer
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card_container col-span-2 xl:col-span-1">chart 1</div>
        <div className="card_container col-span-2 xl:col-span-1">chart 2</div>

        <div className="bg-sidebar col-span-2 rounded-2xl py-4">
          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            onLimitChange={setLimit}
            actions={true}
          />
        </div>
      </div>

      {/* View Details Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <span className="col-span-3">{selectedCustomer.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <span className="col-span-3">{selectedCustomer.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <span className="col-span-3">{selectedCustomer.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                  Company
                </Label>
                <span className="col-span-3">{selectedCustomer.company}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="truncated_tokens" className="text-right">
                  Truncated ACH Tokens
                </Label>
                <span className="col-span-3">
                  {selectedCustomer.truncated_tokens}
                </span>
              </div>
              {selectedCustomer.paymentMethods.length > 0 && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paymentMethod" className="text-right">
                    Payment Method
                  </Label>
                  <span className="col-span-3">
                    {selectedCustomer.paymentMethods[0].brand ||
                      selectedCustomer.paymentMethods[0].type}{" "}
                    ****{selectedCustomer.paymentMethods[0].last4}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Billing Address
                </Label>
                <span className="col-span-3">{selectedCustomer.address}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="default" onClick={() => setIsViewOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editCustomer.id ? "Edit Customer" : "Add New Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={editCustomer.name?.split(" ")[0] || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    name: `${e.target.value} ${prev.name?.split(" ")[1] || ""}`,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={editCustomer.name?.split(" ")[1] || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    name: `${prev.name?.split(" ")[0] || ""} ${e.target.value}`,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editCustomer.email || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={editCustomer.phone || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={editCustomer.company || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editCustomer.address || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creditCardToken">Credit Card token</Label>
              <Input
                id="creditCardToken"
                value={editCustomer.truncated_tokens || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    truncated_tokens: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="achToken">ACH token</Label>
              <Input
                id="achToken"
                value={editCustomer.paymentMethods?.[0]?.truncatedToken || ""}
                onChange={(e) =>
                  setEditCustomer((prev) => ({
                    ...prev,
                    paymentMethods: [
                      {
                        ...(prev.paymentMethods?.[0] || {}),
                        truncatedToken: e.target.value,
                      },
                    ],
                  }))
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleEditSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
