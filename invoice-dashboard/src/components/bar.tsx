"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis } from "recharts"
import { useTheme } from "next-themes"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type InvoiceByDate = {
  date: string
  count: number
}

const chartConfig = {
  invoices: {
    label: "Invoices",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Chart2({ data }: { data: InvoiceByDate[] }) {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(true)
  }, [])

  if (!isDark) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices Over Time</CardTitle>
        <CardDescription>Monthly uploads</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
          <XAxis
  dataKey="date"
  tickLine={false}
  tickMargin={10}
  axisLine={false}
  tickFormatter={(value) =>
    new Date(`${value}-02`).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    })
  }
/>

            <Bar
              dataKey="count"
              stackId="a"
              fill="hsl(var(--chart-1))"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
