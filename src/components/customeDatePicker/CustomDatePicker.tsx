import React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ✅ Utility: format as "05 Feb, 2025"
function formatShortDate(date?: Date): string {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${monthShort}, ${year}`;
}

// ✅ Utility: check if valid
function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

// ✅ Utility: parse string or Date input
function parseDate(input?: string | Date): Date | undefined {
  if (!input) return undefined;
  if (input instanceof Date) return input;

  const parsed = new Date(input);
  return isValidDate(parsed) ? parsed : undefined;
}

// ✅ Props
export interface CustomDatePickerProps {
  defaultDate?: string | Date;
  label?: string;
  onDateChange?: (date: Date | undefined) => void;
}

// ✅ Component
export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  defaultDate,
  label = "Select Date",
  onDateChange,
}) => {
  const parsedDefault = parseDate(defaultDate);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(parsedDefault);
  const [month, setMonth] = React.useState<Date | undefined>(parsedDefault);
  const [value, setValue] = React.useState(formatShortDate(parsedDefault));

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    setValue(formatShortDate(selected));
    setOpen(false);
    if (onDateChange) onDateChange(selected);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date-input" className="text-lg font-normal">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date-input"
          value={value}
          placeholder="eg. 05 Feb, 2025"
          className="custom-focus"
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(newDate)) {
              setDate(newDate);
              setMonth(newDate);
              if (onDateChange) onDateChange(newDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
