import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Funnel } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

interface DateTimePickerProps {
  onDateTimeChange?: (dateTime: Date | undefined) => void;
  initialDateTime?: Date;
}

export default function DateTimePicker({
  onDateTimeChange,
  initialDateTime,
}: DateTimePickerProps) {
  const { t } = useTranslation("table");
  const [date, setDate] = useState<Date | undefined>(
    initialDateTime || new Date(),
  );
  const [time, setTime] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Set initial time if provided or a default
  useEffect(() => {
    if (initialDateTime) {
      const hours = initialDateTime.getHours().toString().padStart(2, "0");
      const minutes = initialDateTime.getMinutes().toString().padStart(2, "0");
      const seconds = initialDateTime.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    } else {
      // Set a default time if no initialDateTime is provided
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    }
  }, [initialDateTime]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleContinue = () => {
    if (date && time) {
      const combinedDateTime = new Date(date);

      const [hours, minutes, seconds] = time.split(":").map(Number);

      combinedDateTime.setHours(hours);
      combinedDateTime.setMinutes(minutes);
      combinedDateTime.setSeconds(seconds);
      combinedDateTime.setMilliseconds(0);

      if (onDateTimeChange) {
        onDateTimeChange(combinedDateTime);
      }
      console.log("Combined Date and Time:", combinedDateTime);
    } else {
      if (onDateTimeChange) {
        onDateTimeChange(undefined);
      }
      console.warn("Date or time not fully selected.");
    }
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="filter_button"
            className="focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
            onClick={() => {
              console.log("Add customer");
            }}
          >
            <Funnel />
            {t("Date and time")}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
          />

          <div className="border-border border-t py-2">
            <Label htmlFor="selected_time" className="sr-only">
              Time
            </Label>
            <Input
              id="selected_time"
              type="time"
              step="1"
              value={time}
              onChange={handleTimeChange}
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>

          <Button
            disabled={!date || !time}
            className="w-full"
            variant="primary"
            onClick={handleContinue}
          >
            {t("Continue")}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
