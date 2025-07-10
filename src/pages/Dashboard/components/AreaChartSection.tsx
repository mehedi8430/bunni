import SelectInput, { type SelectOption } from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { ArrowUpRight } from "lucide-react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const monthOptions: SelectOption[] = [
  { value: "monthly", label: "Monthly" },
  // { value: "yearly", label: "yearly" },
];

const chartData = [
  { month: "January", desktop: 96 },
  { month: "February", desktop: 205 },
  { month: "March", desktop: 200 },
  { month: "April", desktop: 173 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 254 },
  { month: "June", desktop: 224 },
  { month: "June", desktop: 114 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AreaChartSection() {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">Title</h4>
      <h2 className="text-[32px] font-bold text-black">$8,527,224</h2>
      <div className="flex items-center gap-4">
        <Button
          disabled
          className="bg-red-200 text-red-600 text-sm font-semibold gap-[1px]"
        >
          <ArrowUpRight /> +3.12%
        </Button>
        <p className="text-[16px] font-normal">VS This Month</p>
      </div>

      <div className="mt-4 space-y-2">
        <SelectInput
          options={monthOptions}
          placeholder="Select a month"
          triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        />

        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 4 }}
          >
            <defs>
              <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="month" hide />
            <Area
              dataKey="desktop"
              type="linear"
              fill="url(#fillColor)"
              fillOpacity={1}
              stroke="var(--color-desktop)"
              strokeWidth={3}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "var(--color-desktop) ",
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
