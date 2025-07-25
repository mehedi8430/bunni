import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { ArrowUpRight } from "lucide-react";
// import { useTranslation } from "react-i18next";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", pastDueAmount: 9600 },
  { month: "February", pastDueAmount: 20500 },
  { month: "March", pastDueAmount: 20000 },
  { month: "April", pastDueAmount: 17300 },
  { month: "May", pastDueAmount: 20900 },
  { month: "June", pastDueAmount: 21400 },
];

const chartConfig = {
  pastDueAmount: {
    label: "Past Due Amount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AreaChartSection() {
  // const { t } = useTranslation();

  const totalPastDue = 45224;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Past Due Invoices</h4>
        <h2 className="text-lg font-bold text-black">
          ${totalPastDue.toLocaleString()}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled
          className="gap-[1px] bg-red-200 text-xs font-semibold text-red-600"
        >
          <ArrowUpRight /> +3.12%
        </Button>
        <p className="text-sm font-normal">Past due amount since last month</p>
      </div>

      <div className="mt-4 space-y-2">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
          >
            <defs>
              <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pastDueAmount)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pastDueAmount)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="month" hide />
            <Area
              dataKey="pastDueAmount"
              type="linear"
              fill="url(#fillColor)"
              fillOpacity={1}
              stroke="var(--color-pastDueAmount)"
              strokeWidth={3}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "var(--color-pastDueAmount)",
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
