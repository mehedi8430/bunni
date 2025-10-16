import { useForgetPasswordOtpVerificationMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function useVerification({email}: {email: string}) {
  const navigate = useNavigate();
  const [forgetPasswordOtpVerification] = useForgetPasswordOtpVerificationMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      email: email,
      otp: data.pin,
    };
    toast.loading("Verifying otp...");

    try{
      const result = await forgetPasswordOtpVerification(payload).unwrap();
      if(result.status_code === 200){
        toast.dismiss();
        toast.success("Verification successful! You can now reset your password.");
        const encodedEmail = encodeURIComponent(btoa(email));
        navigate(`/auth/reset-password/${encodedEmail}`)
      }
    } catch(err){
      console.log(err);
      toast.dismiss();
      toast.error("Verification failed. Please try again.");
    }
    
  }

  return { form, onSubmit };
}
