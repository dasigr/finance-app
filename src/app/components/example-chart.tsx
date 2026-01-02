"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart"

const chartData = [
  { month: "January", income: 141348.50, expense: 78801.16 },
  { month: "February", income: 132587.50, expense: 87913.47 },
  { month: "March", income: 151373.50, expense: 101080.05 },
  { month: "April", income: 155834.50, expense: 145273.27 },
  { month: "May", income: 159141.97, expense: 101543.81 },
  { month: "June", income: 270093.19, expense: 268586.34 },
  { month: "July", income: 165602.20, expense: 134672.42 },
  { month: "August", income: 166762.66, expense: 194123.27 },
  { month: "September", income: 158339.09, expense: 126766.79 },
  { month: "October", income: 161789.19, expense: 116404.27 },
  { month: "November", income: 145295.19, expense: 120778.37 },
  { month: "December", income: 314792.88, expense: 179924.06 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "#16a34a",
  },
  expense: {
    label: "Expense",
    color: "#f87171",
  },
} satisfies ChartConfig

export function ExampleChart() {
  return (
    <>
      <h4 className="mb-2">Income vs Expenses</h4>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  )
}
