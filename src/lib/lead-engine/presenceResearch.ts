import type { BusinessLead, PresenceResearch, SearchResult } from "./types";

type GoogleSearchItem = {
  title?: string;
  link?: string;
  snippet?: string;
  displayLink?: string;
};

const DIRECTORY_HOSTS = ["yell.com", "trustpilot.com", "checkatrade.com", "tripadvisor", "cylex", "192.com", "find-open", "facebook.com"];
const SOCIAL_HOSTS = ["facebook.com", "instagram.com", "linkedin.com", "x.com", "twitter.com", "tiktok.com"];
const REVIEW_TERMS = ["review", "reviews", "rating", "trustpilot", "complaint"];

function searchKey() {
  return process.env.GOOGLE_SEARCH_API_KEY ?? process.env.GOOGLE_PLACES_API_KEY;
}

function searchEngineId() {
  return process.env.GOOGLE_SEARCH_ENGINE_ID ?? process.env.GOOGLE_CSE_ID;
}

function hostOf(link: string) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function classify(item: GoogleSearchItem, lead: BusinessLead): SearchResult["source"] {
  const text = `${item.title ?? ""} ${item.link ?? ""} ${item.snippet ?? ""}`.toLowerCase();
  const host = hostOf(item.link ?? "");
  const ownHost = lead.website ? hostOf(lead.website) : "";

  if (ownHost && host.includes(ownHost)) return "brand";
  if (SOCIAL_HOSTS.some((social) => host.includes(social))) return "social";
  if (DIRECTORY_HOSTS.some((directory) => host.includes(directory))) return "directory";
  if (REVIEW_TERMS.some((term) => text.includes(term))) return "review";
  if (!text.includes(lead.business_name.toLowerCase().split(" ")[0] ?? "")) return "competitor";
  return "organic";
}

function toResult(item: GoogleSearchItem, lead: BusinessLead): SearchResult | null {
  if (!item.title || !item.link) return null;
  return {
    title: item.title,
    link: item.link,
    snippet: item.snippet ?? "",
    source: classify(item, lead),
  };
}

function scoreVisibility(results: SearchResult[], lead: BusinessLead, issues: string[]) {
  let score = 30;
  if (results.some((result) => result.source === "brand")) score += 25;
  if (results.some((result) => result.source === "review")) score += 10;
  if (results.some((result) => result.source === "social")) score += 10;
  if (lead.review_count >= 25) score += 10;
  if (lead.rating && lead.rating >= 4.2) score += 10;
  score -= issues.length * 8;
  return Math.min(100, Math.max(0, score));
}

function buildIssues(results: SearchResult[], lead: BusinessLead) {
  const issues: string[] = [];
  const ownHost = lead.website ? hostOf(lead.website) : "";
  const ownSiteVisible = ownHost && results.some((result) => hostOf(result.link).includes(ownHost));

  if (lead.website && !ownSiteVisible) issues.push("Website not prominent in branded Google search");
  if (!lead.website) issues.push("No owned website to rank for branded searches");
  if (!results.some((result) => result.source === "social")) issues.push("Weak social/profile presence in search results");
  if (results.filter((result) => result.source === "directory").length >= 3) {
    issues.push("Third-party directories dominate branded search results");
  }
  if (!results.some((result) => result.source === "review")) issues.push("Review/reputation pages are not prominent");

  return issues;
}

function summarize(lead: BusinessLead, issues: string[], score: number) {
  if (issues.length === 0) {
    return `${lead.business_name} has a reasonable branded search footprint. Outreach should focus on improving conversion and operational efficiency.`;
  }

  return `${lead.business_name} has a visibility score of ${score}/100. The main digital presence gaps are ${issues
    .slice(0, 3)
    .map((issue) => issue.toLowerCase())
    .join(", ")}.`;
}

export async function researchPresence(lead: BusinessLead): Promise<PresenceResearch> {
  const key = searchKey();
  const cx = searchEngineId();
  const location = lead.address?.split(",").slice(-2).join(",").trim();
  const query = `"${lead.business_name}" ${location ?? ""}`.trim();

  if (process.env.LEAD_ENGINE_MOCK === "true") {
    const results: SearchResult[] = [
      { title: lead.business_name, link: lead.website ?? "https://example.com", snippet: "Official business website.", source: "brand" },
      { title: `${lead.business_name} reviews`, link: "https://example.com/reviews", snippet: "Customer reviews and ratings.", source: "review" },
    ];
    const seoIssues = buildIssues(results, lead);
    const visibilityScore = scoreVisibility(results, lead, seoIssues);
    return {
      provider: "mock",
      query,
      brand_results: results,
      seo_issues: seoIssues,
      reputation_signals: ["Mock review profile detected"],
      competitor_mentions: [],
      visibility_score: visibilityScore,
      summary: summarize(lead, seoIssues, visibilityScore),
    };
  }

  if (!key || !cx) {
    const issues = ["Google brand search is not configured"];
    return {
      provider: "not_configured",
      query,
      brand_results: [],
      seo_issues: issues,
      reputation_signals: [],
      competitor_mentions: [],
      visibility_score: 0,
      summary:
        "External Google brand research is disabled. Set GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_ENGINE_ID to audit branded search, directories, reviews, and competing results.",
    };
  }

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", key);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", query);
  url.searchParams.set("num", "10");

  const response = await fetch(url);
  if (!response.ok) {
    let message = `Google brand search failed with HTTP ${response.status}`;
    try {
      const payload = (await response.json()) as { error?: { message?: string } };
      if (payload.error?.message?.includes("does not have the access to Custom Search JSON API")) {
        message = "Google Custom Search API access is not active for this Cloud project";
      }
    } catch {
      // Keep the generic HTTP message when Google does not return JSON.
    }
    const issues = [message];
    return {
      provider: "google_custom_search",
      query,
      brand_results: [],
      seo_issues: issues,
      reputation_signals: [],
      competitor_mentions: [],
      visibility_score: 0,
      summary: summarize(lead, issues, 0),
    };
  }

  const payload = (await response.json()) as { items?: GoogleSearchItem[] };
  const results = (payload.items ?? []).map((item) => toResult(item, lead)).filter((item): item is SearchResult => Boolean(item));
  const seoIssues = buildIssues(results, lead);
  const visibilityScore = scoreVisibility(results, lead, seoIssues);

  return {
    provider: "google_custom_search",
    query,
    brand_results: results,
    seo_issues: seoIssues,
    reputation_signals: results.filter((result) => result.source === "review").map((result) => result.title).slice(0, 3),
    competitor_mentions: results.filter((result) => result.source === "competitor").map((result) => result.title).slice(0, 3),
    visibility_score: visibilityScore,
    summary: summarize(lead, seoIssues, visibilityScore),
  };
}
