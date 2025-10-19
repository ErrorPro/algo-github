import { useState, useCallback, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import type { Repository } from "@/repository/types";

interface UseRepositoriesReturn {
  getRepositories: (params?: {
    username?: string;
    sort?: "created" | "updated" | "pushed" | "full_name";
    direction?: "asc" | "desc";
  }) => Promise<Repository[]>;
  isLoading: boolean;
  error: string | null;
}

// Initialize Octokit instance
const octokit = new Octokit();

// cache in memory
const cachedRepositoriesKey = "repositoriesCache";
const cachedRepositoriesParamsKey = "repositoriesParamsKey";
let cachedRepositories: Repository[] | null = null;
let cachedRepositoriesParams: string | null = null;

export const useRepositories = (): UseRepositoriesReturn => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRepositories = useCallback<UseRepositoriesReturn["getRepositories"]>(
    async (params) => {
      const stringifiedParams = JSON.stringify(params);

      if (
        cachedRepositories &&
        stringifiedParams === cachedRepositoriesParams
      ) {
        setLoading(false);
        setError(null);
        return cachedRepositories;
      }

      try {
        setLoading(true);
        setError(null);

        await new Promise((res) => setTimeout(res, 2000));
        const response = await octokit.repos.listForUser({
          username: params?.username || "algorand",
          per_page: 30,
          sort: params?.sort || "updated",
          direction: params?.direction || "desc",
        });

        const formattedRepos: Repository[] = response.data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          stars: repo.stargazers_count,
          description: repo.description || "No description",
          forks: repo.forks_count || 0,
          watchers: repo.watchers_count || 0,
          url: repo.html_url,
          language: repo.language || "Unknown",
          updatedAt: repo.updated_at,
          topics: repo.topics,
        }));

        cachedRepositories = formattedRepos;
        // TODO: only cached last used fetched value
        localStorage.setItem(
          cachedRepositoriesKey,
          JSON.stringify(formattedRepos)
        );
        cachedRepositoriesParams = stringifiedParams;
        localStorage.setItem(cachedRepositoriesParamsKey, stringifiedParams);

        return formattedRepos;
      } catch (err) {
        setError(
          err instanceof Error ? err.toString() : "Failed to fetch repositories"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // on mount load data from localStorage
  useEffect(() => {
    const localStorateReposParams = localStorage.getItem(
      cachedRepositoriesParamsKey
    );

    if (localStorateReposParams) {
      try {
        // overwrite the in-memory cache for params
        cachedRepositoriesParams = localStorateReposParams;
      } catch (e) {
        console.error("Failed to parse localStoratePoresParams cache", e);
      }
    }

    const localStorageReposCache = localStorage.getItem(cachedRepositoriesKey);

    if (localStorageReposCache) {
      try {
        const parsedCache: Repository[] = JSON.parse(localStorageReposCache);
        // overwrite the in-memory cache for repos
        cachedRepositories = parsedCache;
      } catch (e) {
        console.error("Failed to parse localStorageReposCache cache", e);
      }
    }
  }, []);

  return { getRepositories, isLoading, error };
};
