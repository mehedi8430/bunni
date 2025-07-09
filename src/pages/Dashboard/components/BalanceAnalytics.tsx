import SelectInput, { type SelectOption } from "@/components/SelectInput";
import { useMemo, useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { calculateTicks } from "../utils/calculateTicks";

const monthOptions: SelectOption[] = [
  { value: "monthly", label: "Monthly" },
  // { value: "yearly", label: "yearly" },
];

const chartData = [
  { month: "January", desktop: 120 },
  { month: "February", desktop: 205 },
  { month: "March", desktop: 170 },
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

  // Calculate dynamic values from data
  const { dynamicTicks, minValue, maxValue } = useMemo(() => {
    const values = chartData.map((item) => item.desktop);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);

    // Add some padding (10% on each side)
    const padding = (dataMax - dataMin) * 0.1;
    const paddedMin = Math.max(0, dataMin - padding);
    const paddedMax = dataMax + padding;

    const { ticks, niceMin, niceMax } = calculateTicks(paddedMin, paddedMax, 6);

    return {
      dynamicTicks: ticks,
      minValue: niceMin,
      maxValue: niceMax,
    };
  }, []);

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
          <CartesianGrid
            vertical={true}
            strokeDasharray="12 5"
            strokeWidth={0.6}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            ticks={dynamicTicks}
            domain={[minValue, maxValue]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-chart-1-foreground)" }}
            tickMargin={5}
            tickFormatter={(value) => `$${value.toFixed(1)}`}
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-800 text-white px-3 py-2 rounded-md shadow-lg border-0">
                    <div className="text-xs text-slate-300 mb-1">
                      Total Balance
                    </div>
                    <div className="text-sm font-semibold">
                      ${payload[0].value?.toLocaleString() || 0}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            dataKey="desktop"
            type="linear"
            fill="none"
            stroke="var(--color-desktop)"
            strokeWidth={5}
            activeDot={{
              r: 8,
              strokeWidth: 3,
            }}
            style={{
              filter: "drop-shadow(0 0 10px var(--color-desktop))",
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
