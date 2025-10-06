import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { TProduct } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { selectBusinessId } from "@/redux/slices/busynessSwitchSlice";
import { useCreateProductMutation } from "@/redux/endpoints/productApi";
import { toast } from "sonner";

// Zod schema
export const productFormSchema = z.object({
    // id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    type: z.enum(["Product", "Service"]),
    price: z
        .number({ invalid_type_error: "Enter a valid price" })
        .positive({ message: "Price must be positive" })
        .nonnegative({ message: "Price must be 0 or positive" }),
    description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export interface UseProductProps {
    product?: Partial<TProduct>;
    onSave: (data: TProduct) => void;
    onClose: () => void;
}

export interface ProductFormProps {
    product?: Partial<TProduct>;
    onClose: () => void;
    onSave: (data: TProduct) => void;
}

export default function useProduct({
    product,
    onSave,
    onClose,
}: UseProductProps) {

    const currentBusiness = useAppSelector(selectBusinessId);
    console.log("Current Business ID:", currentBusiness);
    const [createProduct] = useCreateProductMutation();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            // id: product?.id || "",
            name: product?.name || "",
            type: product?.type || "Product",
            price: product?.price ?? 0,
            description: product?.description || "",
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        const finalData: TProduct = {
            // id: data.id || `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: data.name,
            type: data.type,
            price: data.price,
            description: data.description || "",
            unit: "per hour",
            business_id: currentBusiness,
        };

        try{
            const result = await createProduct(finalData).unwrap()
            console.log("Product created successfully:", result);

            toast.success("Product created successfully");
        }
        catch(error){
            console.error("Failed to create product:", error);
            const errorMessage =
                typeof error === "object" && error !== null && "data" in error
                    ? (error as { data?: { message?: string } }).data?.message
                    : undefined;
            toast.error(errorMessage || "Failed to create product");
            return;
        }
        onSave(finalData);
        console.log("Product saved:", finalData);
        onClose();
    };
    return { form, onSubmit };
}