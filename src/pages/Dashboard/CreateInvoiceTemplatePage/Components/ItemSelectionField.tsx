import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ReactSVG } from "react-svg";
import { Input } from "@/components/ui/input";
import { useProductApi } from "@/mock-api-hook/features/customers/useProductsApi";
import assets from "@/lib/imageProvider";
import { useState, useMemo } from "react";

interface ItemSelectionFieldProps {
  itemId: string;
  onItemSelect: (itemId: string, description: string) => void;
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const itemDescription = watch("itemDescription");

  // Filter products based on search input
  const filteredProducts = useMemo(() => {
    if (!itemDescription) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(itemDescription.toLowerCase()),
    );
  }, [itemDescription, products]);

  const handleInputClick = () => {
    setIsSelectOpen(true);
  };

  const handleSelectChange = (value: string) => {
    const selectedProduct = products.find((product) => product.name === value);
    if (selectedProduct) {
      setValue("itemDescription", selectedProduct.name);
      onItemSelect(itemId, selectedProduct.name);
    }
    setIsSelectOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelectOpen(true);
    setValue("itemDescription", e.target.value);
    onItemSelect(itemId, e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="data-[placeholder]:text-foreground data-[select-trigger]:text-foreground w-[20px] border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-lg data-[select-trigger]:text-lg [&>svg]:hidden">
          <button type="button" className="h-8 w-8" onClick={handleInputClick}>
            <ReactSVG src={assets.icons.addIcon} />
          </button>
        </SelectTrigger>
        <SelectContent>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <SelectItem key={product.id} value={product.name}>
                {product.name}
              </SelectItem>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No products found
            </div>
          )}
        </SelectContent>
      </Select>

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
            className="text-muted-foreground border-0 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
            value={itemDescription}
          />
        )}
      />
    </div>
  );
}

// import { useForm, Controller } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";
// import { ReactSVG } from "react-svg";
// import { Input } from "@/components/ui/input";
// import { useProductApi } from "@/mock-api-hook/features/customers/useProductsApi";
// import assets from "@/lib/imageProvider";
// import { useState } from "react";

// interface ItemSelectionFieldProps {
//   itemId: string;
//   onItemSelect: (itemId: string, description: string) => void;
// }

// interface FormData {
//   itemDescription: string;
// }

// export default function ItemSelectionField({
//   itemId,
//   onItemSelect,
// }: ItemSelectionFieldProps) {
//   const { products } = useProductApi();
//   const { control, setValue, watch } = useForm<FormData>({
//     defaultValues: {
//       itemDescription: "",
//     },
//   });
//   const [isSelectOpen, setIsSelectOpen] = useState(false);

//   const handleInputClick = () => {
//     setIsSelectOpen(true);
//   };

//   const handleSelectChange = (value: string) => {
//     const selectedProduct = products.find((product) => product.name === value);
//     if (selectedProduct) {
//       setValue("itemDescription", selectedProduct.name);
//       onItemSelect(itemId, selectedProduct.name);
//     }
//     setIsSelectOpen(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIsSelectOpen(true);
//     onItemSelect(itemId, e.target.value);
//   };

//   const itemDescription = watch("itemDescription");

//   return (
//     <div className="flex items-center gap-2">
//       <Select
//         open={isSelectOpen}
//         onOpenChange={setIsSelectOpen}
//         onValueChange={handleSelectChange}
//       >
//         <SelectTrigger className="data-[placeholder]:text-foreground data-[select-trigger]:text-foreground w-[20px] border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-lg data-[select-trigger]:text-lg [&>svg]:hidden">
//           <button type="button" className="h-8 w-8" onClick={handleInputClick}>
//             <ReactSVG src={assets.icons.addIcon} />
//           </button>
//         </SelectTrigger>
//         <SelectContent>
//           {products.map((product) => (
//             <SelectItem key={product.id} value={product.name}>
//               {product.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Controller
//         name="itemDescription"
//         control={control}
//         render={({ field }) => (
//           <Input
//             {...field}
//             type="text"
//             placeholder="Type or click to select an item..."
//             onChange={(e) => {
//               field.onChange(e);
//               handleInputChange(e);
//             }}
//             onClick={handleInputClick}
//             className="text-muted-foreground border-0 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
//             value={itemDescription}
//           />
//         )}
//       />
//     </div>
//   );
// }
