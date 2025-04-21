"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector, Cell } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PieChartByVendor({ data }: { data: { name: string; value: number }[] }) {
  const id = "pie-by-vendor";
  const [activeVendor, setActiveVendor] = React.useState(data[0]?.name ?? "");

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.name === activeVendor),
    [activeVendor, data]
  );

  const keys = React.useMemo(() => data.map((item) => item.name), [data]);

  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((item, index) => [
      item.name.toLowerCase(),
      {
        label: item.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      },
    ])
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Invoices by Vendor</CardTitle>
          <CardDescription>Distribution by total spend</CardDescription>
        </div>
        <Select value={activeVendor} onValueChange={setActiveVendor}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select vendor"
          >
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {keys.map((key) => {
              const config = chartConfig[key.toLowerCase()];
              return (
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key.toLowerCase()})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                          ${data[activeIndex]?.value.toFixed(2)}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
