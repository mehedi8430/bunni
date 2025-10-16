import { useSetNewPasswordMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will show the error on the confirmPassword field
  });

export default function useResetYourPassword({email}: {email: string}) {
  const navigate = useNavigate();
  const [setNewPassword] = useSetNewPasswordMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: email,
      password: values.newPassword,
    };

    toast.loading("Resetting password...");
    
    try{
      const result = await setNewPassword(payload).unwrap();
      if(result.status_code === 200){
        toast.dismiss();
        toast.success("Password reset successful! You can now log in with your new password.");
        navigate("/auth/login");
      }
    } catch(err){
      console.log(err);
      toast.dismiss();
      toast.error("Password reset failed. Please try again.");
    }
  }

  return { form, onSubmit };
}
