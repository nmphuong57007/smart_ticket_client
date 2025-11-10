import { useQuery, queryOptions } from "@tanstack/react-query";

import { getMovies } from "../services/movie-api";

export const useMovies = (
  per_page?: number,
  page?: number,
  status?: string,
  sort_by?: string,
  search?: string
) => {
  return useQuery({
    queryKey: ["allMovies", per_page, page, status, sort_by, search],
    queryFn: () => getMovies(per_page, page, status, sort_by, search),
    ...queryOptions,
  });
};
