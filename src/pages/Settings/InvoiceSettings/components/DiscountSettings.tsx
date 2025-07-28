import { AlertDialogModal } from "@/components/AlertDialogModal";
import { DataTable } from "@/components/DataTable/dataTable";
import { DialogModal } from "@/components/DialogModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TDiscount } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Filter, MoreHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DiscountForm from "./DiscountForm";
import DiscountTableActions from "./DiscountTableActions";

// Custom header component for status filtering
const StatusFilterHeader = ({
  statusFilter,
  onStatusFilterChange,
}: {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}) => {
  const { t } = useTranslation(["table"]);

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
            onClick={() => onStatusFilterChange("active")}
            className={`cursor-pointer ${statusFilter === "active" ? "bg-accent" : ""}`}
          >
            {t("invoice_settings:Active")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("inactive")}
            className={`cursor-pointer ${statusFilter === "inactive" ? "bg-accent" : ""}`}
          >
            {t("invoice_settings:Inactive")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default function DiscountSettings() {
  const { t } = useTranslation("table");
  const [pageDiscount, setPageDiscount] = useState(1);
  const [limitDiscount, setLimitDiscount] = useState(10);
  const [dataDiscount, setDataDiscount] = useState<TDiscount[]>([]);
  const [allDiscounts, setAllDiscounts] = useState<TDiscount[]>([]); // Store all data for filtering
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isLoadingDiscount, setIsLoadingDiscount] = useState(false);
  const [searchTermDiscount, setSearchTermDiscount] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(""); // Status filter state
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [editDiscount, setEditDiscount] = useState<Partial<TDiscount>>({});
  const [isDeleteDiscountOpen, setIsDeleteDiscountOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      setIsLoadingDiscount(true);
      try {
        // Fetch all data without status filtering from API
        const discounts = await invoiceApi.getDiscounts({
          page: pageDiscount,
          limit: limitDiscount,
          search: searchTermDiscount || undefined,
        });
        setAllDiscounts(discounts.data);
        setTotalDiscount(discounts.total);
      } catch (error) {
        console.error("Error fetching discounts:", error);
        setAllDiscounts([]);
        setTotalDiscount(0);
      } finally {
        setIsLoadingDiscount(false);
      }
    };
    fetchDiscounts();
  }, [pageDiscount, limitDiscount, searchTermDiscount]);

  // Client-side filtering using useMemo
  const filteredDiscounts = useMemo(() => {
    if (!statusFilter) return allDiscounts;

    return allDiscounts.filter(
      (discount) =>
        discount.status?.toLowerCase() === statusFilter.toLowerCase(),
    );
  }, [allDiscounts, statusFilter]);

  // Update dataDiscount when filtered data changes
  useEffect(() => {
    setDataDiscount(filteredDiscounts);
  }, [filteredDiscounts]);

  const discountColumns: ColumnDef<TDiscount>[] = [
    {
      accessorKey: "name",
      header: t("invoice_settings:Name"),
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "amount",
      header: t("invoice_settings:Amount"),
      size: 100,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "createdDate",
      header: t("invoice_settings:Created_Date"),
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("createdDate")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <StatusFilterHeader
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
        />
      ),
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="truncate">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                status?.toLowerCase() === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
  ];

  const actions = (row: TDiscount) => {
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
              setEditDiscount(row);
              setIsEditDiscountOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("Edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDiscountToDelete(row?.id);
              setIsDeleteDiscountOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("Delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const handleSaveDiscount = (updatedDiscount: TDiscount) => {
    // Update both allDiscounts and dataDiscount
    setAllDiscounts((prev) =>
      prev.map((disc) =>
        disc.id === updatedDiscount.id ? updatedDiscount : disc,
      ),
    );

    if (!updatedDiscount.id) {
      setAllDiscounts((prev) => [...prev, updatedDiscount]);
      setTotalDiscount((prev) => prev + 1);
    }
  };

  const handleFilterChangeDiscount = (search: string) => {
    setSearchTermDiscount(search);
    setPageDiscount(1);
  };

  // Status filter handler
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setPageDiscount(1); // Reset pagination when filter changes
  };

  // Clear all filters function (optional)
  const clearAllFilters = () => {
    setStatusFilter("");
    setSearchTermDiscount("");
    setPageDiscount(1);
  };

  return (
    <div className="bg-sidebar rounded-2xl py-4">
      <div className="mb-1 flex items-center justify-between px-4">
        <h2 className="text-xl font-semibold">
          {t("invoice_settings:Discount_Settings")}
        </h2>
        {(statusFilter || searchTermDiscount) && (
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="text-sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      <DiscountTableActions
        searchTerm={searchTermDiscount}
        handleFilterChange={handleFilterChangeDiscount}
        setIsEditOpen={setIsEditDiscountOpen}
        setEditDiscount={setEditDiscount}
      />

      {statusFilter && (
        <div className="mb-3 px-4">
          <span className="text-muted-foreground text-sm">
            Showing {filteredDiscounts.length} of {allDiscounts.length}{" "}
            discounts
            {statusFilter && ` filtered by: ${statusFilter}`}
          </span>
        </div>
      )}

      <DataTable
        data={dataDiscount}
        columns={discountColumns}
        isLoading={isLoadingDiscount}
        page={pageDiscount}
        limit={limitDiscount}
        total={statusFilter ? filteredDiscounts.length : totalDiscount}
        onPageChange={setPageDiscount}
        onLimitChange={setLimitDiscount}
        actions={actions}
      />

      <DialogModal
        isOpen={isEditDiscountOpen}
        onOpenChange={setIsEditDiscountOpen}
        title={
          editDiscount.id
            ? t("create_discount_modal:editDiscount")
            : t("create_discount_modal:createDiscount")
        }
      >
        <DiscountForm
          discount={editDiscount}
          onSave={handleSaveDiscount}
          onClose={() => setIsEditDiscountOpen(false)}
        />
      </DialogModal>

      <AlertDialogModal
        isOpen={isDeleteDiscountOpen}
        onOpenChange={setIsDeleteDiscountOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this discount? This action cannot be undone."
        onConfirm={async () => {
          if (discountToDelete) {
            console.log("Discount To Be Deleted:", discountToDelete);
            // Update both data sources
            setAllDiscounts((prev) =>
              prev.filter((disc) => disc.id !== discountToDelete),
            );
            setDataDiscount((prev) =>
              prev.filter((disc) => disc.id !== discountToDelete),
            );
            setTotalDiscount((prev) => prev - 1);
            setIsDeleteDiscountOpen(false);
            setDiscountToDelete(null);
          }
        }}
      />
    </div>
  );
}
