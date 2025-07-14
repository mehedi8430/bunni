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
import { DialogModal } from "@/components/DialogModal";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { InvoiceTableActions } from "./components/InvoiceTableActions";
import { invoiceApi, type Invoice } from "@/mockApi/invoiceApi";
import { cn } from "@/lib/utils";

export default function InvoicesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<Invoice[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal states
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState<Partial<Invoice>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

  // Fetch invoices when page, limit, or filters change
  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const invoices = await invoiceApi.getInvoices({
          page,
          limit,
          search: searchTerm || undefined,
        });
        setData(invoices.data);
        setTotal(invoices.total);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [page, limit, searchTerm]);

  const columns: ColumnDef<Invoice>[] = [
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
      accessorKey: "id",
      header: () => <div className="text-start">Invoice</div>,
      size: 180,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "customerName",
      header: () => <div className="text-start">Customer Name</div>,
      size: 220,
      cell: ({ row }) => (
        <div className="truncate text-start">
          {row.getValue("customerName")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 120,
      cell: ({ row }) => (
        <div
          className={cn(
            "truncate rounded-[6px] px-[29px] py-1 text-sm font-normal",
            {
              "border border-[#0CAF60]/40 bg-[#0CAF60]/10 text-[#0CAF60]":
                row.getValue("status") === "Paid",
              "border border-[#E03137]/40 bg-[#E03137]/10 text-[#E03137]":
                row.getValue("status") === "Unpaid",
              "border border-[#0A4269]/40 bg-[#0A4269]/20 text-[#0A4269]":
                row.getValue("status") === "Save",
            },
          )}
        >
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "orderNumber",
      header: () => <div className="text-start">Order Number</div>,
      size: 120,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("orderNumber")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 120,
      cell: ({ row }) => (
        <div className="truncate">${row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "tenderType",
      header: "Tender Type",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("tenderType")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("date")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const invoice = row.original;
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
                  setSelectedInvoice(invoice);
                  setIsViewOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditInvoice(invoice);
                  setIsEditOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setInvoiceToDelete(invoice.id);
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

  const handleSave = (updatedInvoice: Invoice) => {
    setData((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)),
    );
    if (!updatedInvoice.id) {
      setData((prev) => [...prev, updatedInvoice]);
      setTotal((prev) => prev + 1);
    }
  };

  const handleFilterChange = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  return (
    <section className="space-y-10">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold md:text-[32px]">Invoices</h1>
        <Button variant="primary" size="lg" className="text-lg font-normal">
          <Plus />
          Create Invoices
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="card_container col-span-1 space-y-5 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              {/* <ReactSVG src={assets.icons.pending} /> */}
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Pending payments
            </p>
          </div>
          <p className="text-2xl font-bold">$ 4,212</p>
        </div>

        <div className="card_container col-span-1 space-y-5 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              {/* <ReactSVG src={assets.icons.pending} /> */}
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Pending payments
            </p>
          </div>
          <p className="text-2xl font-bold">$ 4,212</p>
        </div>

        <div className="card_container col-span-1 space-y-5 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              {/* <ReactSVG src={assets.icons.pending} /> */}
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Pending payments
            </p>
          </div>
          <p className="text-2xl font-bold">$ 4,212</p>
        </div>

        <div className="card_container col-span-1 space-y-5 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              {/* <ReactSVG src={assets.icons.pending} /> */}
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Pending payments
            </p>
          </div>
          <p className="text-2xl font-bold">$ 4,212</p>
        </div>

        <div className="bg-sidebar col-span-4 rounded-2xl py-4">
          <InvoiceTableActions
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
      {/* <DialogModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        title="View Details"
      >
        <InvoiceDetails invoiceId={selectedInvoice?.id || ""} onClose={() => setIsViewOpen(false)} />
      </DialogModal> */}

      {/* Edit Modal with InvoiceForm */}
      {/* <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editInvoice.id ? "Edit Invoice" : "Add New Invoice"}
      >
        <InvoiceForm
          invoice={editInvoice}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </DialogModal> */}

      {/* Delete Alert Dialog */}
      <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
        onConfirm={async () => {
          if (invoiceToDelete) {
            console.log("Invoice To Be Deleted:", invoiceToDelete);
            setData((prev) => prev.filter((inv) => inv.id !== invoiceToDelete));
            setTotal((prev) => prev - 1);
            setIsDeleteOpen(false);
            setInvoiceToDelete(null);
          }
        }}
      />
    </section>
  );
}
