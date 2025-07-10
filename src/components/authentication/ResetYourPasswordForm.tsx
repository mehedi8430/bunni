import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useResetYourPassword from "@/hooks/use-reset-your-password";
import { cn } from "@/lib/utils";
import { PasswordInput } from "./PasswordInput";

export default function ResetYourPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, onSubmit } = useResetYourPassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-description text-center text-sm leading-7 text-balance">
            Enter a new password to continue using your <br /> account.
          </p>
        </div>

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="here..."
                    {...field}
                    className="py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="here..."
                    {...field}
                    className="py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
