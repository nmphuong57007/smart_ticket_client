import instance from "@/lib/instance";
import { useMutation } from "@tanstack/react-query";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async (payload: { booking_id: number }) => {
      const res = await instance.post("/api/payment/vnpay/create", payload);
      return res.data; 
    },
  });
};


