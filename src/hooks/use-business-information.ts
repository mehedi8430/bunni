import { steps } from "@/components/businessSetup/steps";
import { setBusinessInfo } from "@/redux/slices/busynessSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  business_name: z.string().min(1, "Business name is required"),
  business_do: z.string().min(1, "Business document is required"),
  legal_stucture: z
    .string()
    .min(1, "Business legal structure is required"),
  business_type: z.string().optional(),
  business_country: z.string().min(1, "Business country is required"),
  business_currency: z.string().min(1, "Business currency is required"),
  city: z.string().min(1, "Business city is required"),
});

export default function useBusinessInformation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const active = parseInt(searchParams.get("active") || "0", 10);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      business_name: "",
      business_do: "",
      legal_stucture: "",
      business_type: "",
      business_country: "",
      business_currency: "",
      city: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const businessInfo = values;
    dispatch(setBusinessInfo(businessInfo));
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
