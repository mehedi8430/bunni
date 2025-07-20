import type { TInvoiceData, TInvoiceItem, TProduct } from "@/types";
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
import SelectInput from "@/components/SelectInput";
import ItemSelectionField from "./ItemSelectionField";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type Control,
  useFieldArray,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

interface ItemsSectionProps {
  control: Control<TInvoiceData>;
  setValue: UseFormSetValue<TInvoiceData>;
  watch: UseFormWatch<TInvoiceData>;
}

export default function ItemsSection({
  control,
  setValue,
  watch,
}: ItemsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addNewItem = () => {
    append({
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      price: 0,
      tax: 0,
      taxId: mockTaxRates[0]?.id || "",
      amount: 0,
      discount: 0,
    });
  };

  const handleItemSelect = (index: number, product: TProduct) => {
    setValue(`items.${index}.description`, product.name);
    setValue(`items.${index}.price`, product.price);
    calculateAmount(index);
  };

  const handleItemChange = (
    index: number,
    field: keyof TInvoiceItem,
    value: string | number,
  ) => {
    setValue(`items.${index}.${field}`, value);
    if (
      field === "quantity" ||
      field === "price" ||
      field === "discount" ||
      field === "taxId"
    ) {
      calculateAmount(index);
    }
  };

  const calculateAmount = (index: number) => {
    const item = watch(`items.${index}`);
    const baseAmount = item.quantity * item.price;
    const discountAmount = baseAmount * (item.discount / 100);
    const discountedAmount = baseAmount - discountAmount;

    // Calculate tax
    const selectedTax = mockTaxRates.find((tax) => tax.id === item.taxId);
    let taxAmount = 0;
    if (selectedTax) {
      if (selectedTax.rate === "Percentage") {
        const percentage = parseFloat(selectedTax.amount.replace("%", "")) || 0;
        taxAmount = (discountedAmount * percentage) / 100;
      } else if (selectedTax.rate === "Fixed Amount") {
        taxAmount = parseFloat(selectedTax.amount.replace("$", "")) || 0;
      }
    }

    setValue(`items.${index}.tax`, taxAmount);
    const finalAmount = discountedAmount + taxAmount;
    setValue(`items.${index}.amount`, finalAmount);
    calculateTotals();
  };

  const calculateTotals = () => {
    const items = watch("items");
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    setValue("subtotal", subtotal);
    setValue("total", subtotal);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="px-4 text-2xl font-semibold">Select Item</h3>
        <div className="border-border mt-5 border-t" />
      </div>

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
            {fields.map((item, index) => (
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
                    value={watch(`items.${index}.quantity`)}
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
                    value={watch(`items.${index}.price`)}
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
                      value={watch(`items.${index}.discount`) || ""}
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
                  />
                </TableCell>

                {/* Amount */}
                <TableCell className="border-border border-r-2 py-2 text-right">
                  <span>${watch(`items.${index}.amount`).toFixed(2)}</span>
                </TableCell>

                {/* Delete Button */}
                <TableCell className="py-2 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      remove(index);
                      calculateTotals();
                    }}
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
            ${watch("subtotal").toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-normal">Total Discount:</span>
          <span className="text-[16px] font-normal">0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-normal">Total Tax:</span>
          <span className="text-[16px] font-normal">0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-[16px] font-normal">
            ${watch("total").toFixed(2)}
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
          type="submit"
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
    </div>
  );
}

// import type { TInvoiceData, TInvoiceItem } from "@/types";
// import type { TProduct } from "@/types";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Plus, X } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { mockTaxRates } from "@/mockApi/invoiceApi";
// import SelectInput from "@/components/SelectInput";
// import ItemSelectionField from "./ItemSelectionField";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   type Control,
//   useFieldArray,
//   type UseFormSetValue,
//   type UseFormWatch,
// } from "react-hook-form";

// interface ItemsSectionProps {
//   control: Control<TInvoiceData>;
//   setValue: UseFormSetValue<TInvoiceData>;
//   watch: UseFormWatch<TInvoiceData>;
// }

// export default function ItemsSection({
//   control,
//   setValue,
//   watch,
// }: ItemsSectionProps) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "items",
//   });

//   const addNewItem = () => {
//     append({
//       id: crypto.randomUUID(),
//       description: "",
//       quantity: 1,
//       price: 0,
//       tax: 0,
//       taxId: mockTaxRates[0]?.id || "",
//       amount: 0,
//     });
//   };

//   const handleItemSelect = (index: number, product: TProduct) => {
//     setValue(`items.${index}.description`, product.name);
//     setValue(`items.${index}.price`, product.price);
//     calculateAmount(index);
//   };

//   const handleItemChange = (
//     index: number,
//     field: keyof TInvoiceItem,
//     value: string | number,
//   ) => {
//     setValue(`items.${index}.${field}`, value);
//     if (field === "quantity" || field === "price") {
//       calculateAmount(index);
//     }
//   };

//   const calculateAmount = (index: number) => {
//     const item = watch(`items.${index}`);
//     const amount = item.quantity * item.price;
//     setValue(`items.${index}.amount`, amount);
//     calculateTotals();
//   };

//   const calculateTotals = () => {
//     const items = watch("items");
//     const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
//     const total = subtotal - (watch("discount") || 0);
//     setValue("subtotal", subtotal);
//     setValue("total", total);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="px-4 text-2xl font-semibold">Select Item</h3>
//         <div className="border-border mt-5 border-t" />
//       </div>

//       <h3 className="text-lg font-normal">Item Table</h3>

//       {/* Item Table */}
//       <div className="border-border overflow-hidden rounded-md border-2">
//         <Table>
//           <TableHeader className="border-b-2">
//             <TableRow className="bg-gray-50 dark:bg-gray-800">
//               <TableHead className="border-border w-[40%] border-r-2 text-left text-sm font-normal">
//                 Item Details
//               </TableHead>
//               <TableHead className="border-border w-[15%] border-r-2 text-center text-sm font-normal">
//                 Quantity
//               </TableHead>
//               <TableHead className="border-border w-[15%] border-r-2 text-center text-sm font-normal">
//                 Price
//               </TableHead>
//               <TableHead className="border-border w-[15%] border-r-2 text-center text-sm font-normal">
//                 Tax
//               </TableHead>
//               <TableHead className="border-border w-[15%] border-r-2 text-right text-sm font-normal">
//                 Amount
//               </TableHead>
//               <TableHead className="w-[5%] text-right"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {fields.map((item, index) => (
//               <TableRow key={item.id} className="border-border border-b-2">
//                 {/* Item Details */}
//                 <TableCell className="border-border border-r-2 py-2">
//                   <ItemSelectionField
//                     itemId={item.id}
//                     onItemSelect={(_, product) =>
//                       handleItemSelect(index, product)
//                     }
//                   />
//                 </TableCell>

//                 {/* Quantity */}
//                 <TableCell className="border-border border-r-2 py-2">
//                   <Input
//                     type="number"
//                     value={watch(`items.${index}.quantity`)}
//                     onChange={(e) =>
//                       handleItemChange(
//                         index,
//                         "quantity",
//                         parseInt(e.target.value),
//                       )
//                     }
//                     className="border-0 text-center shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
//                   />
//                 </TableCell>

//                 {/* Price */}
//                 <TableCell className="border-border border-r-2 py-2">
//                   <Input
//                     type="number"
//                     value={watch(`items.${index}.price`)}
//                     onChange={(e) =>
//                       handleItemChange(
//                         index,
//                         "price",
//                         parseFloat(e.target.value) || 0,
//                       )
//                     }
//                     className="border-0 text-center shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
//                   />
//                 </TableCell>

//                 {/* Tax */}
//                 <TableCell className="border-border border-r-2 py-2">
//                   <SelectInput
//                     options={mockTaxRates.map((tax) => ({
//                       label: tax.name,
//                       value: tax.id,
//                     }))}
//                     onValueChange={(value) =>
//                       handleItemChange(index, "taxId", value)
//                     }
//                     triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 text-sm"
//                     placeholder="Select a Tax"
//                   />
//                 </TableCell>

//                 {/* Amount */}
//                 <TableCell className="border-border border-r-2 py-2 text-right">
//                   <span>${watch(`items.${index}.amount`).toFixed(2)}</span>
//                 </TableCell>

//                 {/* Delete Button */}
//                 <TableCell className="py-2 text-right">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => remove(index)}
//                     className="text-gray-500 hover:text-red-500"
//                   >
//                     <X className="size-5" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex justify-center">
//         <Button
//           variant="link"
//           className="text-muted-foreground text-sm"
//           onClick={addNewItem}
//           type="button"
//         >
//           <Plus /> Add New Row
//         </Button>
//       </div>

//       {/* Totals Section */}
//       <div className="space-y-4">
//         <div className="flex justify-between">
//           <span className="text-lg font-normal">Subtotal:</span>
//           <span className="text-[16px] font-normal">
//             ${watch("subtotal").toFixed(2)}
//           </span>
//         </div>

//         {/* Discount Section */}
//         {fields.map((item, index) => (
//           <div className="space-y-2">
//             <span className="text-sm font-normal">Discount:</span>
//             <div className="flex justify-between gap-4">
//               <div className="border-border flex w-full items-center rounded-md border">
//                 <Input
//                   type="number"
//                   className="text-muted-foreground border-0 p-5 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
//                   min="0"
//                   placeholder="0.00"
//                   onChange={(e) => {
//                     setValue("discount", parseFloat(e.target.value));
//                     calculateTotals();
//                   }}
//                 />
//                 <span className="border-border border-l px-4 py-2">%</span>
//               </div>
//               <span className="text-muted-foreground self-end text-[16px] font-normal">
//                 ${watch("discount").toFixed(2)}
//               </span>
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-between">
//           <span className="text-lg font-semibold">Total:</span>
//           <span className="text-[16px] font-normal">
//             ${watch("total").toFixed(2)}
//           </span>
//         </div>
//       </div>

//       <hr className="border-border border" />

//       {/* Button Section */}
//       <div className="flex justify-end gap-4">
//         <Button
//           variant={"outline"}
//           size={"lg"}
//           className="bg-sidebar"
//           type="submit"
//         >
//           Save
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant={"primary"} size={"lg"} type="button">
//               Send Via
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="border-border border p-0"
//             side="right"
//           >
//             <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent">
//               SMS
//             </DropdownMenuItem>
//             <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent">
//               Email
//             </DropdownMenuItem>
//             <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent">
//               Copy Link
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }
