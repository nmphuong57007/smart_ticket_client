import useSWR from "swr";
import { cinemaApi } from "../services/cinema-api";
import type { CinemaDetailRes } from "../interfaces/cinema-interface";

export function useCinemaDetail() {
  const { data, error, isLoading } = useSWR<CinemaDetailRes>(
    "cinema/detail",
    cinemaApi.getDetail
  );

  return {
    cinema: data?.data,
    isLoading,
    isError: error,
  };
}
