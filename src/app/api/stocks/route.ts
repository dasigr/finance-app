import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "AAPL";

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // cache for 1 minute
  });

  const data = await res.json();

  return NextResponse.json(data);
}
