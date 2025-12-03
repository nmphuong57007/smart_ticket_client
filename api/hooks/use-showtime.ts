import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "../services/movie-api";

export const useMovieShowtimes = (movieId: number) => {
  return useQuery({
    queryKey: ["movieShowtimes", movieId],
    queryFn: () => getMovieShowtimes(movieId),
  });
};
