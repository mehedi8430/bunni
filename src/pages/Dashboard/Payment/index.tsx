import { AlertDialogModal } from "@/components/AlertDialogModal";
import {
  DataTable,
  type DataTableHandle,
} from "@/components/DataTable/dataTable";
import { DataTableFilter } from "@/components/DataTable/dataTableFilter";
import { DialogModal } from "@/components/DialogModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import assets from "@/lib/imageProvider";
import { cn } from "@/lib/utils";
import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { Filter, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { AddPaymentForm } from "./components/AddPaymentForm";
import PaymentDetails from "./components/PaymentDetails";
import { PaymentForm } from "./components/PaymentForm";
import RecurringBillingForm from "./components/RecurringBillingForm";
import VirtualTerminalForm from "./components/VirtualTerminalForm";

// Custom header component for status filtering
const StatusFilterHeader = ({
  statusFilter,
  onStatusFilterChange,
}: {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}) => {
  const { t } = useTranslation("table");
  return (
    <div className="flex items-center justify-center gap-2">
      <span>{t("Status")}</span>
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
            {t("All Status")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("Paid")}
            className={`cursor-pointer ${statusFilter === "Paid" ? "bg-accent" : ""}`}
          >
            {t("Paid")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("Unpaid")}
            className={`cursor-pointer ${statusFilter === "Unpaid" ? "bg-accent" : ""}`}
          >
            {t("Unpaid")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("Save")}
            className={`cursor-pointer ${statusFilter === "Save" ? "bg-accent" : ""}`}
          >
            {t("Save")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default function PaymentPage() {
  const { t } = useTranslation("table");
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
      header: () => <div className="text-start">{t("Transaction Number")}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="cursor-pointer truncate text-start">
          {row.getValue("invoice")}
        </div>
      ),
    },
    {
      accessorKey: "customerName",
      header: () => <div className="text-start">{t("Customer Name")}</div>,
      size: 220,
      cell: ({ row }) => (
        <div className="truncate text-start">
          {row.getValue("customerName")}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: t("Date"),
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("date")}</div>,
    },
    {
      accessorKey: "amount",
      header: t("Amount"),
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
      header: t("Payment Method"),
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
          <Button
            variant="ghost"
            className="h-8 w-8 cursor-pointer p-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
          >
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
            {t("View")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditPayment(row);
              setIsEditOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("Edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setPaymentToDelete(row?.invoice);
              setIsDeleteOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("Delete")}
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
    { id: "invoice", displayName: t("Invoice"), canHide: false },
    { id: "customerName", displayName: t("Customer Name"), canHide: false },
    { id: "date", displayName: t("Date"), canHide: false },
    { id: "amount", displayName: t("Amount"), canHide: false },
    { id: "status", displayName: t("Status"), canHide: false },
    { id: "paymentMethod", displayName: t("Payment Method"), canHide: false },
  ];

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-center justify-between space-y-1 lg:flex-row">
        <h1 className="text-2xl font-semibold md:text-[26px]">
          {t("Payment")}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Button
            onClick={() => setIsRecurringBillingOpen(true)}
            variant="primary"
            className="text-base font-normal"
          >
            <Plus />
            {t("Schedule Payment")}
          </Button>
          <Button
            onClick={() => setIsVirtualTerminalOpen(true)}
            variant="primary"
            className="text-base font-normal"
          >
            <Plus />
            {t("Virtual Terminal")}
          </Button>
          <Button
            onClick={() => setIsAddPaymentOpen(true)}
            variant="primary"
            className="text-base font-normal"
          >
            <Plus />
            {t("Pay by Link")}
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
              {t("Total Payment")}
            </p>
          </div>
          <p className="ml-11 text-xl font-bold">$ 2,567</p>
        </div>

        <div className="card_container col-span-2 space-y-3 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              <ReactSVG src={assets.icons.pending} />
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              {t("Pending Payments")}
            </p>
          </div>
          <p className="ml-11 text-xl font-bold">$ 4,212</p>
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
              searchPlaceholder={t("search-placeholder")}
              showDatePicker={true}
              showExportButton={true}
              exportButtonText={t("Export")}
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
        title="Payment Schedule"
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
        title={t("Confirm Delete")}
        description={t("Delete Confirmation")}
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
