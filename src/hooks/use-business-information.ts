import { steps } from "@/components/businessSetup/steps";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessName: z.string().min(1, "Business name is required"),
  businessDocument: z.string().min(1, "Business document is required"),
  businessLegalStructure: z
    .string()
    .min(1, "Business legal structure is required"),
  businessType: z.string().optional(),
  businessCountry: z.string().min(1, "Business country is required"),
  businessCurrency: z.string().min(1, "Business currency is required"),
});

export default function useBusinessInformation() {
  const navigate = useNavigate();
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
      businessType: "",
      businessCountry: "",
      businessCurrency: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    navigate("/business-setup/1");
    searchParams.set(
      "active",
      ((active + 1 + steps.length) % steps.length) + "",
    );
    setSearchParams(searchParams, { replace: true });
  }
  return { form, onSubmit };
}
