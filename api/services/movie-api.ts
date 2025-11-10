import instance from "@/lib/instance";

import {
  MovieResInterface,
  MovieDetailResInterface,
} from "../interfaces/movie-interface";

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
): Promise<MovieDetailResInterface> => {
  try {
    const res = await instance.get<MovieDetailResInterface>(
      `/api/movies/${movie_id}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
