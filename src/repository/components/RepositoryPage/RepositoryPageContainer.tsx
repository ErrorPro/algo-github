import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFavoriteRepositories } from "@/repository/hooks/useFavoriteRepositories";
import RepositoryPage from "./RepositoryPage";

export default function RepositoriesListPageContainer() {
  const {
    searchRepositories,
    isLoading,
    error,
    getRepository,
    setRepositoryFavorite,
  } = useFavoriteRepositories();
  const { id, org } = useParams<{ org: string; id: string }>();
  const repository = useMemo(
    () => getRepository(Number(id)),
    [id, getRepository]
  );

  useEffect(() => {
    if (org) {
      searchRepositories(org);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RepositoryPage
      repository={repository}
      isLoading={isLoading}
      error={error}
      setRepositoryFavorite={setRepositoryFavorite}
    />
  );
}
