export type Repo = {
  id: number;
  name: string;
  private: boolean;
  language: string[];
  topics: string[];
  description: string;
  html_url: string;
};

export type GithubUser = {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
  name: string;
  twitter_username: string;
};
