const CMS_BASE_URL =
  process.env.CMS_URL ||
  process.env.NEXT_PUBLIC_CMS_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://dashboard.sitaramsevasansthan.org'
    : 'http://localhost:3000');

function getCmsSearchUrl() {
  const configuredSearchUrl = process.env.CMS_AI_SEARCH_URL?.trim();

  if (!configuredSearchUrl) {
    return new URL('/api/ai/search', CMS_BASE_URL).toString();
  }

  if (configuredSearchUrl.startsWith('http://') || configuredSearchUrl.startsWith('https://')) {
    return configuredSearchUrl;
  }

  return new URL(configuredSearchUrl, CMS_BASE_URL).toString();
}

export type CmsSearchResult = {
  id: number;
  sourceType: 'post' | 'event' | 'media' | 'latest_event' | 'site_fact';
  sourceId: number | null;
  sourceSlug: string | null;
  title: string;
  content: string;
  url: string;
  metadata: Record<string, unknown>;
  score: number;
};

export async function searchCmsKnowledge(query: string, topK = 6) {
  const secret = process.env.CMS_AI_API_SECRET;

  if (!secret) {
    throw new Error('CMS AI search secret is missing.');
  }

  const response = await fetch(getCmsSearchUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-cms-ai-secret': secret,
    },
    body: JSON.stringify({ query, topK }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`CMS AI search failed with status ${response.status}.`);
  }

  const data = (await response.json()) as { results?: CmsSearchResult[] };
  return data.results ?? [];
}
