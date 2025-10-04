import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React, { useState, useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import { CalendarDays, ChevronDown } from "lucide-react";

interface TopCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactNode;
  title: string;
  value: string | number;
  iconBgColor?: string;
  valueColor?: string;
}

export default function TotalEstimateCard({
  icon,
  title,
  value,
  iconBgColor,
  valueColor,
}: TopCardProps) {

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // Calculate number of days between the selected dates
  const daysDifference = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInDays(dateRange.to, dateRange.from) + 1; // +1 to include both start and end days
    }
    return 0;
  }, [dateRange]);

  // Format the display text for the dropdown trigger
  const getDisplayText = () => {
    if (dateRange?.from && dateRange?.to) {
      const daysText = daysDifference === 1 ? "day" : "days";
      return `${daysDifference} ${daysText}`;
    }
    return "Select date";
  };

  console.log("Selected Date Range:", dateRange);
  console.log("Days Difference:", daysDifference);

  return (
    <div className="card_container col-span-3 space-y-5 xl:col-span-1">
      {/* Icon and Title Section */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          {/* Icon Container */}
          <div
            className={`flex items-center justify-center rounded-full bg-[#FFF8DF] p-2 ${iconBgColor}`}
          >
            {/* Render the passed IconComponent */}
            {typeof icon === "function" ? React.createElement(icon) : icon}
          </div>
          {/* Title */}
          <h3 className="text-muted-foreground text-[16px] font-normal">
            {title}
          </h3>
        </div>
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-muted-foreground hover:text-foreground transition-colors border py-1 px-2 rounded-md flex items-center gap-2 whitespace-nowrap">
              <CalendarDays className="h-4 w-4" />
              {getDisplayText()}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-border">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-lg bg-transparent"
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Value Section */}
      <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
