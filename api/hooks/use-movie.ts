import { useQuery, queryOptions } from "@tanstack/react-query";
import { getMovies } from "../services/movie-api";

// Map status FE → status backend hợp lệ
const mapStatus = (status?: string) => {
  if (!status) return undefined;

  const map: Record<string, string> = {
    now_showing: "showing",
    coming_soon: "coming",
  };

  return map[status] ?? status;
};

export const useMovies = (
  per_page?: number,
  page?: number,
  status?: string,
  sort_by?: string,
  search?: string
) => {
  const fixedStatus = mapStatus(status);

  return useQuery({
    queryKey: ["allMovies", per_page, page, fixedStatus, sort_by, search],
    queryFn: () =>
      getMovies(per_page, page, fixedStatus, sort_by, search),
    ...queryOptions,
  });
};
