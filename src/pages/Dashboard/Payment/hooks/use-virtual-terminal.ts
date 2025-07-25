import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import { useInvoiceApi } from "@/mock-api-hook/features/customers/useInvoiceApi";
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
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/, {
    message: "Expiry must be in MM/YY or YYYY format",
  }),
  cardCVC: z.string().min(1, { message: "Card CVC is required" }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
});

type VirtualTerminalFormValues = z.infer<typeof virtualTerminalFormSchema>;

export interface VirtualTerminalFormProps {
  onClose: () => void;
  onSend: (data: VirtualTerminalFormValues) => void;
}

export default function useVirtualTerminal() {
  const { customers } = useCustomerApi();
  const { invoices } = useInvoiceApi();

  const form = useForm<VirtualTerminalFormValues>({
    resolver: zodResolver(virtualTerminalFormSchema),
    defaultValues: {
      customer: customers[0]?.id ?? "",
      amount: 0,
      paymentMethod: "",
    },
  });

  function onSubmit(data: VirtualTerminalFormValues) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(data);
  }

  return { form, onSubmit, customers, invoices };
}
