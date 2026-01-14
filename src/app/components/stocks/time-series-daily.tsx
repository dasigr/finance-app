"use client";

import { useEffect, useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart"
import { formatCurrency } from "@/app/lib/utils";

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

const symbol = "TSLA"
const from_currency = "USD"
const to_currency = "PHP"

export function StockDaily() {
  const [portfolioData, setPortfolio] = useState<any>(null);
  const [stocksData, setStocks] = useState<ChartData[]>([]);
  const [exchangeData, setExchange] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioRes, stocksRes, exchangeRes] = await Promise.all([
          fetch(`/api/portfolio?symbol=${symbol}`),
          fetch(`/api/stocks?symbol=${symbol}`),
          fetch(`/api/forex?from_currency=${from_currency}&to_currency=${to_currency}`),
        ]);

        const [portfolioData, stocksData, exchangeData] = await Promise.all([
          portfolioRes.json(),
          stocksRes.json()
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

                      setStocks(parsed);
                    }),
          exchangeRes.json(),
        ]);

        setPortfolio(portfolioData);
        setExchange(exchangeData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const shares = portfolioData[0]["shares"]
  const lastClose: any = stocksData.at(-1)
  const forex = exchangeData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]

  return (
    <>
      <h4 className="mb-2">TSLA - Daily Close</h4>
      { lastClose && 
      <>
        <p className="mb-2 text-sm">
          Close: {lastClose["close"]}<br />
          Date: {lastClose["date"]}
        </p>
        <p className="mb-2 text-sm">
          Shares: {shares}<br />
          USD to PHP: {forex}<br />
          Portfolio: <strong>{formatCurrency(lastClose["close"] * shares * forex * 100)}</strong>
        </p>
      </>
      }
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <LineChart data={stocksData}>
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
