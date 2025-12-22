import instance from "@/lib/instance";
import {  ReviewDeleteResInterface, ReviewResInterface } from "../interfaces/review-interface";

export const getReviewsByMovie  = async (id: number): Promise<ReviewResInterface> => {
  try {
    const res = await instance.get(`/api/reviews/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createReview = async (payload: {
  movie_id: number;
  rating: number;
  comment: string;
}) => {
  const res = await instance.post("/api/reviews", payload);
  return res.data;
};

export const deleteReview  = async (id: number): Promise<ReviewDeleteResInterface> => {
  const res = await instance.delete<ReviewDeleteResInterface>(`/api/reviews/${id}`);
  return res.data;
};