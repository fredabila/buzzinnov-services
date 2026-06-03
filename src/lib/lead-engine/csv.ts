import type { LeadRecord } from "./types";

const headers = [
  "Business Name",
  "Website",
  "Phone",
  "Rating",
  "Issues",
  "Website Score",
  "Opportunity Level",
  "Outreach Email",
];

function escapeCsv(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function recordsToCsv(records: LeadRecord[]) {
  const rows = records.map((record) => [
    record.lead.business_name,
    record.lead.website ?? "",
    record.lead.phone ?? "",
    record.lead.rating ?? "",
    record.audit.issues.join("; "),
    record.audit.website_score,
    record.audit.business_potential,
    `Subject: ${record.outreach.subject}\n\n${record.outreach.body}`,
  ]);

  return [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
}
