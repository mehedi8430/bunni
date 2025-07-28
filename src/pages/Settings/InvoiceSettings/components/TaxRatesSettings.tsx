import { DataTable } from "@/components/DataTable/dataTable";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { AlertDialogModal } from "@/components/AlertDialogModal";
import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TTaxRate } from "@/types";
import TaxRateTableActions from "./TaxRateTableActions";
import { DialogModal } from "@/components/DialogModal";
import TaxRateForm from "./TaxRateForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TaxRatesSettings() {
  const { t } = useTranslation("invoice_settings");

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
      header: t("Name"),
      size: 150,
      cell: ({ row }) => <div className="truncate">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "amount",
      header: t("Amount"),
      size: 100,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("amount")}</div>
      ),
    },
    {
      accessorKey: "createdDate",
      header: t("Created_Date"),
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("createdDate")}</div>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: t("Last_Login"),
      size: 150,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("lastLogin")}</div>
      ),
    },
  ];

  const actions = (row: TTaxRate) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer hover:bg-transparent"
        >
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-border border p-0">
          <DropdownMenuItem
            onClick={() => {
              setEditTaxRate(row);
              setIsEditTaxRateOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("table:Edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTaxRateToDelete(row?.id);
              setIsDeleteTaxRateOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("table:Delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
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

  const handleFilterChangeTaxRate = (search: string) => {
    setSearchTermTaxRate(search);
    setPageTaxRate(1);
  };

  return (
    <div className="bg-sidebar rounded-2xl py-4">
      <h2 className="mb-1 px-4 text-xl font-semibold">{t("Tax_Settings")}</h2>
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
        actions={actions}
      />
      {/* Dialog for editing tax rate */}
      <DialogModal
        isOpen={isEditTaxRateOpen}
        onOpenChange={setIsEditTaxRateOpen}
        title={
          editTaxRate.id
            ? "Edit Tax Rates Settings"
            : "Create Tax Rates Settings"
        }
      >
        <TaxRateForm
          taxRate={editTaxRate}
          onSave={handleSaveTaxRate}
          onClose={() => setIsEditTaxRateOpen(false)}
        />
      </DialogModal>

      {/* Delete Alert Dialog */}
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
