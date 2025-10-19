import type { Repository } from "@/repository/types";
import RepositoryNotFound from "@/repository/components/RepositoryNotFound";
import RepositoryPageDetails from "@/repository/components/RepositoryPageDetails";
import RepositoryPageHeader from "@/repository/components/RepositoryPageHeader";

interface RepositoryPageProps {
  repository?: Repository;
  isLoading?: boolean;
  error?: string | null;
  setRepositoryFavorite?: (id: number, isFavorite: boolean) => void;
}

export default function RepositoryPage({
  repository,
  isLoading,
  setRepositoryFavorite,
  error,
}: RepositoryPageProps) {
  // if repository is undefined and not loading and not error, show not found
  if (!repository && !isLoading && !error) {
    return <RepositoryNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RepositoryPageHeader />
      {/* move loading to its own component if reused */}
      {isLoading ? (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-slate-400">Loading repository details...</p>
        </div>
      ) : null}
      {error ? (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-slate-400">
            Error getting the repository: {error}
          </p>
        </div>
      ) : null}
      {repository ? (
        <RepositoryPageDetails
          repository={repository}
          onSetFavorite={setRepositoryFavorite}
        />
      ) : null}
    </div>
  );
}
