import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "AAPL";

  const url = `https://api.a5project.com/portfolio?symbol=${symbol}`;

  // const res = await fetch(url, {
  //   next: { revalidate: 60 }, // cache for 1 minute
  // });

  // const data = await res.json();
  const data: any = [
    {
      "symbol": "TSLA",
      "shares": 225.7299
    }
  ];

  return NextResponse.json(data);
}
