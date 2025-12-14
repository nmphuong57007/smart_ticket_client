"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookingHistoryDetail } from "../services/booking-history";


export function useBookingDetail(id: number) {
  return useQuery({
    queryKey: ["getBookingHistoryDetail", id],
    queryFn: () => getBookingHistoryDetail(id),
    enabled: !!id,
  });
}
