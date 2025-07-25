import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectInput from "@/components/SelectInput";
import { DialogModal } from "@/components/DialogModal";
import { CustomerForm } from "../../Customer/components/CustomerForm";
import { Copy, Link2, Mail, MessageSquareMore } from "lucide-react";
import { toast } from "sonner";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";

// Zod schema
const paymentFormSchema = z.object({
  customer: z.string().min(1, { message: "Customer is required" }),
  amount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive({ message: "Amount must be positive" }),
  method: z.enum(["email", "sms", "link"], {
    errorMap: () => ({ message: "Select a payment method" }),
  }),
  recipientEmail: z
    .string({ required_error: "Recipient Email is required" })
    .email({ message: "Enter a valid email address" }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

// Props
interface AddPaymentFormProps {
  onClose: () => void;
  onSend: (data: PaymentFormValues) => void;
}

// Component
export function AddPaymentForm({ onClose, onSend }: AddPaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "email" | "sms" | "link"
  >("email");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const { customers } = useCustomerApi();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      customer: customers[0]?.id ?? "",
      amount: 0,
      method: "email",
      recipientEmail: "",
    },
  });

  const handleMethodSelect = (method: "email" | "sms" | "link") => {
    setSelectedMethod(method);
    form.setValue("method", method);
  };

  const onSubmit = (data: PaymentFormValues) => {
    onSend(data);
  };

  const shareableLink = `https://pay.example.com/invoice/${form.watch("customer") || "12345"}`;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5 px-4">
            {/* Customer select + Add Customer button */}
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">
                    Customer
                  </FormLabel>
                  <FormControl>
                    <SelectInput
                      options={customers.map((customer) => ({
                        value: customer.id,
                        label: customer.name,
                      }))}
                      placeholder="Select a customer"
                      onValueChange={field.onChange}
                      triggerClassName="w-full py-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="link"
              size="sm"
              className="text-primary mb-0 flex w-full justify-end px-2 py-1"
            >
              <span onClick={() => setIsAddCustomerOpen(true)}>+ Add Customer</span>
            </Button>

            {/* Payment Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">
                    Payment Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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

            {/* Payment Method Tabs */}
            <FormField
              control={form.control}
              name="method"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">
                    Payment Method
                  </FormLabel>
                  <FormControl>
                    <Tabs
                      value={selectedMethod}
                      onValueChange={(value) =>
                        handleMethodSelect(value as "email" | "sms" | "link")
                      }
                      className="mt-1 w-full"
                    >
                      <TabsList className="border-border grid w-full grid-cols-3 border">
                        <TabsTrigger
                          value="email"
                          className="text-muted-foreground text-sm focus:text-white md:text-sm"
                        >
                          <Mail className="size-4 md:size-5" />
                          Email
                        </TabsTrigger>
                        <TabsTrigger
                          value="sms"
                          className="text-muted-foreground text-sm focus-within:text-white md:text-sm"
                        >
                          <MessageSquareMore className="size-4 md:size-5" />
                          SMS
                        </TabsTrigger>
                        <TabsTrigger
                          value="link"
                          className="text-muted-foreground text-sm focus-within:text-white md:text-sm"
                        >
                          <Link2 className="size-4 -rotate-45 md:size-5" />
                          Copy link
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Fields */}
            {selectedMethod === "email" && (
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      Recipient Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedMethod === "sms" && (
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedMethod === "link" && (
              <div className="relative">
                <FormItem>
                  <FormLabel className="text-lg font-normal">
                    Shareable Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      value={shareableLink}
                      className="bg-muted custom-focus cursor-default pr-10 text-sm md:text-base"
                    />
                  </FormControl>
                </FormItem>

                <button
                  type="button"
                  className="text-muted-foreground hover:text-primary absolute right-4 bottom-3 cursor-pointer transition"
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink);
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  <Copy className="size-4" />
                </button>
              </div>
            )}
          </div>

          <hr className="mt-7 shadow-[0_-4px_6px_rgba(0,0,0,0.2)]" />
          {/* Buttons */}
          <div className="flex justify-center gap-3 p-5 md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-10 py-5 text-base font-normal"
            >
              Cancel
            </Button>
            <Button
              variant={"primary"}
              type="submit"
              className="border-button-border border px-10 py-5 text-base font-normal shadow-2xl"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>

      <DialogModal
        isOpen={isAddCustomerOpen}
        onOpenChange={setIsAddCustomerOpen}
        title="Add New Customer"
      >
        <CustomerForm
          onSave={() => console.log("Customer saved!")}
          onClose={() => setIsAddCustomerOpen(false)}
        />
      </DialogModal>
    </>
  );
}
