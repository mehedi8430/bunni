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
        "h-10 w-12 rounded-sm border text-lg font-semibold transition-colors sm:h-16 sm:w-20",
        hasError
          ? "border-destructive focus:border-destructive ring-destructive/20"
          : "border-input focus:border-primary hover:border-muted-foreground/50",
      )}
    />
  );
}
