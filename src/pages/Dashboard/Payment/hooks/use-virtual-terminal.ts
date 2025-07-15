import { useCustomerApi } from "@/redux/features/customers/useCustomerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema
export const virtualTerminalFormSchema = z.object({
    customer: z.string().min(2, { message: "Customer is required" }),
    amount: z
        .number({ invalid_type_error: "Enter a valid amount" })
        .positive({ message: "Amount must be positive" }),
    cardNumber: z.string().min(8, { message: "Card number is required" }),
    cardExpiry: z
        .string()
        .regex(
            /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/,
            { message: "Expiry must be in MM/YY or YYYY format" }
        ),
    cardCVC: z.string().min(1, { message: "Card CVC is required" }),
    cardHolderName: z.string().min(2, { message: "Card holder name is required" }),
    discountOrTax: z.enum([
        "discount_10",
        "discount_5",
        "tax_vat_15",
        "tax_gst_5",
    ], {
        errorMap: () => ({ message: "Please select a valid discount or tax." }),
    }),
});

type VirtualTerminalFormValues = z.infer<typeof virtualTerminalFormSchema>;

export interface VirtualTerminalFormProps {
    onClose: () => void;
    onSend: (data: VirtualTerminalFormValues) => void;
}

export default function useVirtualTerminal() {

    const { customers } = useCustomerApi();
    const {invoices} = useInvoiceApi();


    const form = useForm<VirtualTerminalFormValues>({
        resolver: zodResolver(virtualTerminalFormSchema),
        defaultValues: {
            customer: customers[0]?.id ?? "",
            amount: 0,
        },
    });

    function onSubmit(data: VirtualTerminalFormValues) {
        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(data);
    }

    return { form, onSubmit, customers };
}