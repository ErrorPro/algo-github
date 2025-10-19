import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";

export default function RepositoryPageHeader() {
  const handleGoBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to repositories</span>
        </button>
      </div>
    </header>
  );
}
