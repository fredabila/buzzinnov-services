import type { BusinessLead, LeadSearchInput } from "./types";

type PlacesSearchResult = {
  place_id?: string;
  name?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  business_status?: string;
  types?: string[];
};

type PlaceDetailsResult = PlacesSearchResult & {
  website?: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  url?: string;
};

const TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function googleKey() {
  return process.env.GOOGLE_PLACES_API_KEY ?? process.env.GOOGLE_MAPS_API_KEY;
}

function buildQuery(input: LeadSearchInput) {
  return [input.searchTerm, input.location].filter(Boolean).join(" ");
}

function categoryFromTypes(types: string[] | undefined) {
  return types?.find((type) => !["point_of_interest", "establishment"].includes(type))?.replaceAll("_", " ") ?? null;
}

function toLead(details: PlaceDetailsResult): BusinessLead | null {
  if (!details.place_id || !details.name?.trim()) {
    return null;
  }

  return {
    business_name: details.name.trim(),
    website: details.website ?? null,
    phone: details.formatted_phone_number ?? details.international_phone_number ?? null,
    address: details.formatted_address ?? null,
    rating: typeof details.rating === "number" ? details.rating : null,
    review_count: details.user_ratings_total ?? 0,
    google_maps_url: details.url ?? null,
    category: categoryFromTypes(details.types),
    place_id: details.place_id,
  };
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Places request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function fetchDetails(placeId: string, apiKey: string): Promise<PlaceDetailsResult> {
  const url = new URL(DETAILS_URL);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("key", apiKey);
  url.searchParams.set(
    "fields",
    [
      "place_id",
      "name",
      "website",
      "formatted_phone_number",
      "international_phone_number",
      "formatted_address",
      "rating",
      "user_ratings_total",
      "url",
      "types",
      "business_status",
    ].join(","),
  );

  const payload = await fetchJson<{ status: string; result?: PlaceDetailsResult; error_message?: string }>(url);
  if (payload.status !== "OK" || !payload.result) {
    throw new Error(payload.error_message ?? `Place Details failed for ${placeId}: ${payload.status}`);
  }
  return payload.result;
}

export async function scrapeGooglePlaces(input: LeadSearchInput): Promise<BusinessLead[]> {
  if (input.useMockData || process.env.LEAD_ENGINE_MOCK === "true") {
    return mockLeads(input);
  }

  const apiKey = googleKey();
  if (!apiKey) {
    throw new Error("Missing GOOGLE_PLACES_API_KEY. Set it in .env.local or enable LEAD_ENGINE_MOCK=true for demo data.");
  }

  const maxResults = Math.min(Math.max(input.maxResults ?? 40, 1), 1000);
  const placeIds = new Set<string>();
  let nextPageToken: string | undefined;
  let page = 0;

  while (placeIds.size < maxResults && page < 20) {
    const url = new URL(TEXT_SEARCH_URL);
    url.searchParams.set("key", apiKey);

    if (nextPageToken) {
      url.searchParams.set("pagetoken", nextPageToken);
      await sleep(2000);
    } else {
      url.searchParams.set("query", buildQuery(input));
      if (input.location && input.radius) {
        url.searchParams.set("location", input.location);
        url.searchParams.set("radius", String(input.radius));
      }
    }

    const payload = await fetchJson<{
      status: string;
      results?: PlacesSearchResult[];
      next_page_token?: string;
      error_message?: string;
    }>(url);

    if (!["OK", "ZERO_RESULTS"].includes(payload.status)) {
      throw new Error(payload.error_message ?? `Text Search failed: ${payload.status}`);
    }

    for (const result of payload.results ?? []) {
      if (result.place_id && result.name?.trim()) {
        placeIds.add(result.place_id);
      }
      if (placeIds.size >= maxResults) break;
    }

    nextPageToken = payload.next_page_token;
    page += 1;
    if (!nextPageToken || payload.status === "ZERO_RESULTS") break;
  }

  const leads: BusinessLead[] = [];
  for (const placeId of [...placeIds].slice(0, maxResults)) {
    const details = await fetchDetails(placeId, apiKey);
    if (details.business_status && details.business_status !== "OPERATIONAL") {
      continue;
    }
    const lead = toLead(details);
    if (lead) leads.push(lead);
  }

  return leads.sort((a, b) => {
    const aPriority = (a.review_count >= 10 ? 1 : 0) + (a.website ? 1 : 0);
    const bPriority = (b.review_count >= 10 ? 1 : 0) + (b.website ? 1 : 0);
    return bPriority - aPriority || b.review_count - a.review_count;
  });
}

function mockLeads(input: LeadSearchInput): BusinessLead[] {
  const base = input.searchTerm || "local businesses";
  return [
    {
      business_name: `Northside ${base}`,
      website: "https://example.com",
      phone: "+44 20 0000 1000",
      address: "12 Market Street, Manchester",
      rating: 4.4,
      review_count: 38,
      google_maps_url: "https://maps.google.com/?cid=demo-1",
      category: "local business",
      place_id: "mock-place-1",
    },
    {
      business_name: `Premier ${base}`,
      website: null,
      phone: "+44 20 0000 2000",
      address: "42 High Road, Birmingham",
      rating: 4.1,
      review_count: 17,
      google_maps_url: "https://maps.google.com/?cid=demo-2",
      category: "local business",
      place_id: "mock-place-2",
    },
  ].slice(0, input.maxResults ?? 2);
}
