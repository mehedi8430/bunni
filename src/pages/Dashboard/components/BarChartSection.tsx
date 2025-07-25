import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", totalSales: 18600 },
  { month: "February", totalSales: 30500 },
  { month: "March", totalSales: 23700 },
  { month: "April", totalSales: 7300 },
  { month: "May", totalSales: 20900 },
  { month: "June", totalSales: 21400 },
];

const chartConfig = {
  totalSales: {
    label: "Total Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function BarChartSection() {
  const { t } = useTranslation();

  const totalAmount = chartData
    .reduce((sum, item) => sum + item.totalSales, 0)
    .toLocaleString();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{t("bar_chart.title")}</h4>
        <h2 className="text-lg font-bold text-black">${totalAmount}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled
          className="gap-[1px] bg-[#D6FBE6] text-xs font-semibold text-[#31B099]"
        >
          <ArrowUpRight /> +3.12%
        </Button>
        <p className="text-sm font-normal">Total sales since last month</p>
      </div>

      <div className="mt-4 space-y-2">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
            barSize={30}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar
              dataKey="totalSales"
              fill="var(--color-totalSales)"
              radius={0}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
