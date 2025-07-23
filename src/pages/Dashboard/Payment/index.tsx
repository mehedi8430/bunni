import {
  DataTable,
  type DataTableHandle,
} from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Filter } from "lucide-react";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { useEffect, useRef, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogModal } from "@/components/DialogModal";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import PaymentDetails from "./components/PaymentDetails";
import { PaymentForm } from "./components/PaymentForm";
import { cn } from "@/lib/utils";
import { AddPaymentForm } from "./components/AddPaymentForm";
import RecurringBillingForm from "./components/RecurringBillingForm";
import VirtualTerminalForm from "./components/VirtualTerminalForm";
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

export default function PaymentPage() {
  const tableRef = useRef<DataTableHandle<Payment> | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<Payment[]>([]);
  const [allPayments, setAllPayments] = useState<Payment[]>([]); // Store all data for filtering
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(""); // Status filter state

  // Modal states
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayment, setEditPayment] = useState<Partial<Payment>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState<boolean>(false);
  const [isRecurringBillingOpen, setIsRecurringBillingOpen] =
    useState<boolean>(false);
  const [isVirtualTerminalOpen, setIsVirtualTerminalOpen] =
    useState<boolean>(false);

  // Fetch payments when page, limit, or filters change
  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const payments = await paymentApi.getPayments({
          page,
          limit,
          search: searchTerm || undefined,
          date: selectedDate || undefined,
        });
        console.log({ payments });

        setAllPayments(payments.data);
        setTotal(payments.total);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setAllPayments([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [page, limit, searchTerm, selectedDate]);

  // Client-side filtering using useMemo
  const filteredPayments = useMemo(() => {
    if (!statusFilter) return allPayments;

    return allPayments.filter(
      (payment) => payment.status?.toLowerCase() === statusFilter.toLowerCase(),
    );
  }, [allPayments, statusFilter]);

  // Update data when filtered data changes
  useEffect(() => {
    setData(filteredPayments);
  }, [filteredPayments]);

  const columns: ColumnDef<Payment>[] = [
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
      accessorKey: "invoice",
      header: () => <div className="text-start">Invoice</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("invoice")}</div>
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
      accessorKey: "date",
      header: "Date",
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("date")}</div>,
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
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("paymentMethod")}</div>
      ),
    },
  ];

  const actions = (row: Payment) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-border border p-0">
          <DropdownMenuItem
            onClick={() => {
              setSelectedPayment(row);
              setIsViewOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b py-3 text-base"
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditPayment(row);
              setIsEditOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setPaymentToDelete(row?.invoice);
              setIsDeleteOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const handleSave = (updatedPayment: Payment) => {
    setAllPayments((prev) =>
      prev.map((pay) =>
        pay.invoice === updatedPayment.invoice ? updatedPayment : pay,
      ),
    );
    if (!updatedPayment.invoice) {
      setAllPayments((prev) => [...prev, updatedPayment]);
      setTotal((prev) => prev + 1);
    }
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

  const tableHeaderColumns = [
    { id: "invoice", displayName: "Invoice", canHide: false },
    { id: "customerName", displayName: "Customer Name" },
    { id: "date", displayName: "Date" },
    { id: "amount", displayName: "Amount" },
    { id: "status", displayName: "Status" },
    { id: "paymentMethod", displayName: "Payment Method" },
  ];

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center justify-between space-y-1 lg:flex-row">
        <h1 className="text-2xl font-semibold md:text-[26px]">Payment</h1>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Button
            onClick={() => setIsRecurringBillingOpen(true)}
            variant="primary"
            className="text-base font-normal"
          >
            <Plus />
            Schedule Payment
          </Button>
          <Button
            onClick={() => setIsVirtualTerminalOpen(true)}
            variant="primary"
            className="text-base font-normal"
          >
            <Plus />
            Virtual Terminal
          </Button>
          <Button
            onClick={() => setIsAddPaymentOpen(true)}
            variant="primary"
            className="text-base font-normal"
          >
            <Plus />
            pay by link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card_container col-span-2 space-y-3 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 flex items-center justify-center rounded-full p-2">
              <ReactSVG src={assets.icons.doller_up} />
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Total payment
            </p>
          </div>
          <p className="text-xl font-bold ml-11">$ 2,567</p>
        </div>

        <div className="card_container col-span-2 space-y-3 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              <ReactSVG src={assets.icons.pending} />
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Pending payments
            </p>
          </div>
          <p className="text-xl font-bold ml-11">$ 4,212</p>
        </div>

        <div className="bg-sidebar col-span-2 rounded-2xl py-4">
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
                Showing {filteredPayments.length} of {allPayments.length}{" "}
                payments
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
            total={statusFilter ? filteredPayments.length : total}
            onPageChange={setPage}
            onLimitChange={setLimit}
            actions={actions}
            ref={tableRef}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
          />
        </div>
      </div>

      {/* Virtual Terminal Form modal */}
      <DialogModal
        title="Virtual Terminal"
        isOpen={isVirtualTerminalOpen}
        onOpenChange={setIsVirtualTerminalOpen}
        className="w-xl"
      >
        <VirtualTerminalForm
          onClose={() => setIsVirtualTerminalOpen(false)}
          onSend={(data) => console.log("Virtual Terminal Data:", data)}
        />
      </DialogModal>

      {/* Add Recurring Billing Form modal */}
      <DialogModal
        title="Set Up Recurring Billing"
        isOpen={isRecurringBillingOpen}
        onOpenChange={setIsRecurringBillingOpen}
        className="w-xl"
      >
        <RecurringBillingForm
          onClose={() => setIsRecurringBillingOpen(false)}
          onSend={(data) => console.log("Recurring Billing Data:", data)}
        />
      </DialogModal>

      {/* Add payment form modal */}
      <DialogModal
        title="Add Payment"
        isOpen={isAddPaymentOpen}
        onOpenChange={setIsAddPaymentOpen}
        className="w-xl"
      >
        <AddPaymentForm
          onClose={() => setIsAddPaymentOpen(false)}
          onSend={(data) => console.log("Send Payment:", data)}
        />
      </DialogModal>

      {/* View Details Modal */}
      <DialogModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        title="View Details"
        className="!w-md"
      >
        <PaymentDetails
          paymentInvoice={selectedPayment?.invoice || ""}
          onClose={() => setIsViewOpen(false)}
        />
      </DialogModal>

      {/* Edit Modal with PaymentForm */}
      <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editPayment.invoice ? "Edit Payment" : "Add New Payment"}
      >
        <PaymentForm
          payment={editPayment}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </DialogModal>

      {/* Delete Alert Dialog */}
      <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this payment? This action cannot be undone."
        onConfirm={async () => {
          if (paymentToDelete) {
            console.log("Payment To Be Deleted:", paymentToDelete);
            setAllPayments((prev) =>
              prev.filter((pay) => pay.invoice !== paymentToDelete),
            );
            setData((prev) =>
              prev.filter((pay) => pay.invoice !== paymentToDelete),
            );
            setTotal((prev) => prev - 1);
            setIsDeleteOpen(false);
            setPaymentToDelete(null);
          }
        }}
      />
    </section>
  );
}
