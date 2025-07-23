// components/ProductForm.tsx
import { Button } from "@/components/ui/button";
import type { ProductFormProps } from "../hooks/use-product";
import useProduct from "../hooks/use-product";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/SelectInput";
import { Textarea } from "@/components/ui/textarea";



export default function ProductForm({
  product,
  onClose,
  onSave,
}: ProductFormProps) {

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
                <FormLabel className="text-base font-normal">Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
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
                  <FormLabel className="text-base font-normal">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="$0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                  <FormLabel className="text-base font-normal">Type</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "Product", label: "Product" },
                        { value: "Service", label: "Service" },
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
          </div>

          {/* Unit */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">Unit</FormLabel>
                <FormControl>
                  <SelectInput
                    options={[
                      { value: "per hour", label: "Per Hour" },
                      { value: "per month", label: "Per Month" },
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
                <FormLabel className="text-base font-normal">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    {...field}
                    className="focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 h-20 resize-none"
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
            <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-base font-normal border border-button-border">Save</Button>
          </div>
        </form>
      </Form>
    </>

  );
}
