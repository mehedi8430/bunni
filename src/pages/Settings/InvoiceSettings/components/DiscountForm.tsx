import SelectInput from "@/components/SelectInput";
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
import type { TDiscount } from "@/types";
import { useTranslation } from "react-i18next";
import useDiscount from "../hooks/use-discount";

interface DiscountFormProps {
  discount?: Partial<TDiscount>;
  onSave: (discount: TDiscount) => void;
  onClose: () => void;
}

export default function DiscountForm({
  discount,
  onSave,
  onClose,
}: DiscountFormProps) {
  const { t } = useTranslation("create_discount_modal");

  const { form, onSubmit } = useDiscount({
    discount,
    onSave,
    onClose,
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  {t("name")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("invoiceDescription")}
                    {...field}
                    className="custom-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  {t("type")}
                </FormLabel>
                <FormControl>
                  <SelectInput
                    options={[
                      { value: "Percentage", label: t("percentage") },
                      { value: "Fixed Amount", label: t("fixedAmount") },
                      { value: "Free Shipping", label: t("freeShipping") },
                    ]}
                    placeholder={t("selectType")}
                    value={field.value}
                    onValueChange={field.onChange}
                    triggerClassName="custom-focus w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  {t("amount")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={t("amountPlaceholder")}
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="custom-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-normal">
                  {t("status")}
                </FormLabel>
                <FormControl>
                  <SelectInput
                    options={[
                      { value: "Active", label: t("active") },
                      { value: "Inactive", label: t("inactive") },
                    ]}
                    placeholder={t("selectType")}
                    value={field.value}
                    onValueChange={field.onChange}
                    triggerClassName="custom-focus w-full"
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
              className="px-10 py-5 text-base font-normal"
            >
              {t("cancel")}
            </Button>
            <Button
              variant={"primary"}
              type="submit"
              className="border-button-border border px-10 py-5 text-base font-normal shadow-2xl"
            >
              {t("next")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
