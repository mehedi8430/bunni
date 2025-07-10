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
import useBusinessInformation from "@/hooks/use-business-information";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import SelectInput from "../SelectInput";

export default function BusinessInformationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, onSubmit } = useBusinessInformation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome to Bunni</h1>
          <p className="text-description text-sm text-balance">
            Tell us about you and your business
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What’s Your First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="here..." {...field} className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="here..." {...field} className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full grid gap-3">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What’s Your Business Name?</FormLabel>
                  <FormControl>
                    <Input placeholder="here..." {...field} className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full grid gap-3">
            <FormField
              control={form.control}
              name="businessDocument"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What Dose Your Business Do?</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "consulting", label: "Consulting" },
                        { value: "ecommerce", label: "E-commerce" },
                        { value: "software", label: "Software Development" },
                      ]}
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

          <div className="col-span-full grid gap-3">
            <FormField
              control={form.control}
              name="businessLegalStructure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What Is The Legal Structure Of Your Business?
                  </FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "consulting", label: "Consulting" },
                        { value: "ecommerce", label: "E-commerce" },
                        { value: "software", label: "Software Development" },
                      ]}
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

          <p className="text-paragraph col-span-full">
            Looks like your business is the{" "}
            <span className="font-semibold">United States</span> and you do
            business is <span className="font-semibold">U.S. dollars.</span>
          </p>
          <Link to="/business-setup" className="text-primary underline">
            Change this
          </Link>

          <Button
            type="submit"
            className="disabled:bg-disabled w-full cursor-pointer md:col-span-full"
            size={"lg"}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
