import type { Repository } from "@/repository/types";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useRepositories } from "./useRepositories";

interface useFavoriteRepositoriesReturn {
  searchRepositories: (org: string) => Promise<void>;
  setRepositoryFavorite: (repoId: number, isFavorite: boolean) => void;
  getRepository: (repoId: number) => Repository | undefined;
  repositories: Repository[];
  isLoading: boolean;
  error: string | null;
  toggleFavorite: () => void;
  isFavoriteShown: boolean;
  filterByName: (name: string) => void;
}

// cache key
const cachechedIdsKey = "favoriteRepositoriesIds";

export const useFavoriteRepositories = (): useFavoriteRepositoriesReturn => {
  const { getRepositories } = useRepositories();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isFavoriteShown, setIsFavoriteShown] = useState(false);
  const [cachedFavoriteRepositoriesIds, setCachedFavoriteRepositoriesIds] =
    useState<number[]>([]);
  const [filterByName, setFilterByName] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const repositoriesToShow = useMemo(() => {
    // first filter out by name
    const filteredByName = filterByName
      ? repositories.filter(
          (repo) =>
            repo.name.toLowerCase().search(filterByName.toLowerCase()) > -1
        )
      : repositories;
    // populate isFavorite
    const favoriteRepos = filteredByName.map((repo) => ({
      ...repo,
      isFavorite: cachedFavoriteRepositoriesIds.includes(repo.id),
    }));

    if (isFavoriteShown) {
      return favoriteRepos.filter((repo) => repo.isFavorite);
    }

    return favoriteRepos;
  }, [
    isFavoriteShown,
    repositories,
    filterByName,
    cachedFavoriteRepositoriesIds,
  ]);

  const searchRepositories = useCallback<
    useFavoriteRepositoriesReturn["searchRepositories"]
  >(
    async (org) => {
      try {
        setLoading(true);
        setError(null);
        const repos = await getRepositories({
          username: org,
        });

        setRepositories(repos);
      } catch (err) {
        setError(`Failed to fetch repositories: ${err}`);
      } finally {
        setLoading(false);
      }
    },
    [getRepositories]
  );

  const setRepositoryFavorite = useCallback(
    (repoId: number, isFavorite: boolean) => {
      let _cachedFavoriteRepositoriesIds = [...cachedFavoriteRepositoriesIds];

      if (isFavorite) {
        _cachedFavoriteRepositoriesIds.push(repoId);
      } else {
        _cachedFavoriteRepositoriesIds = _cachedFavoriteRepositoriesIds.filter(
          (id) => id !== repoId
        );
      }

      setCachedFavoriteRepositoriesIds(_cachedFavoriteRepositoriesIds);

      localStorage.setItem(
        cachechedIdsKey,
        JSON.stringify(_cachedFavoriteRepositoriesIds)
      );
    },
    [cachedFavoriteRepositoriesIds]
  );

  const getRepository = useCallback(
    (repoId: number) => {
      return repositoriesToShow.find((repo) => repo.id === repoId);
    },
    [repositoriesToShow]
  );

  const toggleFavorite = useCallback(
    () => setIsFavoriteShown(!isFavoriteShown),
    [isFavoriteShown]
  );

  // on mound load data from localStorage
  useEffect(() => {
    const handleLoadCache = (event?: PageTransitionEvent) => {
      if (!event || event?.persisted) {
        const cachechedIds = localStorage.getItem(cachechedIdsKey);
        if (cachechedIds) {
          try {
            setCachedFavoriteRepositoriesIds(JSON.parse(cachechedIds));
          } catch (e) {
            console.error("Failed to parse favorites", e);
          }
        }
      }
    };

    handleLoadCache();

    // TODO: migrate to different storage to no deal with browser related issues(bfcache)
    window.addEventListener("pageshow", handleLoadCache);

    return () => window.removeEventListener("pageshow", handleLoadCache);
  }, []);

  return {
    searchRepositories,
    setRepositoryFavorite,
    getRepository,
    toggleFavorite,
    isFavoriteShown,
    repositories: repositoriesToShow,
    filterByName: setFilterByName,
    isLoading,
    error,
  };
};
