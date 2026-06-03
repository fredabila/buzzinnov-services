export type OpportunityLevel = "low" | "medium" | "high";

export type LeadSearchInput = {
  searchTerm: string;
  location?: string;
  radius?: number;
  maxResults?: number;
  batchSize?: number;
  useMockData?: boolean;
};

export type BusinessLead = {
  business_name: string;
  website: string | null;
  phone: string | null;
  address: string | null;
  rating: number | null;
  review_count: number;
  google_maps_url: string | null;
  category: string | null;
  place_id: string;
};

export type WebsiteAudit = {
  website_score: number;
  issues: string[];
  opportunity_summary: string;
  business_potential: OpportunityLevel;
  metadata: {
    final_url: string | null;
    load_time_ms: number | null;
    has_ssl: boolean;
    has_title: boolean;
    has_meta_description: boolean;
    has_viewport: boolean;
    checked_at: string;
  };
};

export type SearchResult = {
  title: string;
  link: string;
  snippet: string;
  source: "organic" | "brand" | "directory" | "social" | "review" | "competitor";
};

export type PresenceResearch = {
  provider: "google_custom_search" | "not_configured" | "mock";
  query: string;
  brand_results: SearchResult[];
  seo_issues: string[];
  reputation_signals: string[];
  competitor_mentions: string[];
  visibility_score: number;
  summary: string;
};

export type OperationsAnalysis = {
  operations_score: number;
  issues: string[];
  automation_opportunities: string[];
  recommended_systems: string[];
  hook_summary: string;
};

export type OutreachEmail = {
  subject: string;
  body: string;
};

export type LeadRecord = {
  id: string;
  run_id: string;
  lead: BusinessLead;
  audit: WebsiteAudit;
  presence: PresenceResearch;
  operations: OperationsAnalysis;
  outreach: OutreachEmail;
  created_at: string;
};

export type PipelineRun = {
  id: string;
  search: LeadSearchInput;
  status: "completed" | "failed";
  lead_count: number;
  created_at: string;
  completed_at: string;
  records: LeadRecord[];
  errors: string[];
};
