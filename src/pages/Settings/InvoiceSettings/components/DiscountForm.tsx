import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TDiscount } from "@/types";
import useDiscount from "../hooks/use-discount";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectInput from "@/components/SelectInput";

interface DiscountFormProps {
  discount: Partial<TDiscount>;
  onSave: (discount: TDiscount) => void;
  onClose: () => void;
}

export default function DiscountForm({
  discount,
  onSave,
  onClose,
}: DiscountFormProps) {

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
                <FormLabel className="text-base font-normal">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Let your customer kno what this Invoice is for"
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
                <FormLabel className="text-base font-normal">Type</FormLabel>
                <FormControl>
                  <SelectInput
                    options={[
                      { value: "Percentage", label: "Percentage" },
                      { value: "Fixed Amount", label: "Fixed Amount" },
                      { value: "Free Shipping", label: "Free Shipping" },
                    ]}
                    placeholder="Select type"
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
                  <FormLabel className="text-base font-normal">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 10 for 10% or 50 for $50"
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
                  <FormLabel className="text-base font-normal">Status</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                      ]}
                      placeholder="Select type"
                      value={field.value}
                      onValueChange={field.onChange}
                      triggerClassName="custom-focus w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
          {/* Buttons */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="px-10 py-5 text-base font-normal">
              Cancel
            </Button>
            <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-base font-normal border border-button-border">Next</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
