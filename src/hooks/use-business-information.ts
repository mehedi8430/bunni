import { steps } from "@/components/businessSetup/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessName: z.string().min(1, "Business name is required"),
  businessDocument: z.string().min(1, "Business document is required"),
  businessLegalStructure: z
    .string()
    .min(1, "Business legal structure is required"),
});

export default function useBusinessInformation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = parseInt(searchParams.get("active") || "0", 10);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      businessDocument: "",
      businessLegalStructure: "",
    },
  });

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
  }
  return { form, onSubmit };
}
