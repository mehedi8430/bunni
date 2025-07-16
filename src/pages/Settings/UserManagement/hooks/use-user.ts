import type { TUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

// Zod schema
export const userFormSchema = z.object({
    id: z.string().optional(),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    commission: z
        .number({ invalid_type_error: "Commission must be a number" })
        .min(0, { message: "Commission must be 0 or positive number" }),
    permissions: z.enum(["Owner", "Admin"], {
        errorMap: () => ({ message: "Please select a valid permission." }),
    }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

export type UseUserProps = {
    user?: Partial<TUser>;
    onSave: (data: TUser) => void;
    onClose: () => void;
}

export interface UserFormProps {
    user?: Partial<TUser>;
    onClose: () => void;
    onSave: (user: TUser) => void;
}

export default function useUser({ user, onSave, onClose }: UseUserProps) {

    const firstName = user?.memberName?.split(" ")[0] || "";
    const lastName = user?.memberName?.split(" ").slice(1).join(" ") || "";

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            id: user?.id || `USER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            firstName: firstName || "",
            lastName: lastName || "",
            email: user?.email || "",
            phone: user?.phone || "",
            location: user?.location || "",
            commission: user?.commission || 0,
            permissions: user?.permissions || "Admin",
        }
    })

    const onSubmit = (data: UserFormValues) => {
        const fullName = `${data.firstName} ${data.lastName}`.trim();
        
        const newUser: TUser = {
            id: data.id || `USER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            memberName: fullName,
            email: data.email,
            phone: data.phone,
            location: data.location,
            commission: data.commission,
            permissions: data.permissions as "Owner" | "Admin",
        };
        console.log("Final newUser object:", newUser);
        onSave(newUser);
        onClose();
    }

    return { form, onSubmit }
}