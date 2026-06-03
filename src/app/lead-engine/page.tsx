"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Loader2, Play, RefreshCw, Search, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { PipelineRun } from "@/lib/lead-engine/types";

type RunSummary = Omit<PipelineRun, "records">;

const levelStyles = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-slate-200 bg-slate-50 text-slate-700",
};

export default function LeadEnginePage() {
  const [searchTerm, setSearchTerm] = useState("dentists in Manchester");
  const [location, setLocation] = useState("");
  const [maxResults, setMaxResults] = useState(20);
  const [batchSize, setBatchSize] = useState(6);
  const [useMockData, setUseMockData] = useState(false);
  const [run, setRun] = useState<PipelineRun | null>(null);
  const [runs, setRuns] = useState<RunSummary[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const latestCsvUrl = useMemo(() => (run ? `/api/leads/export?runId=${encodeURIComponent(run.id)}` : null), [run]);

  async function refreshRuns() {
    const response = await fetch("/api/leads/runs", { cache: "no-store" });
    if (response.ok) {
      const payload = (await response.json()) as { runs: RunSummary[] };
      setRuns(payload.runs);
    }
  }

  useEffect(() => {
    void refreshRuns();
  }, []);

  async function startRun() {
    setIsRunning(true);
    setError(null);
    setRun(null);

    try {
      const response = await fetch("/api/leads/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          searchTerm,
          location: location || undefined,
          maxResults,
          batchSize,
          useMockData,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? payload.errors?.join(", ") ?? "Pipeline run failed.");
      }
      setRun(payload as PipelineRun);
      await refreshRuns();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Pipeline run failed.");
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Navbar />
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
              <Sparkles className="size-3.5" />
              Buzz Innovations Ltd
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Lead generation and outreach engine</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Find local businesses, audit their website presence, generate a practical opportunity score, and export personalized outreach for CRM import.
            </p>
          </div>
          {latestCsvUrl ? (
            <Link href={latestCsvUrl} className={cn(buttonVariants(), "h-10 gap-2 bg-slate-950 px-4 text-white hover:bg-slate-800")}>
                <Download className="size-4" />
                Export CSV
            </Link>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Pipeline</h2>
              <Button variant="ghost" size="icon-sm" onClick={refreshRuns} title="Refresh runs">
                <RefreshCw className="size-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Search term
                <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="mt-1 h-10" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Location
                <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Optional" className="mt-1 h-10" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium text-slate-700">
                  Max results
                  <Input
                    type="number"
                    min={1}
                    max={1000}
                    value={maxResults}
                    onChange={(event) => setMaxResults(Number(event.target.value))}
                    className="mt-1 h-10"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Batch size
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={batchSize}
                    onChange={(event) => setBatchSize(Number(event.target.value))}
                    className="mt-1 h-10"
                  />
                </label>
              </div>
              <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                Demo data
                <input
                  type="checkbox"
                  checked={useMockData}
                  onChange={(event) => setUseMockData(event.target.checked)}
                  className="size-4 accent-slate-950"
                />
              </label>
              <Button onClick={startRun} disabled={isRunning} className="h-10 w-full gap-2 bg-slate-950 text-white hover:bg-slate-800">
                {isRunning ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
                Run pipeline
              </Button>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Recent runs</h3>
              <div className="space-y-2">
                {runs.slice(0, 6).map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-slate-800">{item.search.searchTerm}</p>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{item.lead_count}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                      <span>{new Date(item.created_at).toLocaleString()}</span>
                      <Link className="font-medium text-sky-700 hover:text-sky-900" href={`/api/leads/export?runId=${encodeURIComponent(item.id)}`}>
                        CSV
                      </Link>
                    </div>
                  </div>
                ))}
                {runs.length === 0 ? <p className="text-sm text-slate-500">No runs yet.</p> : null}
              </div>
            </div>
          </aside>

          <section className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h2 className="font-semibold text-slate-950">Lead output</h2>
                <p className="text-sm text-slate-500">{run ? `${run.lead_count} records generated` : "Run a search to generate CRM-ready leads."}</p>
              </div>
              <Search className="size-5 text-slate-400" />
            </div>

            {error ? <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
            {run?.errors.length ? (
              <div className="m-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{run.errors.join(" ")}</div>
            ) : null}

            <div className="divide-y divide-slate-200">
              {run?.records.map((record) => (
                <article key={record.id} className="grid gap-4 p-4 xl:grid-cols-[1fr_360px]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-lg font-semibold text-slate-950">{record.lead.business_name}</h3>
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${levelStyles[record.audit.business_potential]}`}>
                        {record.audit.business_potential}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                        {record.audit.website_score}/100
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span>{record.lead.phone ?? "No phone"}</span>
                      <span>{record.lead.rating ? `${record.lead.rating} rating` : "No rating"}</span>
                      <span>{record.lead.review_count} reviews</span>
                      <span>{record.lead.website ?? "No website"}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{record.audit.opportunity_summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {record.audit.issues.map((issue) => (
                        <span key={issue} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-2 text-sm font-semibold text-slate-700">{record.outreach.subject}</p>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{record.outreach.body}</pre>
                  </div>
                </article>
              ))}
            </div>

            {!run && !isRunning ? (
              <div className="flex min-h-[360px] items-center justify-center px-6 text-center text-sm text-slate-500">
                Results will appear here after the scraper, audit agent, and outreach generator finish.
              </div>
            ) : null}
            {isRunning ? (
              <div className="flex min-h-[360px] items-center justify-center gap-3 px-6 text-sm text-slate-600">
                <Loader2 className="size-5 animate-spin" />
                Running Google Places scrape, website audits, and outreach generation.
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}
