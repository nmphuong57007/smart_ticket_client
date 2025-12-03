// src/api/hooks/use-promotion-apply.ts
import { useMutation } from "@tanstack/react-query";
import { applyPromotion } from "../services/movie-api";

export const usePromotionApply = () => {
  return useMutation({
    mutationFn: applyPromotion,
  });
};
