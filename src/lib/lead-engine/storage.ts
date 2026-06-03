import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PipelineRun } from "./types";
import { recordsToCsv } from "./csv";

const dataRoot = path.join(process.cwd(), "data", "lead-engine");
const runsRoot = path.join(dataRoot, "runs");
const exportsRoot = path.join(dataRoot, "exports");

async function ensureStorage() {
  await mkdir(runsRoot, { recursive: true });
  await mkdir(exportsRoot, { recursive: true });
}

export async function savePipelineRun(run: PipelineRun) {
  if (process.env.LEAD_STORAGE === "postgres" && process.env.DATABASE_URL) {
    await savePostgresRun(run);
  }

  await ensureStorage();
  await writeFile(path.join(runsRoot, `${run.id}.json`), JSON.stringify(run, null, 2), "utf8");
  await writeFile(path.join(exportsRoot, `${run.id}.csv`), recordsToCsv(run.records), "utf8");
}

export async function getPipelineRun(runId: string): Promise<PipelineRun | null> {
  try {
    const raw = await readFile(path.join(runsRoot, `${runId}.json`), "utf8");
    return JSON.parse(raw) as PipelineRun;
  } catch {
    return null;
  }
}

export async function listPipelineRuns(): Promise<Omit<PipelineRun, "records">[]> {
  await ensureStorage();
  const files = await readdir(runsRoot);
  const runs = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const raw = await readFile(path.join(runsRoot, file), "utf8");
        const { records: _records, ...summary } = JSON.parse(raw) as PipelineRun;
        return summary;
      }),
  );

  return runs.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getRunCsv(runId: string) {
  try {
    return await readFile(path.join(exportsRoot, `${runId}.csv`), "utf8");
  } catch {
    const run = await getPipelineRun(runId);
    return run ? recordsToCsv(run.records) : null;
  }
}

async function savePostgresRun(run: PipelineRun) {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return;
  }

  const importer = new Function("specifier", "return import(specifier)") as (specifier: string) => Promise<{
    Client: new (options: { connectionString: string }) => {
      connect: () => Promise<void>;
      query: (sql: string, params?: unknown[]) => Promise<unknown>;
      end: () => Promise<void>;
    };
  }>;

  const { Client } = await importer("pg");
  const client = new Client({ connectionString });
  await client.connect();
  try {
    await client.query(`
      create table if not exists lead_engine_runs (
        id text primary key,
        search jsonb not null,
        status text not null,
        lead_count integer not null,
        errors jsonb not null,
        created_at timestamptz not null,
        completed_at timestamptz not null
      );
    `);
    await client.query(`
      create table if not exists lead_engine_records (
        id text primary key,
        run_id text not null references lead_engine_runs(id) on delete cascade,
        lead jsonb not null,
        audit jsonb not null,
        outreach jsonb not null,
        created_at timestamptz not null
      );
    `);
    await client.query(
      `insert into lead_engine_runs (id, search, status, lead_count, errors, created_at, completed_at)
       values ($1, $2::jsonb, $3, $4, $5::jsonb, $6, $7)
       on conflict (id) do update set search = excluded.search, status = excluded.status, lead_count = excluded.lead_count, errors = excluded.errors, completed_at = excluded.completed_at`,
      [run.id, JSON.stringify(run.search), run.status, run.lead_count, JSON.stringify(run.errors), run.created_at, run.completed_at],
    );

    for (const record of run.records) {
      await client.query(
        `insert into lead_engine_records (id, run_id, lead, audit, outreach, created_at)
         values ($1, $2, $3::jsonb, $4::jsonb, $5::jsonb, $6)
         on conflict (id) do update set lead = excluded.lead, audit = excluded.audit, outreach = excluded.outreach`,
        [record.id, record.run_id, JSON.stringify(record.lead), JSON.stringify(record.audit), JSON.stringify(record.outreach), record.created_at],
      );
    }
  } finally {
    await client.end();
  }
}
