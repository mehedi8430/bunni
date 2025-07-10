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
import useForgotPassword from "@/hooks/use-forgot-password";
import { cn } from "@/lib/utils";

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, onSubmit } = useForgotPassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-description text-center text-sm leading-7 text-balance">
            Please provide your registered email address to receive a <br />{" "}
            password reset code.
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="here..." {...field} className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" size={"lg"}>
            Send code
          </Button>
        </div>
      </form>
    </Form>
  );
}
