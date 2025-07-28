// components/ProductForm.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import type { ProductFormProps } from "../hooks/use-product";
import useProduct from "../hooks/use-product";

export default function ProductForm({
  product,
  onClose,
  onSave,
}: ProductFormProps) {
  const { t } = useTranslation("add_product_modal");

  const { form, onSubmit } = useProduct({
    product,
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
                  {t("productName")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("enterProductName")}
                    {...field}
                    className="custom-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price and Type in flex row */}
          <div className="flex space-x-4">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-base font-normal">
                    {t("price")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="$0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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
                <FormItem className="w-1/2">
                  <FormLabel className="text-base font-normal">
                    {t("type")}
                  </FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "Product", label: t("product") },
                        { value: "Service", label: t("service") },
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
          </div>

          {/* Unit */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  {t("unit")}
                </FormLabel>
                <FormControl>
                  <SelectInput
                    placeholder={t("selectUnit")}
                    options={[
                      { value: "per unit", label: t("perUnit") },
                      { value: "per item", label: t("perItem") },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    triggerClassName="w-full py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  {t("description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("enterProductDescription")}
                    {...field}
                    className="h-20 resize-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
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
              {t("save")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
