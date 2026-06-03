import type { BusinessLead, OpportunityLevel, WebsiteAudit } from "./types";

type Issue = {
  label: string;
  weight: number;
};

const CTA_TERMS = [
  "book",
  "booking",
  "appointment",
  "call now",
  "contact",
  "get a quote",
  "request",
  "enquire",
  "consultation",
  "schedule",
];

const BOOKING_TERMS = ["calendly", "acuityscheduling", "simplybook", "booksy", "fresha", "setmore", "squareup", "appointment"];

function normalizeWebsite(website: string) {
  const trimmed = website.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function hasPattern(html: string, pattern: RegExp) {
  return pattern.test(html);
}

function extractMeta(html: string) {
  return {
    hasTitle: hasPattern(html, /<title[^>]*>\s*[^<]{8,}\s*<\/title>/i),
    hasDescription: hasPattern(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{35,}["']/i),
    hasViewport: hasPattern(html, /<meta[^>]+name=["']viewport["']/i),
  };
}

function potentialFromScore(score: number): OpportunityLevel {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

function summarize(lead: BusinessLead, issues: string[], score: number) {
  if (!lead.website) {
    return `${lead.business_name} has no visible website, which creates a direct opportunity to capture search traffic and convert Google Maps visitors into enquiries.`;
  }

  if (issues.length === 0) {
    return `${lead.business_name} has a reasonable foundation online. The opportunity is mainly incremental conversion and SEO improvement.`;
  }

  return `${lead.business_name} appears to be leaving enquiries on the table because ${issues
    .slice(0, 3)
    .map((issue) => issue.toLowerCase())
    .join(", ")}. This is a ${potentialFromScore(score)} opportunity for a focused website improvement campaign.`;
}

export async function auditWebsite(lead: BusinessLead): Promise<WebsiteAudit> {
  const checkedAt = new Date().toISOString();

  if (!lead.website) {
    return {
      website_score: 100,
      issues: ["No website present"],
      opportunity_summary: summarize(lead, ["No website present"], 100),
      business_potential: "high",
      metadata: {
        final_url: null,
        load_time_ms: null,
        has_ssl: false,
        has_title: false,
        has_meta_description: false,
        has_viewport: false,
        checked_at: checkedAt,
      },
    };
  }

  const normalized = normalizeWebsite(lead.website);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  const started = Date.now();
  const issues: Issue[] = [];
  let html = "";
  let finalUrl = normalized;
  let loadTimeMs: number | null = null;
  let hasSsl = normalized?.startsWith("https://") ?? false;
  let hasTitle = false;
  let hasDescription = false;
  let hasViewport = false;

  try {
    if (!normalized) {
      throw new Error("Invalid website URL");
    }

    const response = await fetch(normalized, {
      signal: controller.signal,
      headers: {
        "user-agent": "Buzz Innovations Ltd Website Audit Bot/1.0",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    loadTimeMs = Date.now() - started;
    finalUrl = response.url || normalized;
    hasSsl = finalUrl.startsWith("https://");
    html = await response.text();

    if (!response.ok) issues.push({ label: `Homepage returned HTTP ${response.status}`, weight: 24 });
  } catch {
    loadTimeMs = Date.now() - started;
    issues.push({ label: "Homepage could not be loaded reliably", weight: 32 });
  } finally {
    clearTimeout(timeout);
  }

  const lowerHtml = html.toLowerCase();
  const meta = extractMeta(html);
  hasTitle = meta.hasTitle;
  hasDescription = meta.hasDescription;
  hasViewport = meta.hasViewport;

  if (!hasSsl) issues.push({ label: "SSL is missing or not enforced", weight: 20 });
  if (loadTimeMs && loadTimeMs > 4500) issues.push({ label: "Homepage loads slowly", weight: 16 });
  if (!hasViewport) issues.push({ label: "Poor mobile responsiveness signals", weight: 20 });
  if (!hasTitle || !hasDescription) issues.push({ label: "Weak SEO metadata", weight: 16 });

  const hasCta = CTA_TERMS.some((term) => lowerHtml.includes(term));
  if (!hasCta) issues.push({ label: "Missing clear call-to-action", weight: 18 });

  const hasForm = /<form[\s>]/i.test(html) || lowerHtml.includes("type=\"email\"") || lowerHtml.includes("name=\"email\"");
  if (!hasForm) issues.push({ label: "No obvious contact form", weight: 14 });

  const hasBooking = BOOKING_TERMS.some((term) => lowerHtml.includes(term));
  if (!hasBooking) issues.push({ label: "No booking system detected", weight: 14 });

  if (/<table[\s>]/i.test(html) || lowerHtml.includes("flash") || lowerHtml.includes("xhtml 1.0 transitional")) {
    issues.push({ label: "Outdated design indicators detected", weight: 14 });
  }

  const uniqueIssues = [...new Map(issues.map((issue) => [issue.label, issue])).values()];
  const websiteScore = Math.min(100, Math.max(0, uniqueIssues.reduce((total, issue) => total + issue.weight, 10)));
  const issueLabels = uniqueIssues.map((issue) => issue.label);

  return {
    website_score: websiteScore,
    issues: issueLabels.length ? issueLabels : ["No major conversion issues detected"],
    opportunity_summary: summarize(lead, issueLabels, websiteScore),
    business_potential: potentialFromScore(websiteScore),
    metadata: {
      final_url: finalUrl,
      load_time_ms: loadTimeMs,
      has_ssl: hasSsl,
      has_title: hasTitle,
      has_meta_description: hasDescription,
      has_viewport: hasViewport,
      checked_at: checkedAt,
    },
  };
}
