
import { addInvoiceFooter, updateInvoiceFooter } from "@/redux/slices/invoiceFooterSlice";
import type {  TInvoiceFooter } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

export const footerFormSchema = z.object({
    id: z.string(),
    footerContent: z.string().min(1, { message: "Footer content is required" }),
});

type InvoiceFooterFormValues = z.infer<typeof footerFormSchema>;

interface UseInvoiceFooterProps {
    footer?: Partial<TInvoiceFooter>;
    onClose: () => void;
}

export default function useInvoiceFooter({
    footer,
    onClose,
}: UseInvoiceFooterProps) {

    const dispatch = useDispatch();
    const form = useForm<InvoiceFooterFormValues>({
        resolver: zodResolver(footerFormSchema),
         defaultValues: {
            id: footer?.id || "",
            footerContent: footer?.footerContent || "",
        },
    });

    const onSubmit = (data: InvoiceFooterFormValues) => {

        if(data.id) {
            dispatch(updateInvoiceFooter(data));
        } else {
            dispatch(addInvoiceFooter({
                id: data.id || `DISC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            footerContent: data.footerContent,
            }));
        }
        onClose();
    };


    return { form, onSubmit }
}