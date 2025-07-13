import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useDetailCompanyName from "@/hooks/use-detail-company-name";
import { cn } from "@/lib/utils";
import SelectInput from "../SelectInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { businessYearOptions } from "./businessYearData";
import CustomerSizeInput from "./CustomerSizeInput";
import { paymentMethodOptions } from "./paymentMethodData";

export default function DetailCompanyNameForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, onSubmit } = useDetailCompanyName();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            Tell us a little about <br /> (Company name)
          </h1>
          <p className="text-description text-sm text-balance">
            Your answers help us set up your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="businessStartYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What Year Did You Start Your Business?</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={businessYearOptions}
                      onValueChange={field.onChange}
                      placeholder="here..."
                      triggerClassName="w-full py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="customerSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How Many Customers Do You Have?</FormLabel>
                  <FormControl>
                    <CustomerSizeInput
                      field={field}
                      options={["0-1", "2-5", "6-10"]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full grid gap-3">
            <FormField
              control={form.control}
              name="acceptPaymentOnline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do You Accept Payment Online?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="Not, I don’t"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          Not, I don’t
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="Not yet, but I want to start"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          Not yet, but I want to start
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full grid gap-3">
            <FormField
              control={form.control}
              name="mostUsedPaymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How Do Most Of Your Customers Pay You?</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={paymentMethodOptions}
                      onValueChange={field.onChange}
                      placeholder="here..."
                      triggerClassName="w-full py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="disabled:bg-disabled w-full cursor-pointer md:col-span-full"
            size={"lg"}
            // disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
