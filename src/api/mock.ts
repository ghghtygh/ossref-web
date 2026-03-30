import { Repo, FilterState, PageResponse } from '../types';

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? '/api';

export async function fetchRepos(filters: FilterState): Promise<Repo[]> {
  const params = new URLSearchParams();
  if (filters.fw !== 'all') params.set('fw', filters.fw);
  if (filters.arch !== 'all') params.set('arch', filters.arch);

  const res = await fetch(`${API_BASE}/repos?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const body: PageResponse<Repo> = await res.json();
  return body.data;
}
