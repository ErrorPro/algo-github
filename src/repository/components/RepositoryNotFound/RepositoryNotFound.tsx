import { useCallback } from "react";
import { AlertCircle } from "lucide-react";
import RepositoryPageHeader from "@/repository/components/RepositoryPageHeader";

export default function RepositoryNotFound() {
  const handleGoBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <RepositoryPageHeader />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md w-full">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/20 p-4">
              <AlertCircle className="h-12 w-12 text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Repository Not Found
          </h1>

          <p className="text-slate-400 mb-8">
            Sorry, we couldn't find the repository you're looking for. It might
            have been deleted or the name might be incorrect.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 justify-center">
            <button
              onClick={handleGoBack}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Go Back
            </button>
            <a
              href="/"
              className="rounded-lg border border-slate-600 px-6 py-2.5 font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
