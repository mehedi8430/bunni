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
import { toast } from "sonner";
import OtpSlot from "./OtpSlot";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForgetPasswordMutation } from "@/redux/endpoints/authApi";

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
  const { email } = useParams<{ email?: string }>();
  const decodedEmail = atob(decodeURIComponent(email!));
  const { form, onSubmit } = useVerification({ email: decodedEmail });
  const [forgotPassword] = useForgetPasswordMutation();

  const [remainingTime, setRemainingTime] = useState(120);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (remainingTime > 0) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [remainingTime]);

  const handleResend = async () => {
    try {
      const result = await forgotPassword({ email: decodedEmail }).unwrap();
      if (result.status_code === 200) {
        toast.success("Code resent successfully!");
        setRemainingTime(120);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to resend code. Please try again.");
    }
    
  };

  return (
    <div>
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
              <span className="font-bold">{decodedEmail}</span>
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
          </div>
        </form>
      </Form>
      <div className="text-center">
        <p className="text-muted-description text-sm">
          Didn't receive the code?
          <Button
            variant="link"
            disabled={remainingTime > 0}
            type="button"
            className="text-card-foreground cursor-pointer font-medium underline"
            onClick={handleResend}
          >
            Resend
          </Button>
          {remainingTime > 0
            ? `in ${remainingTime} second${remainingTime === 1 ? "" : "s"}`
            : ""}
        </p>
      </div>
    </div>
  );
}
