import { NextResponse } from "next/server";
import { listPipelineRuns } from "@/lib/lead-engine/storage";

export const runtime = "nodejs";

export async function GET() {
  const runs = await listPipelineRuns();
  return NextResponse.json({ runs });
}
