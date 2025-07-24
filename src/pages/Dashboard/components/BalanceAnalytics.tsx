import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { calculateTicks } from "../utils/calculateTicks";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const chartData = [
  { month: "January", paidAmount: 120, outstandingAmount: 50 },
  { month: "February", paidAmount: 205, outstandingAmount: 75 },
  { month: "March", paidAmount: 170, outstandingAmount: 90 },
  { month: "April", paidAmount: 173, outstandingAmount: 60 },
  { month: "May", paidAmount: 209, outstandingAmount: 110 },
  { month: "June", paidAmount: 250, outstandingAmount: 80 },
  { month: "July", paidAmount: 214, outstandingAmount: 130 },
  { month: "August", paidAmount: 230, outstandingAmount: 70 },
  { month: "September", paidAmount: 275, outstandingAmount: 150 },
  { month: "October", paidAmount: 175, outstandingAmount: 95 },
  { month: "November", paidAmount: 275, outstandingAmount: 120 },
  { month: "December", paidAmount: 300, outstandingAmount: 100 },
];

const chartConfig = {
  paidAmount: {
    label: "Paid Invoices",
    color: "var(--chart-1)",
  },
  outstandingAmount: {
    label: "Outstanding Invoices",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function BalanceAnalytics() {
  const { t } = useTranslation();

  const { dynamicTicks, minValue, maxValue } = useMemo(() => {
    const paidValues = chartData.map((item) => item.paidAmount);
    const outstandingValues = chartData.map((item) => item.outstandingAmount);
    const allValues = [...paidValues, ...outstandingValues];

    const dataMin = Math.min(...allValues);
    const dataMax = Math.max(...allValues);

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
      <h1 className="text-lg font-semibold">
        {t("Paid vs Outstanding Invoices")}
      </h1>

      <ChartContainer config={chartConfig} className="h-80 w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 10,
          }}
        >
          <CartesianGrid
            vertical={true}
            strokeDasharray="12 4"
            strokeWidth={0.5}
            stroke="var(--color-border)"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) =>
              t(`balance_analytics_months_short.${value}`)
            }
          />
          <YAxis
            ticks={dynamicTicks}
            domain={[minValue, maxValue]}
            axisLine={false}
            tickLine={{
              strokeWidth: 0.5,
              stroke: "var(--color-border)",
            }}
            tickMargin={5}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="space-y-1 rounded-md border-0 bg-slate-800 px-3 py-2 text-white shadow-lg">
                    <div className="mb-1 text-xs text-slate-300">
                      {payload[0].payload.month}
                    </div>
                    {payload.map((item) => (
                      <div
                        key={item.dataKey}
                        className={cn(
                          "text-sm font-semibold",
                          `text-[var(--color-${item.dataKey})]`,
                        )}
                      >
                        {item.name === "paidAmount"
                          ? "Paid Invoices"
                          : "Outstanding Invoices"}
                        : {item.value?.toLocaleString() || 0}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            dataKey="outstandingAmount"
            type="linear"
            fill="none"
            stroke="var(--color-outstandingAmount)"
            strokeWidth={5}
            activeDot={{
              r: 8,
              strokeWidth: 3,
            }}
            style={{
              filter: "drop-shadow(0 0 10px var(--color-outstandingAmount))",
            }}
          />
          <Area
            dataKey="paidAmount"
            type="linear"
            fill="none"
            stroke="var(--color-paidAmount)"
            strokeWidth={5}
            activeDot={{
              r: 8,
              strokeWidth: 3,
            }}
            style={{
              filter: "drop-shadow(0 0 10px var(--color-paidAmount))",
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
