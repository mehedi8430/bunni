import { cn } from "@/lib/utils";
import { InputOTPSlot } from "../ui/input-otp";

export default function OtpSlot({
  index,
  hasError,
}: {
  index: number;
  hasError: boolean;
}) {
  return (
    <InputOTPSlot
      index={index}
      className={cn(
        "h-16 w-20 rounded-sm border text-lg font-semibold transition-colors",
        hasError
          ? "border-destructive focus:border-destructive ring-destructive/20"
          : "border-input focus:border-primary hover:border-muted-foreground/50",
      )}
    />
  );
}
