import { Suspense } from "react";
import { MovieListContainer } from "@/modules/Movies/list/movie-list-container";
import { Loader2 } from "lucide-react";

function MovieListFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-lg">Đang tải danh sách phim...</span>
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<MovieListFallback />}>
        <MovieListContainer />
      </Suspense>
    </div>
  );
}
