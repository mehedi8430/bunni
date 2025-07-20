"use client";

import { useDispatch } from "react-redux";
import { ReactSVG } from "react-svg";
import { Input } from "@/components/ui/input";
import { useProductApi } from "@/mock-api-hook/features/customers/useProductsApi";
import assets from "@/lib/imageProvider";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { type TProduct, type TInvoiceItem } from "@/types";
import {
  selectProduct,
  templateSelector,
} from "@/redux/slices/invoiceTemplateSlice";
import { useAppSelector } from "@/redux/hooks";

interface ItemSelectionFieldProps {
  itemId: string;
  onItemSelect: (itemId: string, product: TProduct) => void;
}

export default function ItemSelectionField({
  itemId,
  onItemSelect,
}: ItemSelectionFieldProps) {
  const { products } = useProductApi();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { items } = useAppSelector(templateSelector);
  console.log({ items });
  const currentItem = items.find((item: TInvoiceItem) => item.id === itemId);
  const itemDescription = currentItem?.description || "";

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (value: string) => {
    const selectedProduct = products.find((product) => product.name === value);
    if (selectedProduct) {
      dispatch(
        selectProduct({
          index: items.findIndex((item: TInvoiceItem) => item.id === itemId),
          product: selectedProduct,
        }),
      );
      onItemSelect(itemId, selectedProduct);
    }
    setIsOpen(false);
  };

  const handleInputChange = (value: string) => {
    const product: TProduct = {
      id: itemId,
      name: value,
      type: "Product",
      unit: "",
      price: 0,
      description: value,
    };
    dispatch(
      selectProduct({
        index: items.findIndex((item: TInvoiceItem) => item.id === itemId),
        product,
      }),
    );
    onItemSelect(itemId, product);
    setIsOpen(true);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="border-none bg-transparent p-0 shadow-none focus:ring-0 focus:ring-offset-0"
          >
            <ReactSVG src={assets.icons.addIcon} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search items..."
              className="text-foreground/90 h-9"
              value={itemDescription}
              onValueChange={handleInputChange}
            />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={handleSelectChange}
                    className="text-muted-foreground data-[selected=true]:text-muted-foreground"
                  >
                    {product.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        itemDescription === product.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Input
        type="text"
        placeholder="Type or click to select an item..."
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={handleInputClick}
        className="text-muted-foreground -ml-2 border-0 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
        value={itemDescription}
      />
    </div>
  );
}
