import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { TProduct } from "@/types";

// Zod schema
export const productFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    type: z.enum(["Product", "Service"]),
    unit: z.enum(["per hour", "per month"], {
        errorMap: () => ({ message: "Please select a valid unit." }),
    }),
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

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            id: product?.id || "",
            name: product?.name || "",
            type: product?.type || "Product",
            unit: product?.unit === "per hour" || product?.unit === "per month" ? product.unit : "per hour",
            price: product?.price ?? 0,
            description: product?.description || "",
        },
    });

    const onSubmit = (data: ProductFormValues) => {
        const finalData: TProduct = {
            id: data.id || `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: data.name,
            type: data.type,
            unit: data.unit,
            price: data.price,
            description: data.description || "",
        };
        onSave(finalData);
        console.log("Product saved:", finalData);
        onClose();
    };
    return { form, onSubmit };
}