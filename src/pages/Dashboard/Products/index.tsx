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
import { productApi } from "@/mockApi/productApi";
import type { TProduct } from "@/types";
import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductForm from "./components/ProductForm";

export default function ProductsPage() {
  const { t } = useTranslation("table");
  const tableRef = useRef<DataTableHandle<TProduct> | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<TProduct>>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Fetch products when page, limit, or filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await productApi.getProducts({
          page,
          limit,
          search: searchTerm || undefined,
        });
        setData(products.data);
        setTotal(products.total);
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, searchTerm]);

  const columns: ColumnDef<TProduct>[] = [
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
      accessorKey: "name",
      header: () => <div className="text-start">{t("products:Name")}</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: t("products:Type"),
      size: 120,
      cell: ({ row }) => <div className="truncate">{row.getValue("type")}</div>,
    },
    {
      accessorKey: "unit",
      header: t("products:Unit"),
      size: 120,
      cell: ({ row }) => <div className="truncate">{row.getValue("unit")}</div>,
    },
    {
      accessorKey: "price",
      header: t("products:Price"),
      size: 120,
      cell: ({ row }) => (
        <div className="truncate">${row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: t("products:Description"),
      size: 250,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("description")}</div>
      ),
    },
  ];

  const actions = (row: TProduct) => {
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
              setEditProduct(row);
              setIsEditOpen(true);
            }}
            className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
          >
            {t("Edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setProductToDelete(row?.id);
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

  const handleSave = (updatedProduct: TProduct) => {
    setData((prev) =>
      prev.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod,
      ),
    );
    if (!updatedProduct.id) {
      setData((prev) => [...prev, updatedProduct]);
      setTotal((prev) => prev + 1);
    }
  };

  const handleFilterChange = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  const tableHeaderColumns = [
    { id: "name", displayName: t("products:Name") },
    { id: "type", displayName: t("products:Type") },
    { id: "unit", displayName: t("products:Unit") },
    { id: "price", displayName: t("products:Price") },
    { id: "description", displayName: t("products:Description") },
  ];

  return (
    <section className="space-y-10">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold md:text-[26px]">
          {t("products:Products")}
        </h1>
        <Button
          variant="primary"
          className="text-base font-normal"
          onClick={() => {
            setIsEditOpen(true);
            setEditProduct({});
          }}
        >
          <Plus />
          {t("products:New_Product")}
        </Button>
      </div>

      <div className="bg-sidebar rounded-2xl py-4">
        {tableRef.current?.table && (
          <DataTableFilter
            searchTerm={searchTerm}
            handleFilterChange={handleFilterChange}
            table={tableRef.current.table}
            columns={tableHeaderColumns}
            searchPlaceholder="Search by name, email, or company"
            showDatePicker={false}
            showExportButton={true}
            exportButtonText="Export"
            onExportClick={() => console.log("Export clicked")}
            columnVisibility={columnVisibility}
          />
        )}

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
          ref={tableRef}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      </div>

      {/* Edit Modal with ProductForm */}
      <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editProduct.id ? "Edit Product" : "Add New Product"}
      >
        <ProductForm
          product={editProduct}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </DialogModal>

      {/* Delete Alert Dialog */}
      <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={async () => {
          if (productToDelete) {
            console.log("Product To Be Deleted:", productToDelete);
            setData((prev) =>
              prev.filter((prod) => prod.id !== productToDelete),
            );
            setTotal((prev) => prev - 1);
            setIsDeleteOpen(false);
            setProductToDelete(null);
          }
        }}
      />
    </section>
  );
}
