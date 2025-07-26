import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTaxRates } from "@/mockApi/invoiceApi";
import {
  addItem,
  removeItem,
  selectProduct,
  templateSelector,
  updateItem,
} from "@/redux/slices/invoiceTemplateSlice";
import { type TInvoiceItem, type TProduct } from "@/types";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import ItemSelectionField from "./ItemSelectionField";
import { useAppSelector } from "@/redux/hooks";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";

export default function ItemsSection() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { items, subtotal, total, discount } = useAppSelector(templateSelector);

  const handleItemSelect = (index: number, product: TProduct) => {
    dispatch(selectProduct({ index, product }));
  };

  const handleItemChange = (
    index: number,
    field: keyof TInvoiceItem,
    value: string | number,
  ) => {
    dispatch(updateItem({ index, field, value }));
  };

  const totalTax = items.reduce((acc, item) => acc + item.tax, 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="space-y-6">
        <div>
          <CollapsibleTrigger asChild className="cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="px-4 text-xl font-semibold">Select Item</h3>
              {isOpen ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </div>
          </CollapsibleTrigger>

          <div className="border-border mt-5 border-t" />
        </div>

        <CollapsibleContent className="space-y-6">
          <h3 className="text-lg font-normal">Item Table</h3>

          {/* Item Table */}
          <div className="border-border overflow-hidden rounded-md border-2">
            <Table className="">
              <TableHeader className="border-b-2">
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="border-border border-r-2 text-left text-sm font-normal">
                    Item Details
                  </TableHead>
                  <TableHead className="border-border border-r-2 text-center text-sm font-normal">
                    Quantity
                  </TableHead>
                  <TableHead className="border-border border-r-2 text-center text-sm font-normal">
                    Price
                  </TableHead>
                  <TableHead className="border-border border-r-2 text-center text-sm font-normal">
                    Discount (%)
                  </TableHead>
                  <TableHead className="border-border border-r-2 text-center text-sm font-normal">
                    Tax
                  </TableHead>
                  <TableHead className="border-border border-r-2 text-right text-sm font-normal">
                    Amount
                  </TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id} className="border-border border-b-2">
                    {/* Item Details */}
                    <TableCell className="border-border border-r-2 py-2">
                      <ItemSelectionField
                        itemId={item.id}
                        onItemSelect={(_, product) =>
                          handleItemSelect(index, product)
                        }
                      />
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="border-border border-r-2 py-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="custom-focus [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        min="1"
                      />
                    </TableCell>

                    {/* Price */}
                    <TableCell className="border-border border-r-2 py-2">
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="custom-focus [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        min="0"
                      />
                    </TableCell>

                    {/* Discount */}
                    <TableCell className="border-border border-r-2 py-2">
                      <div className="flex items-center justify-center">
                        <Input
                          type="number"
                          value={item.discount || ""}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            if (value >= 0 && value <= 100) {
                              handleItemChange(index, "discount", value);
                            }
                          }}
                          className="custom-focus [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          min="0"
                          max="100"
                          placeholder="0"
                        />
                      </div>
                    </TableCell>

                    {/* Tax */}
                    <TableCell className="border-border border-r-2 py-2">
                      <SelectInput
                        options={mockTaxRates.map((tax) => ({
                          label: tax.name,
                          value: tax.id,
                        }))}
                        onValueChange={(value) =>
                          handleItemChange(index, "taxId", value)
                        }
                        triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 text-sm"
                        placeholder="Select a Tax"
                        value={item.taxId}
                      />
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="border-border border-r-2 py-2 text-right">
                      <span>${item.amount.toFixed(2)}</span>
                    </TableCell>

                    {/* Delete Button */}
                    <TableCell className="py-2 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dispatch(removeItem(index))}
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
              onClick={() => dispatch(addItem())}
              type="button"
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
            <div className="flex justify-between">
              <span className="text-lg font-normal">Total Discount:</span>
              <span className="text-[16px] font-normal">
                ${discount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-normal">Total Tax:</span>
              <span className="text-[16px] font-normal">
                ${totalTax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-[16px] font-normal">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <hr className="border-border border" />

          {/* Button Section */}
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              size={"lg"}
              className="bg-sidebar"
              type="button"
              onClick={() =>
                console.log("Form Submitted:", { items, subtotal, total })
              }
            >
              Save
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"primary"} size={"lg"} type="button">
                  Send Via
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="border-border border p-0"
                side="right"
              >
                <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent">
                  SMS
                </DropdownMenuItem>
                <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent">
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent">
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
