import type { BusinessLead, OperationsAnalysis, OutreachEmail, PresenceResearch, WebsiteAudit } from "./types";

function pickIssues(audit: WebsiteAudit, presence: PresenceResearch, operations: OperationsAnalysis) {
  const combined = [
    ...audit.issues.filter((issue) => issue !== "No major conversion issues detected"),
    ...presence.seo_issues.filter((issue) => issue !== "Google brand search is not configured"),
    ...operations.issues,
  ];

  const fallback = [
    "A few small website conversion improvements",
    "Local SEO could be stronger",
    "The enquiry and follow-up journey could be easier to automate",
  ];

  return [...new Set(combined.length ? combined : fallback)].slice(0, 3);
}

export function generateOutreachEmail(
  lead: BusinessLead,
  audit: WebsiteAudit,
  presence: PresenceResearch,
  operations: OperationsAnalysis,
): OutreachEmail {
  const issues = pickIssues(audit, presence, operations);
  const issueLines = issues.map((issue) => `- ${issue}`).join("\n");
  const systemHook = operations.recommended_systems[0] ?? "a simple enquiry follow-up system";

  return {
    subject: `Quick idea for ${lead.business_name}`,
    body: `Hi there,

I came across ${lead.business_name} online and took a quick look at ${lead.website ? "your website and Google presence" : "your Google listing and search presence"}.

I noticed a few things that could be affecting enquiries or adding admin work:

${issueLines}

One practical angle could be ${systemHook.toLowerCase()} so more enquiries are captured and followed up without extra manual work.

Would you like me to send over a few specific ideas?

Best,
Buzz Innovations Ltd`,
  };
}
