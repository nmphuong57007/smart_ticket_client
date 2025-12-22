import { useQuery } from "@tanstack/react-query";
import { getReviewsByMovie } from "../services/review-api";

export const useReviewsByMovie = (movieId: number) => {
  return useQuery({
    queryKey: ["reviewsByMovie", movieId],
    queryFn: () => getReviewsByMovie(movieId),
    enabled: !!movieId, // chỉ gọi khi có id
  });
};