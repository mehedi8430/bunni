import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, ChevronDown } from "lucide-react";

// Helper to generate a range of years
const generateYears = (currentYear: number, range: number) => {
  const years = [];
  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i);
  }
  return years;
};

interface YearPickerProps {
  value: number;
  onYearChange: (year: number) => void;
}

export default function YearPicker({ value, onYearChange }: YearPickerProps) {
  const currentYear = new Date().getFullYear();

  // Generate years for the dropdown (e.g., +/- 5 years from current)
  const years = generateYears(currentYear, 5);

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button
            variant="filter_button"
            className="focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
          >
            <CalendarDays />
            <span>{value === currentYear ? "This Year" : value}</span>
            <ChevronDown className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ring-border/60 w-48 space-y-1 rounded-md bg-white py-1 shadow-lg ring-1 focus:outline-none">
          {years.map((year) => (
            <DropdownMenuItem
              key={year}
              onClick={() => onYearChange(year)}
              className={`data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary cursor-pointer px-4 py-2 text-sm ${
                value === year ? "bg-primary/10 text-primary" : ""
              }`}
            >
              {year === currentYear ? "This Year" : year}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
