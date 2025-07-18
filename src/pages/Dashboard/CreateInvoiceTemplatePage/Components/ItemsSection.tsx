import type { TInvoiceData, TInvoiceItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTaxRates } from "@/mockApi/invoiceApi";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import SelectInput from "@/components/SelectInput";

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

  const addNewRow = () => {
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
              <TableHead className="border-border w-[40%] border-r-2 text-left text-sm font-normal">
                Item Details
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-center text-sm font-normal">
                Quantity
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-center text-sm font-normal">
                Price
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-center text-sm font-normal">
                Tax
              </TableHead>
              <TableHead className="border-border w-[15%] border-r-2 text-right text-sm font-normal">
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
                    <button type="button" className="h-8 w-8">
                      <ReactSVG src={assets.icons.addIcon} />
                    </button>

                    <Input
                      type="text"
                      placeholder="Type or click to select a item.."
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      className="text-muted-foreground border-0 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
                    />
                  </div>
                </TableCell>

                {/* Quantity */}
                <TableCell className="border-border border-r-2 py-2">
                  <span>10</span>
                </TableCell>

                {/* Price */}
                <TableCell className="border-border border-r-2 py-2">
                  <span>10</span>
                </TableCell>

                {/* Tax */}
                <TableCell className="border-border border-r-2 py-2">
                  <SelectInput
                    options={mockTaxRates.map((tax) => ({
                      label: tax.name,
                      value: tax.id,
                    }))}
                    onValueChange={(value) =>
                      handleItemChange(item.id, "taxId", value)
                    }
                    triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                    placeholder="Select a Tax"
                  />
                </TableCell>

                {/* Amount */}
                <TableCell className="border-border border-r-2 py-2 text-right">
                  <span>10</span>
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
          onClick={addNewRow}
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
                type="number"
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
