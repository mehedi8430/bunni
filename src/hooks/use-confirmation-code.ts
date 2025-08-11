import { useVerifyOTPMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export default function useConfirmationCode() {
  const [verifyOTP] = useVerifyOTPMutation();
  const [searchQuery] = useSearchParams();
  const email = searchQuery.get("email");

  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data);

    if (!email) {
      toast.error("Email is required for verification.");
      return;
    }

    const payload = {
      email,
      otp: data.pin,
    };

    try {
      const response = await verifyOTP(payload).unwrap();
      console.log({ response });

      // Assuming success status_code is 200 or similar; adjust based on your API
      if (response.status_code === 200) {
        toast.success("Verification successful!");
        searchParams.set("success", "true");
        setSearchParams(searchParams, { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      const details = error?.data?.details;
      const message = error?.data?.message || "Verification failed!";

      if (details && typeof details === "object") {
        // Map backend field names to form field names and set errors
        Object.entries(details).forEach(
          ([backendField, messages]: [string, unknown]) => {
            let formField = backendField;
            if (backendField === "otp") formField = "pin"; // Map 'otp' to 'pin'

            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(formField as keyof z.infer<typeof FormSchema>, {
                type: "server",
                message: messages[0], // Use the first error message
              });
            }
          },
        );
      } else {
        // Fallback for non-field-specific errors
        toast.error(message);
      }
    }
  }

  return { form, onSubmit };
}

// import { useVerifyOTPMutation } from "@/redux/endpoints/authApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useSearchParams } from "react-router";
// import { z } from "zod";

// const FormSchema = z.object({
//   pin: z.string().min(6, {
//     message: "Your one-time password must be 6 characters.",
//   }),
// });
// export default function useConfirmationCode() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [verifyOTP] = useVerifyOTPMutation();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       pin: "",
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     console.log("Form submitted with data:", data);
//     searchParams.set("success", "true");
//     setSearchParams(searchParams, { replace: true });
//   }

//   return { form, onSubmit };
// }
