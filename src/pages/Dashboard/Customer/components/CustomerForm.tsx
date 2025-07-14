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
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
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
  const [defaultFirstName, defaultLastName] = customer.name
    ? customer.name.split(' ', 2)
    : ["", ""];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
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
      name: `${values.firstName} ${values.lastName}`,
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-5">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-normal">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here"
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
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-normal">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write here"
                      {...field}
                      className="custom-focus"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-normal">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., john@example.com"
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
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-normal">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., +123-456-7890"
                      {...field}
                      className="custom-focus"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-lg font-normal">Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., ABC Corp"
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
            name="address"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-lg font-normal">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 123 Main St, NY"
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
            name="truncated_tokens"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-lg font-normal">Credit Card Token</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890XYZ"
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
            name="achToken"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-lg font-normal">ACH Token</FormLabel>
                <FormControl>
                  <Input
                    placeholder="•••• 723532345 "
                    {...field}
                    className="custom-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
        <div className="flex justify-end gap-3 p-5">
          <Button type="button" variant="outline" onClick={onClose} className="px-10 py-5 text-lg font-normal">
            Cancel
          </Button>
          <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Save</Button>
        </div>
      </form>
    </Form>
  );
}
