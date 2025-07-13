import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

export const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9][0-9\s\-()]{7,20}$/, "Invalid phone number format")
    .transform((val) => val.replace(/[\s\-()]/g, "")),
});

export default function usePhoneNumber() {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    navigate(`/dashboard`, { replace: true });
  }
  return { form, onSubmit };
}
