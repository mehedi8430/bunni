import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useVerification from "@/hooks/use-verification";
import { cn } from "@/lib/utils";

import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { useParams } from "react-router";
import { toast } from "sonner";
import OtpSlot from "./OtpSlot";

interface VerificationCodeFormProps {
  className?: string;
  formTitle?: string;
  formDescription?: string;
  confirmationPage?: boolean; // Optional prop to indicate if it's a confirmation page
}

export default function VerificationCodeForm({
  className,

  ...props
}: VerificationCodeFormProps & React.ComponentProps<"form">) {
  const { form, onSubmit } = useVerification();

  const params = useParams<{
    token: string;
    email: string;
  }>();

  if (!params.token || !params.email) {
    toast.error("Invalid verification link. Please try again.");
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl leading-14 font-bold">Verification Code</h1>
          <p className="text-description text-lg leading-7 text-balance">
            Enter verification code sent to your email address <br />
            <span className="font-bold">{params.email}</span>
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="flex-1">
                    <InputOTPGroup className="flex w-full justify-between gap-1">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <OtpSlot
                          key={index}
                          index={index}
                          hasError={!!fieldState.error}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Verify Code
          </Button>

          <div className="text-center">
            <p className="text-muted-description text-sm">
              Didn't receive the code?
              <Button
                variant="link"
                disabled={false} // Disable button for 25 seconds
                type="button"
                className="text-card-foreground cursor-pointer font-medium underline"
                onClick={() => {
                  // Add resend logic here
                  console.log("Resending code...");
                  toast("Verification code resent", {
                    description: "Please check your email for the new code.",
                  });
                }}
              >
                Resend
              </Button>
              in 25 second
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}
