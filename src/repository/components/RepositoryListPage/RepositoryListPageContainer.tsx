import { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFavoriteRepositories } from "@/repository/hooks/useFavoriteRepositories";
import RepositoriesListPage from "./RepositoryListPage";
import type { OrganizationKey } from "./constants";

export default function RepositoriesListPageContainer() {
  const {
    searchRepositories,
    toggleFavorite,
    isFavoriteShown,
    repositories,
    isLoading,
    error,
    filterByName,
  } = useFavoriteRepositories();
  const navigate = useNavigate();
  const { org: currentOrg = "algorand" } = useParams<{
    org: OrganizationKey;
  }>();
  const getRepositoriiesForOrg = useCallback(
    (org: OrganizationKey) => {
      searchRepositories(org);
      navigate(`/${org}`);
    },
    [searchRepositories, navigate]
  );
  const onRepositoryClick = useCallback(
    (repoName: string) => {
      navigate(`/${currentOrg}/${repoName}`);
    },
    [currentOrg, navigate]
  );

  useEffect(() => {
    searchRepositories(currentOrg);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RepositoriesListPage
      repositories={repositories}
      isLoading={isLoading}
      error={error}
      toggleFavorite={toggleFavorite}
      isFavoriteShown={isFavoriteShown}
      onOrganizationChange={getRepositoriiesForOrg}
      currentOrg={currentOrg}
      onSearch={filterByName}
      onRepositoryClick={onRepositoryClick}
    />
  );
}
