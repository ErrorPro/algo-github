export interface Repository {
  id: number;
  name: string;
  stars?: number;
  description: string;
  isFavorite?: boolean;
  forks: number;
  watchers: number;
  language: string;
  updatedAt?: string | null;
  url: string;
  topics?: string[];
}
