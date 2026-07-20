import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = {
    status: "ok",
    timestamp: Date.now(),
    uptime: process.uptime(),
    memory: process.memoryUsage().rss,
  };
  return NextResponse.json(health, {
    headers: {
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
