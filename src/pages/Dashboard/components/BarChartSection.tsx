import { Button } from "@/components/ui/button";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

// const monthOptions: SelectOption[] = [
//   { value: "monthly", label: "Monthly" },
//   // { value: "yearly", label: "yearly" },
// ];

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function BarChartSection() {
  const { t } = useTranslation();
  // const [selected, setSelected] = useState<string>("monthly");

  // const handleMonthChange = (value: string) => {
  //   console.log("Selected month:", value);
  //   setSelected(value);
  // };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">{t("bar_chart.title")}</h4>
        <h2 className="text-lg font-bold text-black">
          {t("bar_chart.amount")}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          disabled
          className="gap-[1px] bg-[#D6FBE6] text-xs font-semibold text-[#31B099]"
        >
          <ArrowUpRight /> +3.12%
        </Button>
        <p className="text-sm font-normal">{t("bar_chart.growth_label")}</p>
      </div>

      <div className="mt-4 space-y-2">
        {/* <SelectInput
          options={monthOptions}
          placeholder="Select a month"
          value={selected}
          onValueChange={handleMonthChange}
          triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        /> */}

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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={0} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
