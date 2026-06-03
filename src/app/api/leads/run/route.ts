import { NextRequest, NextResponse } from "next/server";
import { runLeadPipeline } from "@/lib/lead-engine/pipeline";
import type { LeadSearchInput } from "@/lib/lead-engine/types";

export const runtime = "nodejs";
export const maxDuration = 300;

function parseInput(body: Partial<LeadSearchInput>): LeadSearchInput {
  const searchTerm = body.searchTerm?.trim();
  if (!searchTerm) {
    throw new Error("searchTerm is required.");
  }

  return {
    searchTerm,
    location: body.location?.trim() || undefined,
    radius: body.radius ? Number(body.radius) : undefined,
    maxResults: body.maxResults ? Math.min(Math.max(Number(body.maxResults), 1), 1000) : 40,
    batchSize: body.batchSize ? Math.min(Math.max(Number(body.batchSize), 1), 20) : 6,
    useMockData: Boolean(body.useMockData),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<LeadSearchInput>;
    const input = parseInput(body);
    const run = await runLeadPipeline(input);
    return NextResponse.json(run, { status: run.status === "failed" ? 400 : 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to run lead pipeline." },
      { status: 400 },
    );
  }
}
