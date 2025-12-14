import { useMutation } from "@tanstack/react-query";
import instance from "@/lib/instance";
import type { CreatePaymentPayload } from "@/api/interfaces/payment-interface";

export const useCreatePayment = () => {
  return useMutation<string, unknown, CreatePaymentPayload>({
    mutationFn: async (payload) => {
      const { data } = await instance.post("api/payment/vnpay/create", payload, {
        responseType: "text",   // 🔥 BẮT BUỘC vì backend trả về TEXT
      });

      return data; // data là raw URL string
    },
  });
};



