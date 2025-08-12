import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import useConfirmationCode from "@/hooks/use-confirmation-code";
import { toast } from "sonner";
import LoginSuccessModal from "./LoginSuccessModal";
import OtpSlot from "./OtpSlot";
import { useSearchParams } from "react-router";
import { useResendOTPMutation } from "@/redux/endpoints/authApi";

export default function ConfirmationCodeForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [resendOTP] = useResendOTPMutation();

  const { form, onSubmit } = useConfirmationCode();
  const [searchQuery] = useSearchParams();
  const email = searchQuery.get("email") || "";

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
    console.log("Resending code...");

    try {
      const response = await resendOTP({ email }).unwrap();

      if (response?.status_code === 200) {
        toast.success(response?.message || "Code resent successfully!");
        setRemainingTime(120);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to resend code");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl leading-14 font-bold">Confirmation Code</h1>
          <p className="text-description text-base leading-7 text-balance">
            Enter Confirmation code that sent to your email address
            <br />
            <span className="text-sm font-bold">{email}</span>
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
      </form>

      {/* Login Success Modal */}
      <LoginSuccessModal />
    </Form>
  );
}
