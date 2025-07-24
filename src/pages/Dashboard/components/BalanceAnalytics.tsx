"use client";

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

// 2. Updated chartConfig to reflect the new data keys and colors
const chartConfig = {
  paidAmount: {
    label: "Paid Invoices",
    color: "var(--chart-1)", // Using a specific color variable
  },
  outstandingAmount: {
    label: "Outstanding Invoices",
    color: "var(--chart-5)", // Using another specific color variable
  },
} satisfies ChartConfig;

// Make sure you have these CSS variables defined in your global CSS
// Example:
// :root {
//   --chart-paid: 142 71% 45%; // A green for paid
//   --chart-outstanding: 22 93% 66%; // An orange for outstanding
// }

export default function BalanceAnalytics() {
  const { t } = useTranslation();

  // 3. Updated `useMemo` to calculate ticks based on both data sets
  const { dynamicTicks, minValue, maxValue } = useMemo(() => {
    // Collect values from both paidAmount and outstandingAmount
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
      {/* 5. Updated the title to reflect the new graph purpose */}
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
            tickFormatter={(value) => `$${value}`}
          />
          {/* 4. Updated ChartTooltip to display both values */}
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-md border-0 bg-slate-800 px-3 py-2 text-white shadow-lg">
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
                        {item.name}: ${item.value?.toLocaleString() || 0}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />

          {/* 2. Added a second Area component for "Outstanding" invoices */}
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

// import { useMemo } from "react";

// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
// import {
//   type ChartConfig,
//   ChartContainer,
//   ChartTooltip,
// } from "@/components/ui/chart";
// import { calculateTicks } from "../utils/calculateTicks";
// import { useTranslation } from "react-i18next";

// const chartData = [
//   { month: "January", desktop: 120 },
//   { month: "February", desktop: 205 },
//   { month: "March", desktop: 170 },
//   { month: "April", desktop: 173 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 250 },
//   { month: "July", desktop: 214 },
//   { month: "August", desktop: 230 },
//   { month: "September", desktop: 275 },
//   { month: "October", desktop: 175 },
//   { month: "November", desktop: 275 },
// ];
// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;

// export default function BalanceAnalytics() {
//   const { t } = useTranslation();

//   // Calculate dynamic values from data
//   const { dynamicTicks, minValue, maxValue } = useMemo(() => {
//     const values = chartData.map((item) => item.desktop);
//     const dataMin = Math.min(...values);
//     const dataMax = Math.max(...values);

//     // Add some padding (10% on each side)
//     const padding = (dataMax - dataMin) * 0.1;
//     const paddedMin = Math.max(0, dataMin - padding);
//     const paddedMax = dataMax + padding;

//     const { ticks, niceMin, niceMax } = calculateTicks(paddedMin, paddedMax, 6);

//     return {
//       dynamicTicks: ticks,
//       minValue: niceMin,
//       maxValue: niceMax,
//     };
//   }, []);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-lg font-semibold">{t("balance_analytics_title")}</h1>

//       {/* Balance Abalytics Area Chart */}
//       <ChartContainer config={chartConfig} className="h-80 w-full">
//         <AreaChart
//           accessibilityLayer
//           data={chartData}
//           margin={{
//             left: 0,
//             right: 10,
//           }}
//         >
//           <CartesianGrid
//             vertical={true}
//             strokeDasharray="12 4"
//             strokeWidth={0.5}
//             stroke="var(--color-border)"
//           />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             axisLine={false}
//             tickMargin={10}
//             // tickFormatter={(value) => value.slice(0, 3)}
//             tickFormatter={(value) =>
//               t(`balance_analytics_months_short.${value}`)
//             }
//           />
//           <YAxis
//             ticks={dynamicTicks}
//             domain={[minValue, maxValue]}
//             axisLine={false}
//             tickLine={{
//               strokeWidth: 0.5,
//               stroke: "var(--color-border)",
//             }}
//             tickMargin={5}
//             tickFormatter={(value) => `$${value.toFixed(1)}`}
//           />
//           <ChartTooltip
//             cursor={false}
//             content={({ active, payload }) => {
//               if (active && payload && payload.length) {
//                 return (
//                   <div className="rounded-md border-0 bg-slate-800 px-3 py-2 text-white shadow-lg">
//                     <div className="mb-1 text-xs text-slate-300">
//                       {t("balance_analytics_chart_label")}
//                     </div>
//                     <div className="text-sm font-semibold">
//                       ${payload[0].value?.toLocaleString() || 0}
//                     </div>
//                   </div>
//                 );
//               }
//               return null;
//             }}
//           />

//           <Area
//             dataKey="desktop"
//             type="linear"
//             fill="none"
//             stroke="var(--color-desktop)"
//             strokeWidth={5}
//             activeDot={{
//               r: 8,
//               strokeWidth: 3,
//             }}
//             style={{
//               filter: "drop-shadow(0 0 10px var(--color-desktop))",
//             }}
//           />
//         </AreaChart>
//       </ChartContainer>
//     </div>
//   );
// }
