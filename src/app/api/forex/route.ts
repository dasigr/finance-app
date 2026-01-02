import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = `https://api.fastforex.io/fetch-one?from=USD&to=PHP`;

  const res = await fetch(url, {
    headers: {
      "X-API-Key": `${process.env.FAST_FOREX_API_KEY}`,
    },
    next: { revalidate: 60 }, // cache for 1 minute
  });

  const data = await res.json();

  return NextResponse.json(data);
}
