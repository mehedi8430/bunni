import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DateTimePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button
            variant="filter_button"
            className="focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
            onClick={() => {
              console.log("Add customer");
            }}
          >
            <CirclePlus />
            Date and time
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
          />

          <div className="border-border border-t py-2">
            <Label htmlFor="time-from" className="sr-only">
              Start Time
            </Label>
            <Input
              id="time-from"
              type="time"
              step="1"
              defaultValue="10:30:00"
              className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>

          <Button
            // disabled={!date || !selectedTime}
            className="w-full"
            variant="primary"
          >
            Continue
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
