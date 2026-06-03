import type { BusinessLead, OutreachEmail, WebsiteAudit } from "./types";

function pickIssues(audit: WebsiteAudit) {
  const usable = audit.issues.filter((issue) => issue !== "No major conversion issues detected");
  return (usable.length ? usable : ["A few small website conversion improvements", "Local SEO could be stronger", "The enquiry journey could be clearer"]).slice(0, 3);
}

export function generateOutreachEmail(lead: BusinessLead, audit: WebsiteAudit): OutreachEmail {
  const issues = pickIssues(audit);
  const issueLines = issues.map((issue) => `- ${issue}`).join("\n");

  return {
    subject: `Quick idea for ${lead.business_name}`,
    body: `Hi there,

I came across ${lead.business_name} online and took a quick look at ${lead.website ? "your website" : "your Google listing"}.

I noticed a few things that could be affecting enquiries:

${issueLines}

I put together a few practical ideas that could help improve visibility and increase customer enquiries.

Would you like me to send them over?

Best,
Buzz Innovations Ltd`,
  };
}
