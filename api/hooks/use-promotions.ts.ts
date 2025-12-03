// src/api/hooks/use-promotions.ts
import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "../services/movie-api";



export const usePromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: getPromotions,
  });
};
