import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema
export const recurringBillingFormSchema = z.object({
  customer: z.string().min(1, { message: "Customer is required" }),
  amount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive({ message: "Amount must be positive" }),
  interval: z.enum(["Monthly", "Weekly", "Daily"], {
    errorMap: () => ({ message: "Please select a valid interval." }),
  }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
   cardNumber: z.string().min(8, { message: "Card number is required" }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/, {
    message: "Expiry must be in MM/YY or YYYY format",
  }),
  cardCVC: z.string().min(1, { message: "Card CVC is required" }),
});

type RecurringBillingFormValues = z.infer<typeof recurringBillingFormSchema>;

export interface RecurringBillingFormProps {
  onClose: () => void;
  onSend: (data: RecurringBillingFormValues) => void;
}

export default function useRecurringBilling() {
  const { customers } = useCustomerApi();

  const form = useForm<RecurringBillingFormValues>({
    resolver: zodResolver(recurringBillingFormSchema),
    defaultValues: {
      customer: customers[0]?.id ?? "",
      amount: 0,
      interval: "Monthly",
      paymentMethod: "",
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: RecurringBillingFormValues) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(data);
  }
  return { form, onSubmit, customers };
}
