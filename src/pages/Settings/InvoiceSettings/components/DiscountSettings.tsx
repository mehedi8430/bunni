import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TDiscount } from "@/types";
import { DialogModal } from "@/components/DialogModal";
import DiscountTableActions from "./DiscountTableActions";
import DiscountForm from "./DiscountForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function DiscountSettings() {
  const [pageDiscount, setPageDiscount] = useState(1);
  const [limitDiscount, setLimitDiscount] = useState(10);
  const [dataDiscount, setDataDiscount] = useState<TDiscount[]>([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isLoadingDiscount, setIsLoadingDiscount] = useState(false);
  const [searchTermDiscount, setSearchTermDiscount] = useState<string>("");
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [editDiscount, setEditDiscount] = useState<Partial<TDiscount>>({});
  const [isDeleteDiscountOpen, setIsDeleteDiscountOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      setIsLoadingDiscount(true);
      try {
        const discounts = await invoiceApi.getDiscounts({
          page: pageDiscount,
          limit: limitDiscount,
          search: searchTermDiscount || undefined,
        });
        setDataDiscount(discounts.data);
        setTotalDiscount(discounts.total);
      } catch (error) {
        console.error("Error fetching discounts:", error);
        setDataDiscount([]);
        setTotalDiscount(0);
      } finally {
        setIsLoadingDiscount(false);
      }
    };
    fetchDiscounts();
  }, [pageDiscount, limitDiscount, searchTermDiscount]);

  const discountColumns: ColumnDef<TDiscount>[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 100,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("createdDate")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("status")}</div>
      ),
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
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDiscountToDelete(row?.id);
              setIsDeleteDiscountOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const handleSaveDiscount = (updatedDiscount: TDiscount) => {
    setDataDiscount((prev) =>
      prev.map((disc) =>
        disc.id === updatedDiscount.id ? updatedDiscount : disc,
      ),
    );
    if (!updatedDiscount.id) {
      setDataDiscount((prev) => [...prev, updatedDiscount]);
      setTotalDiscount((prev) => prev + 1);
    }
  };

  const handleFilterChangeDiscount = (search: string) => {
    setSearchTermDiscount(search);
    setPageDiscount(1);
  };

  return (
    <div className="bg-sidebar rounded-2xl py-4">
      <h2 className="mb-4 px-4 text-2xl font-semibold">Discount Settings</h2>
      <DiscountTableActions
        searchTerm={searchTermDiscount}
        handleFilterChange={handleFilterChangeDiscount}
        setIsEditOpen={setIsEditDiscountOpen}
        setEditDiscount={setEditDiscount}
      />
      <DataTable
        data={dataDiscount}
        columns={discountColumns}
        isLoading={isLoadingDiscount}
        page={pageDiscount}
        limit={limitDiscount}
        total={totalDiscount}
        onPageChange={setPageDiscount}
        onLimitChange={setLimitDiscount}
        actions={actions}
      />
      <DialogModal
        isOpen={isEditDiscountOpen}
        onOpenChange={setIsEditDiscountOpen}
        title={editDiscount.id ? "Edit Discount" : "Create  Discount"}
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
