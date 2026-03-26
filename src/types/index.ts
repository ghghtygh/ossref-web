export interface Repo {
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
