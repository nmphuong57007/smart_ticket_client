import { useQuery } from "@tanstack/react-query";
import { getShowtimeDetail, ShowtimeDetailRes } from "../services/showtime-api";

export const useShowtimeDetail = (id: number) => {
  return useQuery<ShowtimeDetailRes>({
    queryKey: ["showtimeDetail", id],
    queryFn: () => getShowtimeDetail(id),
  });
};
