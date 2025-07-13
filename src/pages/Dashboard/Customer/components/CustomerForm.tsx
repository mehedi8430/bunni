import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { type Customer } from "@/mockApi/customerApi";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\+?[1-9]\d{9,14}$/, { message: "Invalid phone number format." }),
  truncated_tokens: z
    .string()
    .min(1, { message: "Credit card token is required." }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  achToken: z.string().min(1, { message: "ACH token is required." }),
});

interface CustomerFormProps {
  customer: Partial<Customer>;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

export function CustomerForm({ customer, onClose, onSave }: CustomerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      truncated_tokens: customer.truncated_tokens || "",
      company: customer.company || "",
      address: customer.address || "",
      achToken: customer.achToken || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted form data:", values);
    const submittedCustomer: Customer = {
      id: customer.id || `cust_${Date.now()}`,
      name: values.name,
      email: values.email,
      phone: values.phone,
      truncated_tokens: values.truncated_tokens,
      company: values.company,
      businessName: customer.businessName || "",
      address: values.address,
      achToken: values.achToken,
    };
    onSave(submittedCustomer);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter company"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter address"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="truncated_tokens"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Credit Card Token</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter credit card token"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="achToken"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">ACH Token</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter ACH token"
                  {...field}
                  className="col-span-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
