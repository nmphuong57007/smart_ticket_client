import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/movie-api";

export const useProducts = (perPage: number = 9999) => {
  return useQuery({
    queryKey: ["products",perPage],
    queryFn: () => getProducts(perPage),
  });
};
