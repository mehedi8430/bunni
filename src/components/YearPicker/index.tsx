import { useState } from "react";
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

export default function YearPicker() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Generate years for the dropdown (e.g., +/- 5 years from current)
  const years = generateYears(currentYear, 5);

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button
            variant="outline"
            className="border-border text-muted-foreground rounded-full bg-white p-3 text-sm font-normal focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
          >
            <CalendarDays />
            <span>
              {selectedYear === currentYear ? "This Year" : selectedYear}
            </span>
            <ChevronDown className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ring-border/60 w-48 space-y-1 rounded-md bg-white py-1 shadow-lg ring-1 focus:outline-none">
          {years.map((year) => (
            <DropdownMenuItem
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary cursor-pointer px-4 py-2 text-sm ${
                selectedYear === year ? "bg-primary/10 text-primary" : ""
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
