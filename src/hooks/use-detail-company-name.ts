import { steps } from "@/components/businessSetup/steps";
import { useAppSelector } from "@/redux/hooks";
import { selectBusinessInfo, setBusinessInfo } from "@/redux/slices/busynessSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

export const formSchema = z.object({
  business_start: z
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
  customer_size: z.string().min(1, "Customer size is required"),
  accept_payments: z.enum(["Not, I don’t", "Not yet, but I want to start"]),
  payment_method: z
    .string()
    .min(1, "Most used payment method is required"),
});

export default function useDetailCompanyName() {
  const busynessData = useAppSelector(selectBusinessInfo);
  const dispatch = useDispatch();
  console.log("Busyness data from Redux:", busynessData);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const active = parseInt(searchParams.get("active") || "0", 10);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_start: new Date().getFullYear().toString(),
      customer_size: "",
      accept_payments: "Not yet, but I want to start",
      payment_method: "",
    },
  });

  // console.log("Form values:", form.getValues());
  // console.log("Form errors:", form.formState.errors);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const updatedBusynessData = { ...busynessData, ...values };
    dispatch(setBusinessInfo(updatedBusynessData));
    navigate("/business-setup/2");
    searchParams.set(
      "active",
      ((active + 1 + steps.length) % steps.length) + "",
    );
    setSearchParams(searchParams, { replace: true });
  }
  return { form, onSubmit };
}
