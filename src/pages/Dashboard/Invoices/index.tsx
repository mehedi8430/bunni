import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
import { InvoiceTableActions } from "./components/InvoiceTableActions";
import InvoiceTableRowActions from "./components/InvoiceTableRowActions";
import TopCard from "./components/TopCard";
import LoadingAnimation from "@/components/shared/LoadingAnimation";

export default function InvoicesPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TInvoice[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const formatted = format(new Date(), "EEEE, MMMM d, yyyy");

  if (isLoading)
    return (
      <div>
        <LoadingAnimation />
      </div>
    );

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row">
        <div className="space-y-2">
          <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
          <p className="text-muted-foreground text-[20px] font-normal">
            Today is {formatted}
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="text-lg font-normal max-sm:mx-auto"
          onClick={() => navigate("/dashboard/invoices/templates")}
        >
          <Plus />
          Create Invoices
        </Button>
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
            actions={actions}
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
        {/* <BlobProvider document={<InvoiceTemplate />}>
          {({ blob, url, loading, error }) => {
            if (loading) return <div>Loading PDF...</div>;
            if (error) return <div>Error: {error.message}</div>;
            return (
              <div>
                {url && (
                  <iframe
                    src={url}
                    title="Invoice Preview"
                    width="100%"
                    height="600px"
                    style={{ border: "none" }}
                  />
                )}
                <div className="mt-4">
                  {blob && (
                    <a
                      href={url}
                      download="invoice.pdf"
                      className="text-blue-600 underline"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            );
          }}
        </BlobProvider> */}

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
