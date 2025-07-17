import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customerApi, type Customer } from "@/mockApi/customerApi";
import { DialogModal } from "@/components/DialogModal";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { CustomerForm } from "./components/CustomerForm";
import CustomerDetails from "./components/CustomerDetails";
import { CustomerTableActions } from "./components/CustomerTableActions";
import TopPayingCustomerChart from "./components/TopPayingCustomerChart";
import HighestUnpaidBalanceChart from "./components/HighestUnpaidBalanceChart";

export default function CustomerPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal states
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Partial<Customer>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  // Fetch customers when page, limit, or filters change
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const customers = await customerApi.getCustomers({
          page,
          limit,
          search: searchTerm || undefined,
        });
        console.log({ customers });

        const allCustomerName = customers.data.map((cust) => cust.name);
        console.log("All Customer Names:", allCustomerName);

        setData(customers.data);
        setTotal(customers.total);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [page, limit, searchTerm]);

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
          className="border-foreground/50"
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
      accessorKey: "achToken",
      header: "ACH Token",
      size: 200,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("achToken")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
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
            <DropdownMenuContent align="end" className="p-0 border border-border">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCustomer(customer);
                  setIsViewOpen(true);
                }}
                className="cursor-pointer text-base border-b border-border rounded-none py-3 flex justify-center items-center"
              >
                {/* <Eye className="mr-2 h-4 w-4" /> */}
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditCustomer(customer);
                  setIsEditOpen(true);
                }}
                className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCustomerToDelete(customer.id);
                  setIsDeleteOpen(true);
                }}
                className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSave = (updatedCustomer: Customer) => {
    setData((prev) =>
      prev.map((cust) =>
        cust.id === updatedCustomer.id ? updatedCustomer : cust,
      ),
    );
    if (!updatedCustomer.id) {
      setData((prev) => [...prev, updatedCustomer]);
      setTotal((prev) => prev + 1);
    }
  };

  const handleFilterChange = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[32px]">Customers</h1>
        <Button
          variant="primary"
          size="lg"
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
        <div className="card_container col-span-2 xl:col-span-1">
          <TopPayingCustomerChart />
        </div>
        <div className="card_container col-span-2 xl:col-span-1">
          <HighestUnpaidBalanceChart />
        </div>

        <div className="bg-sidebar col-span-2 rounded-2xl py-4">
          <CustomerTableActions
            searchTerm={searchTerm}
            handleFilterChange={handleFilterChange}
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
            actions={true}
          />
        </div>
      </div>

      {/* View Details Modal */}
      <DialogModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        title="View Details"
      >
        <CustomerDetails onClose={() => setIsViewOpen(false)} customerId={selectedCustomer?.id || ""} />
      </DialogModal>

      {/* Edit Modal with CustomerForm */}
      <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editCustomer.id ? "Edit Customer" : "Add New Customer"}
        className="!max-w-4xl"
      >
        <CustomerForm
          customer={editCustomer}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </DialogModal>

      {/* Delete Alert Dialog */}
      <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={async () => {
          if (customerToDelete) {
            console.log("Customer To Be Deleted:", customerToDelete);
            // Prepare for future API call if implemented
            setData((prev) =>
              prev.filter((cust) => cust.id !== customerToDelete),
            );
            setTotal((prev) => prev - 1);
            setIsDeleteOpen(false);
            setCustomerToDelete(null);
          }
        }}
      />
    </section>
  );
}
