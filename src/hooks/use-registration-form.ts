import { useUserRegisterMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function useRegistrationForm() {
  const navigate = useNavigate();
  const [userRegister] = useUserRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    };
    console.log("User Sign Up Data: ----->", payload);

    try {
      const response = await userRegister(payload).unwrap();
      console.log({ response });

      if (response.status_code === 201) {
        toast.success("Registration successful!");
        const encodedEmail = encodeURIComponent(btoa(values.email));
        navigate(`/auth/confirmation-code?e=${encodedEmail}`, {
          replace: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      const details = error?.data?.details;

      if (details && typeof details === "object") {
        Object.entries(details).forEach(
          ([backendField, messages]: [string, unknown]) => {
            let formField = backendField;
            if (backendField === "first_name") formField = "firstName";
            if (backendField === "last_name") formField = "lastName";

            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(formField as keyof z.infer<typeof formSchema>, {
                type: "server",
                message: messages[0],
              });
            }
          },
        );
      } else {
        toast.error(error?.data?.message || "Registration failed!");
      }
    }
  }

  return { form, onSubmit };
}
