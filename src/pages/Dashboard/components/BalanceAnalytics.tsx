import SelectInput, { type SelectOption } from "@/components/SelectInput";
import { useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const monthOptions: SelectOption[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "yearly" },
];

const chartData = [
  { month: "January", desktop: 20 },
  { month: "February", desktop: 205 },
  { month: "March", desktop: 70 },
  { month: "April", desktop: 173 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 250 },
  { month: "July", desktop: 214 },
  { month: "August", desktop: 230 },
  { month: "September", desktop: 275 },
  { month: "October", desktop: 175 },
  { month: "November", desktop: 275 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function BalanceAnalytics() {
  const [selected, setSelected] = useState<string>("monthly");

  const handleMonthChange = (value: string) => {
    console.log("Selected month:", value);
    setSelected(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Balance Analytics</h1>
        <SelectInput
          options={monthOptions}
          placeholder="Select a month"
          value={selected}
          onValueChange={handleMonthChange}
          triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        />
      </div>

      {/* Balance Abalytics Area Chart */}
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            // ticks={dynamicTicks}
            // domain={[minValue, maxValue]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-chart-1-foreground)" }}
            tickMargin={5}
            tickFormatter={(value) => `$${value.toFixed(1)}`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            dataKey="desktop"
            type="linear"
            fill="none"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            strokeWidth={3}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
