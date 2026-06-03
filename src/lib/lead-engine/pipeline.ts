import { auditWebsite } from "./auditAgent";
import { scrapeGooglePlaces } from "./googlePlaces";
import { generateOutreachEmail } from "./outreachAgent";
import { savePipelineRun } from "./storage";
import type { LeadRecord, LeadSearchInput, PipelineRun } from "./types";

function runId() {
  return `run_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function recordId(placeId: string) {
  return `lead_${placeId.replace(/[^a-z0-9_-]/gi, "_")}`;
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>) {
  const results: R[] = [];
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

export async function runLeadPipeline(input: LeadSearchInput): Promise<PipelineRun> {
  const started = new Date().toISOString();
  const id = runId();
  const errors: string[] = [];
  let records: LeadRecord[] = [];
  let status: PipelineRun["status"] = "completed";

  try {
    const leads = await scrapeGooglePlaces(input);
    const batchSize = Math.min(Math.max(input.batchSize ?? 6, 1), 20);

    records = await mapWithConcurrency(leads, batchSize, async (lead) => {
      try {
        const audit = await auditWebsite(lead);
        const outreach = generateOutreachEmail(lead, audit);
        return {
          id: recordId(lead.place_id),
          run_id: id,
          lead,
          audit,
          outreach,
          created_at: new Date().toISOString(),
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown audit error";
        errors.push(`${lead.business_name}: ${message}`);
        const audit = await auditWebsite({ ...lead, website: null });
        return {
          id: recordId(lead.place_id),
          run_id: id,
          lead,
          audit,
          outreach: generateOutreachEmail(lead, audit),
          created_at: new Date().toISOString(),
        };
      }
    });
  } catch (error) {
    status = "failed";
    errors.push(error instanceof Error ? error.message : "Unknown pipeline error");
  }

  const run: PipelineRun = {
    id,
    search: input,
    status,
    lead_count: records.length,
    created_at: started,
    completed_at: new Date().toISOString(),
    records,
    errors,
  };

  await savePipelineRun(run);
  return run;
}
