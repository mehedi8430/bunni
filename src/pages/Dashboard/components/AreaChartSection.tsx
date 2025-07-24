import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// const monthOptions: SelectOption[] = [
//   { value: "monthly", label: "Monthly" },
//   // { value: "yearly", label: "yearly" },
// ];

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
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Total Invoice Amount</h4>
        <h2 className="text-lg font-bold text-black">$8,527,224</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled
          className="gap-[1px] bg-red-200 text-xs font-semibold text-red-600"
        >
          <ArrowUpRight /> +3.12%
        </Button>
        <p className="text-sm font-normal">{t("bar_chart.growth_label")}</p>
      </div>

      <div className="mt-4 space-y-2">
        {/* <SelectInput
          options={monthOptions}
          placeholder="Select a month"
          triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        /> */}

        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 0, right: 8, left: 8, bottom: 4 }}
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
