"use client";

import { useEffect, useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart"

type ChartData = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const chartConfig = {
  open: {
    label: "Open",
    color: "#16a34a",
  },
  close: {
    label: "Close",
    color: "#258afe",
  },
} satisfies ChartConfig

export function StockDaily() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch("/api/stocks?symbol=TSLA")
      .then(res => res.json())
      .then(json => {
        const series = json["Time Series (Daily)"];
        if (!series) return;

        const parsed = Object.entries(series)
          .map(([date, values]: any) => ({
            date,
            open: parseFloat(values["1. open"]),
            high: parseFloat(values["2. high"]),
            low: parseFloat(values["3. low"]),
            close: parseFloat(values["4. close"]),
            volume: parseFloat(values["5. volume"]),
          }))
          .slice(0, 90) // last 90 days
          .reverse();

        setData(parsed);
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <h4 className="mb-4">TSLA - Daily Close</h4>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="close"
            stroke="var(--color-close)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
