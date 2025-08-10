import { useUserLoginMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().optional(),
});

export default function useLogin() {
  const [userLogin] = useUserLoginMutation();

  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await userLogin(payload).unwrap();

      if (response.status_code === 200) {
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { form, onSubmit };
}
