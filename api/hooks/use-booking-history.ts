import { useQuery, queryOptions } from "@tanstack/react-query";
import { hasToken } from "@/helpers/has-token";
import { getBookingHistory } from "../services/booking-history";
;

export const useBookingHistory = (
) => {
  return useQuery({
    queryKey: ["getBookingHistory",],
    queryFn: () => getBookingHistory(),
    enabled: hasToken(),
    ...queryOptions,
  });
};