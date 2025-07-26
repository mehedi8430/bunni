import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useInvoiceFooter from "../hooks/use-invoice-footer";
import type { TInvoiceFooter } from "@/types";

interface InvoiceFooterFormProps {
  footer: Partial<TInvoiceFooter>;
  onClose: () => void;
}   

export default function InvoiceFooterForm({
  footer,
  onClose,
}: InvoiceFooterFormProps) {

    const { form, onSubmit } = useInvoiceFooter({
        footer,
        onClose,
    });
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">

                    {/* Product Name */}
                    <FormField
                        control={form.control}
                        name="footerContent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-normal">Invoice Footer</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Set your invoice footer content here..."
                                        {...field}
                                        className="custom-focus"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
                    {/* Buttons */}
                    <div className="flex items-center justify-center md:justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} className="px-8 py-4 text-base font-normal">
                            Cancel
                        </Button>
                        <Button variant={"primary"} type="submit" className="px-8 py-4 shadow-2xl text-base font-normal border border-button-border">Next</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
