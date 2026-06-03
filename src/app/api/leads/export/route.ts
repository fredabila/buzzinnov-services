import { NextRequest, NextResponse } from "next/server";
import { getRunCsv } from "@/lib/lead-engine/storage";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const runId = request.nextUrl.searchParams.get("runId");
  if (!runId) {
    return NextResponse.json({ error: "runId is required." }, { status: 400 });
  }

  const csv = await getRunCsv(runId);
  if (!csv) {
    return NextResponse.json({ error: "Run not found." }, { status: 404 });
  }

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="buzz-leads-${runId}.csv"`,
    },
  });
}
