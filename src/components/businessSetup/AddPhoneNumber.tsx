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
import usePhoneNumber from "@/hooks/use-phone-number";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { selectBusinessInfo, setBusinessInfo } from "@/redux/slices/busynessSlice";
import { useDispatch } from "react-redux";

export default function AddPhoneNumber({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const busynessData = useAppSelector(selectBusinessInfo);
  console.log("Business data in phone number form:", busynessData);
  const dispatch = useDispatch();
  const { form, onSubmit } = usePhoneNumber();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Keep your account secure</h1>
          <p className="text-description text-sm text-balance">
            Enter your phone number and we'll send a <br /> code to secure your
            account. No spam.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="col-span-full grid gap-3">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1    (162) 826-7904"
                      {...field}
                      className="py-5"
                      onChange={(e) => {
                        field.onChange(e);
                        const updatedBusynessData = { ...busynessData, phone: e.target.value };
                        dispatch(setBusinessInfo(updatedBusynessData));
                      }}
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
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
