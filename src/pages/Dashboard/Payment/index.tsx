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
import { PaymentTableActions } from "./components/PaymentTableActions";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import PaymentDetails from "./components/PaymentDetails";
import { PaymentForm } from "./components/PaymentForm";
import { cn } from "@/lib/utils";
import { AddPaymentForm } from "./components/AddPaymentForm";

export default function PaymentPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal states
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayment, setEditPayment] = useState<Partial<Payment>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState<boolean>(false);


  // Fetch payments when page, limit, or filters change
  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const payments = await paymentApi.getPayments({
          page,
          limit,
          search: searchTerm || undefined,
        });
        console.log({ payments });

        setData(payments.data);
        setTotal(payments.total);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [page, limit, searchTerm]);


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
      accessorKey: "paymentMethod",
      header: "Payment Method",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("paymentMethod")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
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
                  setSelectedPayment(payment);
                  setIsViewOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditPayment(payment);
                  setIsEditOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setPaymentToDelete(payment.invoice);
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

  const handleSave = (updatedPayment: Payment) => {
    setData((prev) =>
      prev.map((pay) =>
        pay.invoice === updatedPayment.invoice ? updatedPayment : pay,
      ),
    );
    if (!updatedPayment.invoice) {
      setData((prev) => [...prev, updatedPayment]);
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
        <h1 className="text-2xl font-semibold md:text-[32px]">Payment</h1>
        <div className="flex items-center gap-6">
          <Button variant="primary" size="lg" className="text-lg font-normal">
            <Plus />
            Recurring Billing
          </Button>
          <Button variant="primary" size="lg" className="text-lg font-normal">
            <Plus />
            Virtual Terminal
          </Button>
          <Button onClick={() => setIsAddPaymentOpen(true)} variant="primary" size="lg" className="text-lg font-normal">
            <Plus />
            pay by link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card_container col-span-2 space-y-5 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 flex items-center justify-center rounded-full p-2">
              <ReactSVG src={assets.icons.doller_up} />
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Total payment
            </p>
          </div>
          <p className="text-2xl font-bold">$ 2,567</p>
        </div>

        <div className="card_container col-span-2 space-y-5 xl:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-[#FFF8DF] p-2">
              <ReactSVG src={assets.icons.pending} />
            </div>
            <p className="text-muted-foreground text-[16px] font-normal">
              Pending payments
            </p>
          </div>
          <p className="text-2xl font-bold">$ 4,212</p>
        </div>

        <div className="bg-sidebar col-span-2 rounded-2xl py-4">
          <PaymentTableActions
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

      {/* Add payment modal */}
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
        
      >
        <PaymentDetails paymentInvoice={selectedPayment?.invoice || ""} />
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
            // Prepare for future API call if implemented
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
