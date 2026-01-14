import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from_currency = searchParams.get("from_currency") ?? "USD";
  const to_currency = searchParams.get("to_currency") ?? "PHP";

  const data = {
    "Realtime Currency Exchange Rate": {
      "5. Exchange Rate": 59.52
    }
  }

  // const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from_currency}&to_currency=${to_currency}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`;

  // const res = await fetch(url, {
  //   next: { revalidate: 60 }, // cache for 1 minute
  // });

  // const data = await res.json();

  return NextResponse.json(data);
}
