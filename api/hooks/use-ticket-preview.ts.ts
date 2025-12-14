
import { useQuery } from "@tanstack/react-query";
import instance from "@/lib/instance";

export const useTicketPreview = (
  showtimeId: number,
  seatIds: number[],
  comboIds: number[],
  discountCode?: string | null
) => {

  const params: Record<string, string | number> = {
    showtime_id: showtimeId,
    seat_ids: seatIds.join(","),
  };

  if (comboIds.length > 0) {
    params.combo_ids = comboIds.join(",");
  }

  if (discountCode) {
    params.discount_code = discountCode;
  }

  return useQuery({
    queryKey: ["ticketPreview", params],
    queryFn: async () => {
      const res = await instance.get("api/tickets/preview", { params });
      return res.data;
    },
    enabled: showtimeId > 0 && seatIds.length > 0,
  });
};


