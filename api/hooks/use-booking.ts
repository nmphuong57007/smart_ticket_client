import instance from "@/lib/instance";
import { useMutation } from "@tanstack/react-query";

export interface BookingProduct {
  product_id: number;
  qty: number;
}

export interface BookingPayload {
  showtime_id: number;
  seats: number[];
  products?: BookingProduct[];
  discount_code?: string;
}




export const useBooking = () => {
  return useMutation({
    mutationFn: async (payload: BookingPayload) => {
      const res = await instance.post("api/bookings", payload);
      return res.data;
    },
  });
};
