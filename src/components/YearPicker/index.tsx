import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

// Helper to generate a range of years
const generateYears = (currentYear: number, range: number) => {
  const years = [];
  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i);
  }
  return years;
};

interface YearPickerProps {
  initialYear?: number;
  onYearChange?: (year: number) => void;
}

export default function YearPicker({
  initialYear,
  onYearChange,
}: YearPickerProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(
    initialYear || currentYear,
  );
  const [open, setOpen] = useState(false);

  // Generate years for the popover (e.g., +/- 5 years from current)
  const years = generateYears(currentYear, 5);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    if (onYearChange) {
      onYearChange(year);
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="filter_button"
            className="focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
          >
            <CalendarDays />
            <span>
              {selectedYear === currentYear ? "This Year" : selectedYear}
            </span>
            <ChevronDown className="ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 space-y-1 rounded-md">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                selectedYear === year
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {year === currentYear ? "This Year" : year}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
