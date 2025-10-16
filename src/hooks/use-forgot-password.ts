import { useForgetPasswordMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function useForgotPassword() {
  const navigate = useNavigate();
  const [forgotPassword] = useForgetPasswordMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Sending password reset code...");
    try {
      const result = await forgotPassword(values).unwrap();
      if (result.status_code === 200) {
        toast.dismiss();
        toast.success("Password reset code sent to your email!");
        const encodedEmail = encodeURIComponent(btoa(values.email));
        navigate(`/auth/verification/${encodedEmail}`);
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : String(err) || "Otp request failed!";
      toast.dismiss();
      toast.error(errorMessage);
    }
  }

  return { form, onSubmit };
}
