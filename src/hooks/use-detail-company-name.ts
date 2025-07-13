import { steps } from "@/components/businessSetup/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

export const formSchema = z.object({
  businessStartYear: z
    .string()
    .min(4, "Year must be at least 4 digits")
    .refine(
      (val) => {
        const year = parseInt(val, 10);
        return year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: `Year must be between 1900 and ${new Date().getFullYear()}`,
      },
    ),
  customerSize: z.string().min(1, "Customer size is required"),
  acceptPaymentOnline: z.enum(["Not, I don’t", "Not yet, but I want to start"]),
  mostUsedPaymentMethod: z
    .string()
    .min(1, "Most used payment method is required"),
});

export default function useDetailCompanyName() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const active = parseInt(searchParams.get("active") || "0", 10);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessStartYear: new Date().getFullYear().toString(),
      customerSize: "",
      acceptPaymentOnline: "Not yet, but I want to start",
      mostUsedPaymentMethod: "",
    },
  });

  console.log("Form values:", form.getValues());
  console.log("Form errors:", form.formState.errors);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    searchParams.set(
      "active",
      ((active - 1 + steps.length) % steps.length) + "",
    );
    setSearchParams(searchParams);
    navigate("2");
  }
  return { form, onSubmit };
}
