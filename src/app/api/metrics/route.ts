import { NextResponse } from "next/server";
import { cacheGet } from "@/lib/cache";
import { metrics } from "@/data/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await cacheGet("api:metrics", async () => metrics, 300);
  return NextResponse.json(data);
}
