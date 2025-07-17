import type { TInvoiceData, TInvoiceItem } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTaxRates } from "@/mockApi/invoiceApi";

export default function ItemsSection({
  invoiceData,
  setInvoiceData,
}: {
  invoiceData: TInvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<TInvoiceData>>;
}) {
  const handleItemChange = (
    itemId: string,
    field: keyof TInvoiceItem,
    value: string | number,
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeItem = (itemId: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const addNewItem = () => {
    const newItem: TInvoiceItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      price: 0,
      tax: 0,
      taxId: mockTaxRates[0]?.id || "",
      amount: 0,
    };

    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const calculateTotal = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const total = subtotal - invoiceData.discount;
    return { subtotal, total };
  };

  const handleInputChange = (
    field: keyof TInvoiceData,
    value: string | number,
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { subtotal, total } = calculateTotal();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="px-4 text-2xl font-semibold">Select Item</h3>
        <div className="border-border mt-5 border-t" />
      </div>

      <h3 className="font-noramal text-lg">Item Table</h3>

      {/* Item Table */}
      <div className="border-border overflow-hidden rounded-md border-2">
        <Table>
          <TableHeader className="border-b-2">
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="border-border w-[40%] border-r-2 text-left">
                Item Details
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-center">
                Quantity
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-center">
                Price
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-center">
                Tax
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-right">
                Amount
              </TableHead>
              <TableHead className="w-[5%] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceData.items.map((item) => (
              <TableRow key={item.id} className="border-border border-b-2">
                {/* Item Details */}
                <TableCell className="border-border border-r-2 py-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Type or click to select a..."
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      className="flex-grow rounded-md border px-2 py-1"
                    />
                  </div>
                </TableCell>

                {/* Quantity */}
                <TableCell className="border-border border-r-2 py-2">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "quantity",
                        Number(e.target.value),
                      )
                    }
                    className="w-full rounded-md border px-2 py-1 text-center"
                    min="0"
                  />
                </TableCell>

                {/* Price */}
                <TableCell className="border-border border-r-2 py-2">
                  <Input
                    type="number"
                    value={item.price.toFixed(2)}
                    onChange={(e) =>
                      handleItemChange(item.id, "price", Number(e.target.value))
                    }
                    className="w-full rounded-md border px-2 py-1 text-center"
                    min="0"
                  />
                </TableCell>

                {/* Tax */}
                <TableCell className="border-border border-r-2 py-2">
                  <Select
                    value={item.taxId}
                    onValueChange={(value) =>
                      handleItemChange(item.id, "taxId", value)
                    }
                  >
                    <SelectTrigger className="w-full rounded-md border px-2 py-1 text-center">
                      <SelectValue placeholder="Select a Tax" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTaxRates.map((tax) => (
                        <SelectItem key={tax.id} value={tax.id}>
                          {tax.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Amount */}
                <TableCell className="border-border border-r-2 py-2 text-right">
                  <Input
                    type="number"
                    value={item.amount.toFixed(2)}
                    readOnly
                    className="w-full rounded-md border bg-gray-50 px-2 py-1 text-right dark:bg-gray-700"
                  />
                </TableCell>

                {/* Delete Button */}
                <TableCell className="py-2 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="size-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center">
        <Button
          variant="link"
          className="text-muted-foreground text-sm"
          onClick={addNewItem}
        >
          <Plus /> Add New Row
        </Button>
      </div>

      {/* Totals Section */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-normal">Subtotal:</span>
          <span className="text-[16px] font-normal">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-normal">Discount:</span>
          <div className="flex justify-between gap-4">
            <div className="border-border flex w-full items-center rounded-md border">
              <Input
                type="text"
                value={invoiceData.discount.toFixed(2)}
                onChange={(e) =>
                  handleInputChange("discount", Number(e.target.value))
                }
                className="text-muted-foreground border-0 p-5 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
                min="0"
              />
              <span className="border-border border-l px-4 py-2">%</span>
            </div>
            <span className="text-muted-foreground self-end text-[16px] font-normal">
              0.00
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-[16px] font-normal">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
