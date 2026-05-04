const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const buildQuery = (params) => {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v != null),
  );
  return new URLSearchParams(filtered).toString();
};

export const fetchEverything = async (params) => {
  const qs = buildQuery(params);
  const res = await fetch(`${BASE_URL}/news/everything?${qs}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to fetch articles');
  }
  return res.json();
};

export const fetchTopHeadlines = async (params) => {
  const qs = buildQuery(params);
  const res = await fetch(`${BASE_URL}/news/top-headlines?${qs}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to fetch headlines');
  }
  return res.json();
};
