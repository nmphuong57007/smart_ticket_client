"use client";

import { useQuery } from "@tanstack/react-query";
import type { SeatMapResponse } from "../interfaces/seat-map-interface";
import { getSeatMap } from "../services/movie-api";

export const useSeatMap = (showtimeId: number) => {
  return useQuery<SeatMapResponse["data"]>({
    queryKey: ["seat-map", showtimeId],
    queryFn: () => getSeatMap(showtimeId),
    enabled: !!showtimeId,
  });
};
