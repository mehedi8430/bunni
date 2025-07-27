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
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddressFormProps {
  initialData?: {
    address?: string;
    streetAddress?: string;
    country?: string;
    district?: string;
    zip?: string;
    isDefault: boolean;
    index?: number;
  };
  onSubmit: (data: {
    address: string;
    isDefault: boolean;
    index?: number;
  }) => void;
  onCancel: () => void;
}

const addressSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  country: z.string().min(1, "Country is required"),
  district: z.string().min(1, "District/State is required"),
  zip: z.string().min(1, "Zip/Postal code is required"),
  isDefault: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  // Parse initialData.address if no split fields are provided
  let defaultValues: AddressFormData = {
    streetAddress: initialData?.streetAddress || "",
    country: initialData?.country || "",
    district: initialData?.district || "",
    zip: initialData?.zip || "",
    isDefault: initialData?.isDefault || false,
  };

  if (initialData?.address && !initialData.streetAddress) {
    // Attempt to parse the concatenated address (basic splitting logic)
    const parts = initialData.address.split(", ").map((part) => part.trim());
    if (parts.length >= 3) {
      defaultValues = {
        streetAddress: parts[0] || "",
        district: parts[1] || "",
        country: parts[2]?.split(" ")[0] || "",
        zip: parts[2]?.split(" ")[1] || parts[3] || "",
        isDefault: initialData.isDefault,
      };
    }
  }

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  const handleSubmit = (data: AddressFormData) => {
    // Combine fields into a single address string
    const combinedAddress = `${data.streetAddress}, ${data.district}, ${data.country} ${data.zip}`;
    onSubmit({
      address: combinedAddress,
      isDefault: data.isDefault,
      index: initialData?.index,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal">
                Street Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter street address"
                  {...field}
                  className="custom-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal">Country</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter country"
                  {...field}
                  className="custom-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal">
                District/State
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter district or state"
                  {...field}
                  className="custom-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-normal">
                Zip/Postal Code
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter zip or postal code"
                  {...field}
                  className="custom-focus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer text-lg font-normal">
                Set as Default
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-base font-normal"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="px-6 py-2 text-base font-normal"
          >
            {initialData?.index !== undefined
              ? "Update Address"
              : "Add Address"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
