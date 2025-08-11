import { useUserRegisterMutation } from "@/redux/endpoints/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  const [userRegister] = useUserRegisterMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });

    try {
      const response = await userRegister(values).unwrap();
      console.log({ response });

      if (response.status_code === 201) {
        toast.success("Registration successful!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      const details = error?.data?.details;

      if (details && typeof details === "object") {
        // Map backend field names to form field names and set errors
        Object.entries(details).forEach(
          ([backendField, messages]: [string, string[]]) => {
            let formField = backendField;
            if (backendField === "first_name") formField = "firstName";
            if (backendField === "last_name") formField = "lastName";
            // Add mappings for other fields if needed

            if (messages?.length > 0) {
              form.setError(formField as keyof z.infer<typeof formSchema>, {
                type: "server",
                message: messages[0], // Use the first error message in the array
              });
            }
          },
        );
      } else {
        // Fallback for non-field-specific errors
        toast.error(error?.data?.message || "Registration failed!");
      }
    }
  }

  return { form, onSubmit };
}

// import { useUserRegisterMutation } from "@/redux/endpoints/authApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const formSchema = z
//   .object({
//     firstName: z.string().min(1, "First name is required"),
//     lastName: z.string().min(1, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters long")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Password must contain at least one number")
//       .regex(
//         /[^A-Za-z0-9]/,
//         "Password must contain at least one special character",
//       ),
//     confirmPassword: z.string().min(8, "Please confirm your password"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export default function useRegistrationForm() {
//   const [userRegister] = useUserRegisterMutation();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log({ values });

//     try {
//       const response = await userRegister(values).unwrap();
//       console.log({ response });

//       if (response.status_code === 201) {
//         toast.success("Registration successful!");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.log(error);
//       toast.error(error?.data?.message || "Registration failed!");
//     }
//   }

//   return { form, onSubmit };
// }
