import instance from "@/lib/instance";
import { useMutation } from "@tanstack/react-query";

interface CreatePaymentPayload {
  booking_id: number;
}

interface CreatePaymentResponse {
  success: boolean;
  payment_url: string;
}

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async (payload: CreatePaymentPayload): Promise<CreatePaymentResponse> => {
      const res = await instance.post("/api/payment/vnpay/create", payload);
      return res.data;
    },
  });
};
