import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TInvoiceFooter } from "@/types";
import { useTranslation } from "react-i18next";
import useInvoiceFooter from "../hooks/use-invoice-footer";

interface InvoiceFooterFormProps {
  footer: Partial<TInvoiceFooter>;
  onClose: () => void;
}

export default function InvoiceFooterForm({
  footer,
  onClose,
}: InvoiceFooterFormProps) {
  const { t } = useTranslation("create_invoice_modal");
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
                <FormLabel className="text-base font-normal">
                  {t("invoiceFooter")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("setInvoiceFooterContent")}
                    {...field}
                    className="custom-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="mt-7 shadow-[0_-4px_6px_rgba(0,0,0,0.2)]" />
          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-8 py-4 text-base font-normal"
            >
              {t("cancel")}
            </Button>
            <Button
              variant={"primary"}
              type="submit"
              className="border-button-border border px-8 py-4 text-base font-normal shadow-2xl"
            >
              {t("next")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
