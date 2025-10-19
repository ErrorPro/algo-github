import { Star } from "lucide-react";
import type { Repository } from "@/repository/types";
import { ORGANIZATION_NAMES } from "./constants";
import type { OrganizationKey } from "./constants";

interface RepositoriesListPageProps {
  repositories: Repository[];
  isLoading: boolean;
  error: string | null;
  toggleFavorite?: () => void;
  isFavoriteShown?: boolean;
  onOrganizationChange: (org: OrganizationKey) => void;
  currentOrg: OrganizationKey;
  onSearch: (name: string) => void;
  onRepositoryClick: (repoName: string) => void;
}

const getButtonClasses = (isActive?: boolean) =>
  `px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
    isActive
      ? "bg-blue-600 text-white"
      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
  }`;

export default function RepositoriesListPage(props: RepositoriesListPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                GitHub Repositories
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Algorand powered repository explorer
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-2">
            <div className="flex gap-2">
              <button
                onClick={props.toggleFavorite}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <Star
                  className="h-8 w-8 text-yellow-400"
                  fill={props.isFavoriteShown ? "currentColor" : "none"}
                />
              </button>
              {ORGANIZATION_NAMES.map(({ key, label }) => (
                <button
                  key={key}
                  className={getButtonClasses(props.currentOrg === key)}
                  onClick={() => props.onOrganizationChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              onChange={(evt) => props.onSearch(evt.target.value)}
              type="text"
              placeholder="Search repositories..."
              className="w-full rounded-lg bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto sm:flex-1"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Move error & loading into its own components */}
        {props.error && !props.isLoading && (
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-slate-400">
              Error getting the repositories: {props.error}
            </p>
          </div>
        )}
        {props.isLoading && (
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-slate-400">Loading repositories...</p>
          </div>
        )}
        {!props.isLoading && !props.error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {props.repositories.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => props.onRepositoryClick(repo.id.toString())}
                  className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 text-left w-full"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <h2 className="flex-1 text-xl font-semibold text-white group-hover:text-blue-400">
                        {repo.name}
                      </h2>
                    </div>

                    <p className="mb-6 line-clamp-2 text-sm text-slate-400">
                      {repo.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-white">
                          {repo.stars?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        View details →
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                </button>
              ))}
            </div>

            {props.repositories.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg text-slate-400">No repositories found</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
