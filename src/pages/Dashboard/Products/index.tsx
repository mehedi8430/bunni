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
import { productApi } from "@/mockApi/productApi";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";
import { ProductTableActions } from "./components/ProductTableActions";
import type { TProduct } from "@/types";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
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
      header: () => <div className="text-start">Name</div>,
      size: 150,
      cell: ({ row }) => (
        <div className="truncate text-start">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      size: 120,
      cell: ({ row }) => <div className="truncate">{row.getValue("type")}</div>,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      size: 120,
      cell: ({ row }) => <div className="truncate">{row.getValue("unit")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 120,
      cell: ({ row }) => (
        <div className="truncate">${row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 250,
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("description")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      size: 100,
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
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
                  setSelectedProduct(product);
                  setIsViewOpen(true);
                }}
              >
                <Eye className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditProduct(product);
                  setIsEditOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setProductToDelete(product.id);
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

  return (
    <section className="space-y-10">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold md:text-[32px]">Products</h1>
        <Button
          variant="primary"
          size="lg"
          className="text-lg font-normal"
          onClick={() => {
            setIsEditOpen(true);
            setEditProduct({});
          }}
        >
          <Plus />
          New Product
        </Button>
      </div>

      <div className="bg-sidebar rounded-2xl py-4">
        <ProductTableActions
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

      {/* View Details Modal */}
      <DialogModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        title="View Details"
        onCancel={() => setIsViewOpen(false)}
      >
        <ProductDetails productId={selectedProduct?.id || ""} />
      </DialogModal>

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
