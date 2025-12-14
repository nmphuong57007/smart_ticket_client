import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/instance";

import type {
  CreateBookingPayload,
  CreateBookingResponse,
} from "@/api/interfaces/booking-interface";

export const useBooking = () => {
  return useMutation<CreateBookingResponse, unknown, CreateBookingPayload>({
    mutationFn: async (payload) => {
      const { data } = await instance.post("api/bookings", payload);
      return data;
    },
  });
};
