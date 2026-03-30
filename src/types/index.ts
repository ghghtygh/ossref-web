export interface Repo {
  id: number;
  name: string;
  owner: string;
  desc: string;
  stars: string;
  url: string;
  fw: string;
  arch: string;
  lang: string;
  commit: string;
  tree: string[];
}

export interface FilterState {
  fw: string;
  arch: string;
}

export interface PageResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}
