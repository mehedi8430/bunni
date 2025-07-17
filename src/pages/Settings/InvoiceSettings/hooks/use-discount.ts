import type { TDiscount } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema
export const discountFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    type: z.enum(["Percentage", "Fixed Amount", "Free Shipping"]),
    amount: z
        .number({ invalid_type_error: "Enter a valid amount" })
        .positive({ message: "Amount must be positive" })
        .nonnegative({ message: "Amount must be 0 or positive" }),
    status: z.enum(["Active", "Inactive"], {
        errorMap: () => ({ message: "Please select a valid status." }),
    }),
});

type DiscountFormValues = z.infer<typeof discountFormSchema>;

interface UseDiscountProps {
    discount?: Partial<TDiscount>;
    onSave: (data: TDiscount) => void;
    onClose: () => void;
}

export default function useDiscount({
    discount,
    onSave,
    onClose,
}: UseDiscountProps) {
    const form = useForm<DiscountFormValues>({
        resolver: zodResolver(discountFormSchema),
         defaultValues: {
            id: discount?.id || "",
            name: discount?.name || "",
            type: discount?.type || "Percentage",
            amount: typeof discount?.amount === "number" 
                ? discount.amount 
                : typeof discount?.amount === "string" && discount.amount !== "" 
                    ? Number(discount.amount) 
                    : 0,
            status: discount?.status || "Active",
        },
    });

    const onSubmit = (data: DiscountFormValues) => {
        const finalData: TDiscount = {
            id: data.id || `DISC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: data.name,
            type: data.type,
            amount: data.amount,
            status: data.status,
            createdDate: discount?.createdDate || new Date().toISOString(),
        };
        onSave(finalData);
        console.log("Discount saved:", finalData);
        onClose();
    };


    return { form, onSubmit }
}