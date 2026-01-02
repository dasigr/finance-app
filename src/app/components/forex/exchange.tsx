"use client";

import { useEffect, useState } from "react";

export function ForexExchange() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/forex")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <p>{data["base"]}: 1<br />
        PHP: {data["result"]["PHP"]}
      </p>
    </>
  );
}
