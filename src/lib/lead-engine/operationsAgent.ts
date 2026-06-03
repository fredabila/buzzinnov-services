import type { BusinessLead, OperationsAnalysis, PresenceResearch, WebsiteAudit } from "./types";

function includesAny(values: string[], terms: string[]) {
  const text = values.join(" ").toLowerCase();
  return terms.some((term) => text.includes(term));
}

export function analyzeOperations(lead: BusinessLead, audit: WebsiteAudit, presence: PresenceResearch): OperationsAnalysis {
  const issues: string[] = [];
  const opportunities: string[] = [];
  const systems: string[] = [];

  const websiteIssues = audit.issues.map((issue) => issue.toLowerCase());
  const hasPhone = Boolean(lead.phone);
  const hasWebsite = Boolean(lead.website);
  const hasBookingIssue = includesAny(websiteIssues, ["booking system", "appointment"]);
  const hasFormIssue = includesAny(websiteIssues, ["contact form"]);
  const weakSeo = audit.issues.includes("Weak SEO metadata") || presence.seo_issues.length > 0;

  if (!hasPhone) {
    issues.push("No phone number captured from Google listing");
    opportunities.push("Add tracked call capture and missed-call SMS follow-up");
    systems.push("Call tracking and missed-call text-back workflow");
  }

  if (!hasWebsite) {
    issues.push("No owned website for enquiries");
    opportunities.push("Build a simple conversion site with lead forms, call tracking, and CRM sync");
    systems.push("Lead capture website connected to CRM");
  }

  if (hasBookingIssue) {
    issues.push("Manual appointment handling likely creates admin work");
    opportunities.push("Add online booking, reminders, and rescheduling automation");
    systems.push("Booking system with calendar sync and SMS/email reminders");
  }

  if (hasFormIssue) {
    issues.push("No obvious website enquiry form");
    opportunities.push("Capture enquiries into a CRM and auto-assign follow-up tasks");
    systems.push("CRM pipeline with enquiry routing");
  }

  if (weakSeo) {
    issues.push("Search visibility and local SEO can be improved");
    opportunities.push("Create local landing pages, service pages, metadata fixes, and review prompts");
    systems.push("Local SEO and review generation workflow");
  }

  if (lead.review_count >= 10 && lead.review_count < 50) {
    issues.push("Review count is active but still has room to grow");
    opportunities.push("Automate post-visit review requests to improve trust and Maps conversion");
    systems.push("Review request automation");
  }

  if (presence.provider !== "not_configured" && presence.brand_results.filter((result) => result.source === "directory").length >= 2) {
    issues.push("Directories may be owning too much of the branded search journey");
    opportunities.push("Strengthen owned website, Google profile, and review assets so traffic does not leak");
    systems.push("Brand search cleanup and listing management");
  }

  if (issues.length === 0) {
    issues.push("No obvious operations gap detected from public data");
    opportunities.push("Offer a workflow audit covering enquiry response time, lead follow-up, and reporting");
    systems.push("Operations audit and CRM reporting dashboard");
  }

  const operationsScore = Math.min(100, Math.max(15, issues.length * 14 + opportunities.length * 8));
  const hookSummary = `${lead.business_name} can likely be approached around ${opportunities
    .slice(0, 2)
    .map((opportunity) => opportunity.toLowerCase())
    .join(" and ")}. The pitch should be practical: reduce admin, capture more enquiries, and improve follow-up.`;

  return {
    operations_score: operationsScore,
    issues: [...new Set(issues)],
    automation_opportunities: [...new Set(opportunities)],
    recommended_systems: [...new Set(systems)],
    hook_summary: hookSummary,
  };
}
