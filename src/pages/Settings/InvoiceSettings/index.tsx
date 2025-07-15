import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TDiscount, TTaxRate } from "@/types";
import { DialogModal } from "@/components/DialogModal";

export default function InvoiceSettingsPage() {
  const [pageDiscount, setPageDiscount] = useState(1);
  const [limitDiscount, setLimitDiscount] = useState(10);
  const [dataDiscount, setDataDiscount] = useState<TDiscount[]>([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isLoadingDiscount, setIsLoadingDiscount] = useState(false);
  const [searchTermDiscount, setSearchTermDiscount] = useState<string>("");

  const [pageTaxRate, setPageTaxRate] = useState(1);
  const [limitTaxRate, setLimitTaxRate] = useState(10);
  const [dataTaxRate, setDataTaxRate] = useState<TTaxRate[]>([]);
  const [totalTaxRate, setTotalTaxRate] = useState(0);
  const [isLoadingTaxRate, setIsLoadingTaxRate] = useState(false);
  const [searchTermTaxRate, setSearchTermTaxRate] = useState<string>("");

  // Modal states for Discount
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false);
  const [editDiscount, setEditDiscount] = useState<Partial<TDiscount>>({});
  const [isDeleteDiscountOpen, setIsDeleteDiscountOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<string | null>(null);

  // Modal states for Tax Rate
  const [isEditTaxRateOpen, setIsEditTaxRateOpen] = useState(false);
  const [editTaxRate, setEditTaxRate] = useState<Partial<TTaxRate>>({});
  const [isDeleteTaxRateOpen, setIsDeleteTaxRateOpen] = useState(false);
  const [taxRateToDelete, setTaxRateToDelete] = useState<string | null>(null);

  // Fetch discounts
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

  // Fetch tax rates
  useEffect(() => {
    const fetchTaxRates = async () => {
      setIsLoadingTaxRate(true);
      try {
        const taxRates = await invoiceApi.getTaxRates({
          page: pageTaxRate,
          limit: limitTaxRate,
          search: searchTermTaxRate || undefined,
        });
        setDataTaxRate(taxRates.data);
        setTotalTaxRate(taxRates.total);
      } catch (error) {
        console.error("Error fetching tax rates:", error);
        setDataTaxRate([]);
        setTotalTaxRate(0);
      } finally {
        setIsLoadingTaxRate(false);
      }
    };
    fetchTaxRates();
  }, [pageTaxRate, limitTaxRate, searchTermTaxRate]);

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
    {
      id: "actions",
      header: "Action",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const discount = row.original;
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
                  setEditDiscount(discount);
                  setIsEditDiscountOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDiscountToDelete(discount.id);
                  setIsDeleteDiscountOpen(true);
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

  const taxRateColumns: ColumnDef<TTaxRate>[] = [
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
      accessorKey: "lastLogin",
      header: "Last Login",
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("lastLogin")}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const taxRate = row.original;
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
                  setEditTaxRate(taxRate);
                  setIsEditTaxRateOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTaxRateToDelete(taxRate.id);
                  setIsDeleteTaxRateOpen(true);
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

  const handleSaveTaxRate = (updatedTaxRate: TTaxRate) => {
    setDataTaxRate((prev) =>
      prev.map((tax) => (tax.id === updatedTaxRate.id ? updatedTaxRate : tax)),
    );
    if (!updatedTaxRate.id) {
      setDataTaxRate((prev) => [...prev, updatedTaxRate]);
      setTotalTaxRate((prev) => prev + 1);
    }
  };

  const handleFilterChangeDiscount = (search: string) => {
    setSearchTermDiscount(search);
    setPageDiscount(1);
  };

  const handleFilterChangeTaxRate = (search: string) => {
    setSearchTermTaxRate(search);
    setPageTaxRate(1);
  };

  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[32px]">
        Invoice Settings
      </h1>

      <div className="bg-sidebar rounded-2xl py-4">
        <h2 className="mb-4 px-4 text-2xl font-semibold">Discount Settings</h2>
        {/* <DiscountTableActions
          searchTerm={searchTermDiscount}
          handleFilterChange={handleFilterChangeDiscount}
          setIsEditOpen={setIsEditDiscountOpen}
          setEditProduct={setEditDiscount}
        /> */}
        <DataTable
          data={dataDiscount}
          columns={discountColumns}
          isLoading={isLoadingDiscount}
          page={pageDiscount}
          limit={limitDiscount}
          total={totalDiscount}
          onPageChange={setPageDiscount}
          onLimitChange={setLimitDiscount}
          actions={true}
        />
      </div>

      <div className="bg-sidebar rounded-2xl py-4">
        <h2 className="mb-4 px-4 text-2xl font-semibold">Tax Rates Settings</h2>
        {/* <TaxRateTableActions
          searchTerm={searchTermTaxRate}
          handleFilterChange={handleFilterChangeTaxRate}
          setIsEditOpen={setIsEditTaxRateOpen}
          setEditProduct={setEditTaxRate}
        /> */}
        <DataTable
          data={dataTaxRate}
          columns={taxRateColumns}
          isLoading={isLoadingTaxRate}
          page={pageTaxRate}
          limit={limitTaxRate}
          total={totalTaxRate}
          onPageChange={setPageTaxRate}
          onLimitChange={setLimitTaxRate}
          actions={true}
        />
      </div>

      {/* Edit Modal for Discount */}
      {/* <DialogModal
        isOpen={isEditDiscountOpen}
        onOpenChange={setIsEditDiscountOpen}
        title={editDiscount.id ? "Edit Discount" : "Add New Discount"}
      >
        <DiscountForm
          discount={editDiscount}
          onSave={handleSaveDiscount}
          onClose={() => setIsEditDiscountOpen(false)}
        />
      </DialogModal> */}

      {/* Delete Alert Dialog for Discount */}
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

      {/* Edit Modal for Tax Rate */}
      {/* <DialogModal
        isOpen={isEditTaxRateOpen}
        onOpenChange={setIsEditTaxRateOpen}
        title={editTaxRate.id ? "Edit Tax Rate" : "Add New Tax Rate"}
      >
        <TaxRateForm
          taxRate={editTaxRate}
          onSave={handleSaveTaxRate}
          onClose={() => setIsEditTaxRateOpen(false)}
        />
      </DialogModal> */}

      {/* Delete Alert Dialog for Tax Rate */}
      <AlertDialogModal
        isOpen={isDeleteTaxRateOpen}
        onOpenChange={setIsDeleteTaxRateOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this tax rate? This action cannot be undone."
        onConfirm={async () => {
          if (taxRateToDelete) {
            console.log("Tax Rate To Be Deleted:", taxRateToDelete);
            setDataTaxRate((prev) =>
              prev.filter((tax) => tax.id !== taxRateToDelete),
            );
            setTotalTaxRate((prev) => prev - 1);
            setIsDeleteTaxRateOpen(false);
            setTaxRateToDelete(null);
          }
        }}
      />
    </section>
  );
}
