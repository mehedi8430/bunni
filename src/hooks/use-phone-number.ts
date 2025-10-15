import { useCreateBusynessMutation } from "@/redux/endpoints/busynessApi";
import { useAppSelector } from "@/redux/hooks";
import { selectBusinessInfo } from "@/redux/slices/busynessSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9][0-9\s\-()]{7,20}$/, "Invalid phone number format")
    .transform((val) => val.replace(/[\s\-()]/g, "")),
});

export default function usePhoneNumber() {
  const businessInfo = useAppSelector(selectBusinessInfo);
  const navigate = useNavigate();
  const [createBusyness] = useCreateBusynessMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values);

    console.log("Final business data to submit:", businessInfo);

    try{
      const response = await createBusyness(businessInfo);
      toast.success("Business Create Successfully!");
      console.log("Business created:", response);
      navigate(`/dashboard`, { replace: true });
      
    }catch(error){
      console.error("Failed to create business info:", error);
      toast.error("Failed to create business information");
    }

    
  }
  return { form, onSubmit };
}
