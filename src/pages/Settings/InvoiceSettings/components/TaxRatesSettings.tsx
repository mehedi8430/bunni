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
import type { TTaxRate } from "@/types";
import TaxRateTableActions from "./TaxRateTableActions";
import { DialogModal } from "@/components/DialogModal";
import TaxRateForm from "./TaxRateForm";

export default function TaxRatesSettings() {
  const [pageTaxRate, setPageTaxRate] = useState(1);
  const [limitTaxRate, setLimitTaxRate] = useState(10);
  const [dataTaxRate, setDataTaxRate] = useState<TTaxRate[]>([]);
  const [totalTaxRate, setTotalTaxRate] = useState(0);
  const [isLoadingTaxRate, setIsLoadingTaxRate] = useState(false);
  const [searchTermTaxRate, setSearchTermTaxRate] = useState<string>("");
  const [isEditTaxRateOpen, setIsEditTaxRateOpen] = useState(false);
  const [editTaxRate, setEditTaxRate] = useState<Partial<TTaxRate>>({});
  const [isDeleteTaxRateOpen, setIsDeleteTaxRateOpen] = useState(false);
  const [taxRateToDelete, setTaxRateToDelete] = useState<string | null>(null);

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

  const handleSaveTaxRate = (updatedTaxRate: TTaxRate) => {
    setDataTaxRate((prev) =>
      prev.map((tax) => (tax.id === updatedTaxRate.id ? updatedTaxRate : tax)),
    );
    if (!updatedTaxRate.id) {
      setDataTaxRate((prev) => [...prev, updatedTaxRate]);
      setTotalTaxRate((prev) => prev + 1);
    }
  };

  const handleFilterChangeTaxRate = (search: string) => {
    setSearchTermTaxRate(search);
    setPageTaxRate(1);
  };

  return (
    <div className="bg-sidebar rounded-2xl py-4">
      <h2 className="mb-4 px-4 text-2xl font-semibold">Tax Rates Settings</h2>
      <TaxRateTableActions
        searchTerm={searchTermTaxRate}
        handleFilterChange={handleFilterChangeTaxRate}
        setIsEditOpen={setIsEditTaxRateOpen}
        setEditProduct={setEditTaxRate}
      />
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
      <DialogModal
        isOpen={isEditTaxRateOpen}
        onOpenChange={setIsEditTaxRateOpen}
        title={editTaxRate.id ? "Edit Tax Rate" : "Add New Tax Rate"}
      >
        <TaxRateForm
          taxRate={editTaxRate}
          onSave={handleSaveTaxRate}
          onClose={() => setIsEditTaxRateOpen(false)}
        />
      </DialogModal>
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
    </div>
  );
}
