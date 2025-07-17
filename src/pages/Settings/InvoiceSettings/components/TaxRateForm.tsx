import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TTaxRate } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectInput from "@/components/SelectInput";
import useTax from "../hooks/use-tax";

interface TaxRateFormProps {
  taxRate: Partial<TTaxRate>;
  onSave: (taxRate: TTaxRate) => void;
  onClose: () => void;
}

export default function TaxRateForm({
  taxRate,
  onSave,
  onClose,
}: TaxRateFormProps) {

    const { form, onSubmit } = useTax({
      taxRate,
      onSave,
      onClose,
    });

  // const [formData, setFormData] = useState<Partial<TTaxRate>>({
  //   id: taxRate.id || "",
  //   name: taxRate.name || "",
  //   amount: taxRate.amount || 0,
  // });
  // const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});

  // useEffect(() => {
  //   setFormData({
  //     id: taxRate.id || "",
  //     name: taxRate.name || "",
  //     amount: taxRate.amount || 0,
  //   });
  // }, [taxRate]);

  // const validateForm = () => {
  //   const newErrors: { name?: string; amount?: string } = {};
  //   if (!formData.name?.trim()) {
  //     newErrors.name = "Name is required";
  //   }
  //   const amountNum = typeof formData.amount === "string" ? parseFloat(formData.amount) : formData.amount;
  //   if (amountNum === undefined || isNaN(amountNum) || amountNum < 0) {
  //     newErrors.amount = "Amount must be a non-negative number";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = () => {
  //   if (!validateForm()) return;

  //   const updatedTaxRate: TTaxRate = {
  //     id: formData.id || `taxrate-${Date.now()}`,
  //     name: formData.name || "",
  //     amount: formData.amount || 0,
  //     createdDate: formData.id
  //       ? taxRate.createdDate || new Date().toISOString()
  //       : new Date().toISOString(),
  //     lastLogin: formData.id
  //       ? taxRate.lastLogin || new Date().toISOString()
  //       : new Date().toISOString(),
  //   };

  //   onSave(updatedTaxRate);
  //   onClose();
  // };

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
                <FormLabel className="text-lg font-normal">Name</FormLabel>
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
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-normal">Rate</FormLabel>
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
                <FormLabel className="text-lg font-normal">Amount</FormLabel>
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
                <FormLabel className="text-lg font-normal">Status</FormLabel>
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
            <Button type="button" variant="outline" onClick={onClose} className="px-10 py-5 text-lg font-normal">
              Cancel
            </Button>
            <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Next</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
