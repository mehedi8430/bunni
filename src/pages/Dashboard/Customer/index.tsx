import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { DataTableDemo } from "./components/DataTableDemo";

// Define the type for customer data
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  orders: number;
  totalSpent: number;
};

export default function CustomerPage() {
  // State for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total] = useState(100); // Total number of customers in database

  // Generate dummy data
  const generateCustomers = (): Customer[] => {
    const statuses: ("Active" | "Inactive" | "Pending")[] = [
      "Active",
      "Inactive",
      "Pending",
    ];
    const customers: Customer[] = [];

    for (let i = 0; i < limit; i++) {
      customers.push({
        id: `CUS-${1000 + i}`,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        address: `${i + 100} Main St, City ${(i % 5) + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        joinDate: new Date(
          Date.now() -
            Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 3),
        ).toLocaleDateString(),
        orders: Math.floor(Math.random() * 100),
        totalSpent: Math.floor(Math.random() * 10000) + 100,
      });
    }

    return customers;
  };

  const [data] = useState<Customer[]>(generateCustomers());

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
      accessorKey: "id",
      header: "ID",
      size: 120,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 150,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      size: 120,
    },
    {
      accessorKey: "orders",
      header: "Orders",
      size: 100,
    },
    {
      accessorKey: "totalSpent",
      header: "Total Spent",
      size: 120,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalSpent"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return formatted;
      },
    },
  ];

  // Actions for each row
  const actions = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => console.log("Copy payment ID")}>
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-semibold">Customers</h1>
        <Button variant={"primary"} size={"lg"} className="text-lg font-normal">
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
            isLoading={false}
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            onLimitChange={setLimit}
            actions={actions}
          />
          {/* <DataTableDemo /> */}
        </div>
      </div>
    </section>
  );
}
