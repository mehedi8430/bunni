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
  const email = searchQuery.get("e");
  const decodedEmail = email ? atob(decodeURIComponent(email)) : "";

  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data);

    if (!email) {
      toast.error("Email is required for verification.");
      return;
    }

    const payload = {
      email: decodedEmail,
      otp: data.pin,
    };

    console.log("Verification Payload: ----->", payload);

    try {
      const response = await verifyOTP(payload).unwrap();
      console.log({ response });

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
        Object.entries(details).forEach(
          ([backendField, messages]: [string, unknown]) => {
            let formField = backendField;
            if (backendField === "otp") formField = "pin";

            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(formField as keyof z.infer<typeof FormSchema>, {
                type: "server",
                message: messages[0],
              });
            }
          },
        );
      } else {
        toast.error(message);
      }
    }

  }
  return { form, onSubmit };
}
