import { Calendar, Eye, GitFork, Star } from "lucide-react";
import type { Repository } from "@/repository/types";

interface RepositoryPageDetailsProps {
  repository: Repository;
  onSetFavorite?: (id: number, isFavorite: boolean) => void;
}

export default function RepositoryPageDetails({
  repository,
  onSetFavorite,
}: RepositoryPageDetailsProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {repository.name}
        </h1>
        <p className="mt-4 text-lg text-slate-300">{repository.description}</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <div>
              <p className="text-sm text-slate-400">Stars</p>
              <p className="text-2xl font-bold text-white">
                {repository.stars?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <div className="flex items-center gap-2">
            <GitFork className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Forks</p>
              <p className="text-2xl font-bold text-white">
                {repository.forks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Watchers</p>
              <p className="text-2xl font-bold text-white">
                {repository.watchers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-sm text-slate-400">Updated</p>
              <p className="text-lg font-bold text-white">
                {repository.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Language</h2>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-slate-300">{repository.language}</span>
          </div>
        </div>

        {repository.topics?.length ? (
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Topics</h2>
            <div className="flex flex-wrap gap-2">
              {repository.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View on GitHub
            </a>
            <button
              onClick={() =>
                onSetFavorite?.(repository.id, !repository.isFavorite)
              }
              className="inline-block flex-1 rounded-lg bg-slate-700 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-slate-600"
            >
              {repository.isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
