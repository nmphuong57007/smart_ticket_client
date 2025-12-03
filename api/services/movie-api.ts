import instance from "@/lib/instance";

import {
  MovieResInterface,
  MovieDetailResInterface,
} from "../interfaces/movie-interface";
import { MovieShowtimeRes } from "../interfaces/showtime-interface";
import {  SeatMapResponse } from "../interfaces/seat-map-interface";
import { ProductItem, ProductResponse } from "../interfaces/product-interface";
import { PromotionApplyPayload, PromotionApplyResponse, PromotionListResponse } from "../interfaces/discount-interface";

export const getMovies = async (
  per_page?: number,
  page?: number,
  status?: string,
  sort_by?: string,
  search?: string
): Promise<MovieResInterface> => {
  try {
    const res = await instance.get<MovieResInterface>(`/api/movies/list`, {
      params: {
        per_page,
        page,
        status,
        sort_by,
        search,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMovieDetail = async (
  movie_id: number
): Promise<MovieDetailResInterface["data"]> => {
  try {
    const res = await instance.get<MovieDetailResInterface>(
      `/api/movies/${movie_id}`
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
};



export const getMovieShowtimes = async (movieId: number) => {
  const res = await instance.get<MovieShowtimeRes>(`/api/movies/${movieId}/showtimes`);
  return res.data.data; // chỉ return mảng date + showtimes
};


export const getSeatMap = async (showtimeId: number): Promise<SeatMapResponse["data"]> => {
  const res = await instance.get<SeatMapResponse>(`/api/showtimes/${showtimeId}/seats`);
  return res.data.data;
};


export const getProducts = async (per_page: number = 9999): Promise<ProductItem[]> => {
  const res = await instance.get<ProductResponse>("/api/products", {
    params: { per_page }
  });
  return res.data.data.products;
};

export const getPromotions = async (): Promise<PromotionListResponse> => {
  const res = await instance.get("/api/promotions", {
    params: { per_page: 999 },
  });
  return res.data;
};

export const applyPromotion = async (
  payload: PromotionApplyPayload
): Promise<PromotionApplyResponse> => {
  const res = await instance.post("/api/promotions/apply", payload);
  return res.data;
};