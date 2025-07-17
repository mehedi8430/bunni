
import type { TTaxRate } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema
export const taxFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    rate: z.string().min(1, { message: "Rate type is required" }),
    amount: z
        .number({ invalid_type_error: "Enter a valid amount" })
        .positive({ message: "Amount must be positive" })
        .nonnegative({ message: "Amount must be 0 or positive" }),
    status: z.enum(["Active", "Inactive"], {
        errorMap: () => ({ message: "Please select a valid status." }),
    }),
});

type TaxFormValues = z.infer<typeof taxFormSchema>;

interface UseTaxProps {
    taxRate?: Partial<TTaxRate>;
    onSave: (data: TTaxRate) => void;
    onClose: () => void;
}   

export default function useTax({
      taxRate,
      onSave,
      onClose,
    }: UseTaxProps) {
    const form = useForm<TaxFormValues>({
        resolver: zodResolver(taxFormSchema),
        defaultValues: {
            id: taxRate?.id || "",
            name: taxRate?.name || "",
            rate: taxRate?.rate || "Percentage",
            amount: typeof taxRate?.amount === "number"
                ? taxRate.amount
                : typeof taxRate?.amount === "string" && taxRate.amount !== ""
                    ? Number(taxRate.amount)
                    : 0,
            status: taxRate?.status || "Active",
        },
    });

    const onSubmit = (data: TaxFormValues) => {
        const finalData: TTaxRate = {
            id: data.id || `TAX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: data.name,
            rate: data.rate,
            amount: data.amount,
            status: data.status,
            createdDate: taxRate?.createdDate || new Date().toISOString(),
        };
        onSave(finalData);
        console.log("Tax saved:", finalData);
        onClose();
    };


    return { form, onSubmit }
}