import {
  DataTable,
  type DataTableHandle,
} from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Plus, Filter } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { PdfDialogModal } from "@/components/shared/PdfModal";
import { icons } from "@/lib/imageProvider";
import { cn } from "@/lib/utils";
import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TInvoice } from "@/types";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { ReactSVG } from "react-svg";
import PreviewTemplate from "../CreateInvoiceTemplatePage/Components/PreviewTemplate";
import InvoiceTableRowActions from "./components/InvoiceTableRowActions";
import TopCard from "./components/TopCard";
import { DataTableFilter } from "@/components/DataTable/dataTableFilter";

// Custom header component for status filtering
const StatusFilterHeader = ({
  statusFilter,
  onStatusFilterChange,
}: {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>Status</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
        >
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Filter className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("")}
            className={`cursor-pointer ${statusFilter === "" ? "bg-accent" : ""}`}
          >
            All Status
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("Paid")}
            className={`cursor-pointer ${statusFilter === "Paid" ? "bg-accent" : ""}`}
          >
            Paid
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("Unpaid")}
            className={`cursor-pointer ${statusFilter === "Unpaid" ? "bg-accent" : ""}`}
          >
            Unpaid
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("Save")}
            className={`cursor-pointer ${statusFilter === "Save" ? "bg-accent" : ""}`}
          >
            Save
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default function InvoicesPage() {
  const navigate = useNavigate();
  const tableRef = useRef<DataTableHandle<TInvoice> | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TInvoice[]>([]);
  const [allInvoices, setAllInvoices] = useState<TInvoice[]>([]); // Store all data for filtering
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(""); // Status filter state

  // Modal states
  const [, setSelectedInvoice] = useState<TInvoice | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
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
          date: selectedDate || undefined,
        });
        setAllInvoices(invoices.data);
        setTotal(invoices.total);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setAllInvoices([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [page, limit, searchTerm, selectedDate]);

  // Client-side filtering using useMemo
  const filteredInvoices = useMemo(() => {
    if (!statusFilter) return allInvoices;

    return allInvoices.filter(
      (invoice) => invoice.status?.toLowerCase() === statusFilter.toLowerCase(),
    );
  }, [allInvoices, statusFilter]);

  // Update data when filtered data changes
  useEffect(() => {
    setData(filteredInvoices);
  }, [filteredInvoices]);

  const columns: ColumnDef<TInvoice>[] = [
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
      enableHiding: true,
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
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: () => (
        <StatusFilterHeader
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      ),
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
      enableHiding: true,
    },
    {
      accessorKey: "orderNumber",
      header: () => <div className="text-start">Order Number</div>,
      size: 120,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("orderNumber")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 120,
      cell: ({ row }) => (
        <div className="truncate">${row.getValue("amount")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "tenderType",
      header: "Tender Type",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("tenderType")}</div>
      ),
      enableHiding: true,
    },
    {
      accessorKey: "date",
      header: "Date",
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("date")}</div>,
      enableHiding: true,
    },
  ];

  const actions = (row: TInvoice) => {
    return (
      <InvoiceTableRowActions
        invoice={row}
        setSelectedInvoice={setSelectedInvoice}
        setIsViewOpen={setIsViewOpen}
        setInvoiceToDelete={setInvoiceToDelete}
        setIsDeleteOpen={setIsDeleteOpen}
      />
    );
  };

  const handleFilterChange = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  const clearAllFilters = () => {
    setStatusFilter("");
    setSearchTerm("");
    setSelectedDate(null);
    setPage(1);
  };

  const formatted = format(new Date(), "EEEE, MMMM d, yyyy");

  const tableHeaderColumns = [
    { id: "id", displayName: "Invoice" },
    { id: "customerName", displayName: "Customer Name" },
    { id: "status", displayName: "Status" },
    { id: "orderNumber", displayName: "Order Number", canHide: false },
    { id: "amount", displayName: "Amount" },
    { id: "tenderType", displayName: "Tender Type" },
    { id: "date", displayName: "Date" },
  ];

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row">
        <div className="space-y-2">
          <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
          <p className="text-muted-foreground text-[20px] font-normal">
            Today is {formatted}
          </p>
        </div>
        <div className="space-y-4 space-x-4">
          <Button
            variant="primary"
            size="lg"
            className="text-lg font-normal max-sm:mx-auto"
            onClick={() => navigate("/dashboard/invoices/templates")}
          >
            <Plus />
            Create Invoices
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-base font-normal"
            onClick={() =>
              navigate("/dashboard/invoices/templates?type=estimate")
            }
          >
            <Plus />
            Create Estimate
          </Button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:pb-0">
        <TopCard
          icon={<ReactSVG src={icons.outstanding} />}
          title="Outstanding Invoices"
          value="$1,637"
          iconBgColor="bg-red-100"
          valueColor="text-red-400"
        />
        <TopCard
          icon={<ReactSVG src={icons.dolar} />}
          title="Recent Payments"
          value="$3,847"
          iconBgColor="bg-purple-100"
          valueColor="text-foreground"
        />
        <TopCard
          icon={<ReactSVG src={icons.groupuser} />}
          title="Total Customer"
          value="$2,567"
          iconBgColor="bg-yellow-50"
          valueColor="text-foreground"
        />
        <TopCard
          icon={<ReactSVG src={icons.revinue} />}
          title="Revenue this month"
          value="$4,212"
          iconBgColor="bg-green-100"
          valueColor="text-foreground"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-sidebar col-span-4 rounded-2xl py-4">
          {(statusFilter || searchTerm || selectedDate) && (
            <div className="mb-4 px-4">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-sm"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {tableRef.current?.table && (
            <DataTableFilter
              searchTerm={searchTerm}
              handleFilterChange={handleFilterChange}
              setSelectedDate={setSelectedDate}
              table={tableRef.current.table}
              columns={tableHeaderColumns}
              searchPlaceholder="Search by name, email, or company"
              showDatePicker={true}
              showExportButton={true}
              exportButtonText="Export"
              onExportClick={() => console.log("Export clicked")}
              columnVisibility={columnVisibility}
            />
          )}

          {statusFilter && (
            <div className="mb-3 px-4">
              <span className="text-muted-foreground text-sm">
                Showing {filteredInvoices.length} of {allInvoices.length}{" "}
                invoices
                {statusFilter && ` filtered by: ${statusFilter}`}
              </span>
            </div>
          )}

          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            page={page}
            limit={limit}
            total={statusFilter ? filteredInvoices.length : total}
            onPageChange={setPage}
            onLimitChange={setLimit}
            actions={actions}
            ref={tableRef}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
          />
        </div>
      </div>

      {/* View Details Modal */}
      <PdfDialogModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        className=""
        title={null}
      >
        <PreviewTemplate />
      </PdfDialogModal>

      {/* Delete Alert Dialog */}
      <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
        onConfirm={async () => {
          if (invoiceToDelete) {
            console.log("Invoice To Be Deleted:", invoiceToDelete);
            setAllInvoices((prev) =>
              prev.filter((inv) => inv.id !== invoiceToDelete),
            );
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
