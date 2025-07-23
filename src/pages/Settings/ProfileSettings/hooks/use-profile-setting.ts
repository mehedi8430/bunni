import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const useFormSchema = z.object({
    id: z.string().optional(),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    businessName: z.string().min(1, { message: "Business name is required" }),
    businessAddress: z.string().min(1, { message: "Business address is required" }),
    businessLogo: z.string().optional(),
    businessContact: z.string().min(1, { message: "Business contact is required" }),
    websiteUrl: z.string().url({ message: "Invalid URL" }).optional(),
})

type ProfileFormValues = z.infer<typeof useFormSchema>;

interface UseProfileFormProps {
    onSuccess?: () => void;
}

export default function UseProfileForm({ onSuccess }: UseProfileFormProps = {}) {

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(useFormSchema),
        defaultValues: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            businessName: '',
            businessAddress: '',
            businessLogo: '',
            businessContact: '',
            websiteUrl: '',
        }
    })

    const onSubmit = (data: ProfileFormValues) => {
        // Handle form submission logic here
        console.log("Form submitted with data:", data);
        
        // Simulate API call or actual submission
        // After successful submission, call the success callback
        if (onSuccess) {
            onSuccess();
        }
    }

    return { form, onSubmit }
}