"use client";

import { useForm, Controller } from "react-hook-form";
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
import type { TProduct } from "@/types";

interface ItemSelectionFieldProps {
  itemId: string;
  onItemSelect: (itemId: string, product: TProduct) => void;
}

interface FormData {
  itemDescription: string;
}

export default function ItemSelectionField({
  itemId,
  onItemSelect,
}: ItemSelectionFieldProps) {
  const { products } = useProductApi();
  const { control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      itemDescription: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (value: string) => {
    const selectedProduct = products.find((product) => product.name === value);
    console.log({ selectedProduct });

    if (selectedProduct) {
      setValue("itemDescription", selectedProduct.name);
      onItemSelect(itemId, selectedProduct);
    }
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("itemDescription", e.target.value);
    onItemSelect(itemId, {
      id: itemId,
      name: e.target.value,
      type: "Product",
      unit: "",
      price: 0,
      description: e.target.value,
    });
    setIsOpen(true);
  };

  const itemDescription = watch("itemDescription");

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
              onValueChange={(value) => {
                setValue("itemDescription", value);
                onItemSelect(itemId, {
                  id: itemId,
                  name: value,
                  type: "Product",
                  unit: "",
                  price: 0,
                  description: value,
                });
              }}
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

      <Controller
        name="itemDescription"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Type or click to select an item..."
            onChange={(e) => {
              field.onChange(e);
              handleInputChange(e);
            }}
            onClick={handleInputClick}
            className="text-muted-foreground -ml-2 border-0 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
            value={itemDescription}
          />
        )}
      />
    </div>
  );
}
